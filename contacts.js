const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const obj = {
    id : nanoid(),
    name,
    email,
    phone,
  };
  data.push(obj);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return obj;
};

const getContactById = async id => {
  const data = await listContacts();
  const result = data.find(contact => contact.id == id);
  return result ? result : null;
};

const removeContact = async id => {
  const contact = await getContactById(id);

  if (contact) {
    const data = await listContacts();
    const result = data.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    return contact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
