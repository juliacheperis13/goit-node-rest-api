import Contact from "../db/models/contact.js";

export const listContacts = async () => {
  const data = await Contact.findAll();

  return data;
};

export const getContactById = async (id) => {
  const contact = await Contact.findOne({ where: { id } });

  return contact;
};

export const removeContact = async (id) => {
  const contact = await getContactById(id);

  if (!contact) {
    return null;
  }

  await contact.destroy();

  return contact;
};

export const addContact = async (name, email, phone, favorite = false) => {
  const contact = Contact.create({ name, email, phone, favorite });
  return contact;
};

export const updateContact = async (id, data) => {
  const [updated] = await Contact.update(data, { where: { id } });

  if (!updated) {
    return null;
  }

  return getContactById(id);
};
