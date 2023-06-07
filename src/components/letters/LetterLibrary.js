import { useEffect, useState } from 'react';
import { getLetters, deleteLetter } from '../../managers/LetterManager';
import { LetterModal } from './LetterModal';
import { copyToClipboard } from '../utils/copyToClipboard';

export const LetterLibrary = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = () => {
    getLetters()
      .then((data) => setLetters(data))
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
          {letters.map((letter) => (
            <tr key={letter.id}>
              <td>{letter.date}</td>
              <td>{letter.contact.name}</td>
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
        <LetterModal letter={selectedLetter} closeModal={closeModal} />
      )}
    </div>
  );
};
