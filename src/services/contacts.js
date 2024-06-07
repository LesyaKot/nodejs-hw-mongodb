import fs from 'fs';

export const getContacts = () => {
  try {
    const data = fs.readFileSync('contacts.json');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Failed to fetch contacts:', error.message);
    return [];
  }
};
