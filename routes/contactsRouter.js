import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import { createContactSchema, updateContactFavSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite", validateBody(updateContactFavSchema), ctrlWrapper(updateContact));

export default contactsRouter;
