import { useEffect, useState } from 'react';
import { ghostInput } from '../../managers/GhostManager';
import { getContacts } from '../../managers/ContactManager';
import { getTones } from '../../managers/ToneManager';
import { getUser } from '../../managers/UserManager';
import { createLetter } from '../../managers/LetterManager';

export const LetterCreate = () => {
  const [response, setResponse] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [tones, setTones] = useState([]);
  const [selectedTones, setSelectedTones] = useState([]);
  const [user, setUser] = useState({});
  const [letterPurpose, setLetterPurpose] = useState('');
  const [letterObj, setLetterObj] = useState(null);

  const handleAIResponseGenerate = async (e) => {
    e.preventDefault();

    try {
      const userObj = {
        name: user.first_name + ' ' + user.last_name,
        bio: user.ghostuser.bio,
      };
      const contact = {
        name: selectedContact.first_name + ' ' + selectedContact.last_name,
        bio: selectedContact.bio,
      };
      const tones = selectedTones.map((tone) => tone.label).join(', ');

      const userInput = `The letter you are writing is from ${user.name}. Here is a bio for your reference: ${user.bio}.
      It is being written to ${contact.name}. Here is a bio on ${contact.name} for your reference: ${contact.bio}.
      The purpose of the letter is ${letterPurpose} and the tones of the letter should be ${tones}.`;

      const response = await ghostInput(userInput);
      setResponse(response);

      // need to create the letter object to send in post
      const currentDate = new Date().toISOString().split('T')[0];
      const newLetterObj = {
        contact: selectedContact.id,
        user: user.id,
        letter_body: response,
        date: currentDate,
      };
      setLetterObj(newLetterObj);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLetterSave = async (e) => {
    e.preventDefault();

    try {
      // save the Letter object
      await createLetter(letterObj);

      // Reset the form
      setResponse('');
      setSelectedContact('');
      setSelectedTones([]);
      setLetterPurpose('');
      setLetterObj(null);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  useEffect(() => {
    getContacts().then((data) => setContacts(data));
  }, []);
  useEffect(() => {
    getTones().then((data) => setTones(data));
  }, []);

  const handleContactChange = (e) => {
    const selectedContactId = parseInt(e.target.value);
    setSelectedContact(contacts.find((contact) => contact.id === selectedContactId));
  };

  const handleToneChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTones(selectedOptions);
  };

  return (
    <div>
      <form onSubmit={handleAIResponseGenerate}>
        <div>
          <label>Select Contact:</label>
          <select value={selectedContact} onChange={handleContactChange}>
            <option value="">Select a contact</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.first_name} {contact.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Tones:</label>
          <select multiple value={selectedTones} onChange={handleToneChange}>
            {tones.map((tone) => (
              <option key={tone.id} value={tone.label}>
                {tone.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Letter Purpose:</label>
          <textarea
            value={letterPurpose}
            onChange={(e) => setLetterPurpose(e.target.value)}
            placeholder="Enter your message"
          />
        </div>
        <button type="submit">Generate Letter</button>
      </form>

      {response && (
        <div>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Edit the response"
          />
          <button onClick={handleLetterSave}>Save Letter</button>
        </div>
      )}
    </div>
  );
};
