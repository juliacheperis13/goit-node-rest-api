import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsService.listContacts({ owner });

  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContactById({ id, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.removeContact({ id, owner });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { id: owner } = req.user;
  const result = await contactsService.addContact({
    name,
    email,
    phone,
    owner,
  });

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.updateContact({ id, owner }, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};
