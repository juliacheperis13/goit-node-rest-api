import Contact from "../db/models/contact.js";

export const listContacts = async (query) => {
  const data = await Contact.findAll({ where: query });

  return data;
};

export const getContactById = async ({ id, owner }) => {
  const contact = await Contact.findOne({ where: { id, owner } });

  return contact;
};

export const removeContact = async ({ id, owner }) => {
  const contact = await getContactById({ id, owner });

  if (!contact) {
    return null;
  }

  await contact.destroy();

  return contact;
};

export const addContact = async ({
  name,
  email,
  phone,
  owner,
  favorite = false,
}) => {
  const contact = Contact.create({ name, email, phone, favorite, owner });
  return contact;
};

export const updateContact = async ({ id, owner }, data) => {
  const [updated] = await Contact.update(data, { where: { id, owner } });

  if (!updated) {
    return null;
  }

  return getContactById({ id, owner });
};
