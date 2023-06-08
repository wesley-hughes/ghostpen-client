import { useEffect, useState } from 'react';
import { getLetters, deleteLetter } from '../../managers/LetterManager';
import { LetterUpdateModal } from './LetterUpdateModal';
import { copyToClipboard } from '../utils/copyToClipboard';

export const LetterLibrary = () => {
  const [filteredLetters, setFilteredLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');

  useEffect(() => {
    fetchLetters();
  }, [dateFilter, contactFilter]);

  const fetchLetters = () => {
    getLetters(dateFilter, contactFilter)
      .then((data) => {
        const filteredData = data.filter((letter) => {
          const contactFullName = `${letter.contact.first_name} ${letter.contact.last_name}`;
          return contactFullName.toLowerCase().includes(contactFilter.toLowerCase());
        });
        setFilteredLetters(filteredData);
      })
      .catch((error) => console.error('Error fetching letters:', error));
  };

  const handleDelete = (letterId) => {
    deleteLetter(letterId)
      .then(() => {
        fetchLetters();
        console.log('Letter deleted successfully');
      })
      .catch((error) => console.error('Error deleting letter:', error));
  };

  const handleCopy = (body) => {
    copyToClipboard(body);
    console.log('Letter body copied to clipboard');
  };

  const handleEdit = (letter) => {
    setSelectedLetter(letter);
  };

  const handleLetterUpdate = () => {
    fetchLetters(); 
  };

  const closeModal = () => {
    setSelectedLetter(null);
  };

  const truncateSnippet = (text, lines) => {
    const snippetLines = text.split('\n').slice(0, lines);
    const truncatedSnippet = snippetLines.join('\n');
    return truncatedSnippet.length < text.length ? `${truncatedSnippet}...` : truncatedSnippet;
  };

  return (
    <div className="letter-library">
      <div className="filters">
        <label>Date:</label>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="">All</option>
          <option value="last_week">Last Week</option>
          <option value="last_30_days">Last 30 Days</option>
          <option value="last_90_days">Last 90 Days</option>
        </select>

        <label>Contact:</label>
        <input
          type="text"
          value={contactFilter}
          onChange={(e) => setContactFilter(e.target.value)}
          placeholder="Enter contact name"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Contact</th>
            <th>Snippet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLetters.map((letter) => (
            <tr key={letter.id}>
              <td>{letter.date}</td>
              <td>{letter.contact.first_name} {letter.contact.last_name}</td>
              <td>{truncateSnippet(letter.letter_body, 2)}</td>
              <td>
                <button onClick={() => handleEdit(letter)}>Edit</button>
                <button onClick={() => handleDelete(letter.id)}>Delete</button>
                <button onClick={() => handleCopy(letter.letter_body)}>Copy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLetter && (
        <LetterUpdateModal letter={selectedLetter} closeModal={closeModal} onLetterUpdate={handleLetterUpdate} />
      )}
    </div>
  );
};
