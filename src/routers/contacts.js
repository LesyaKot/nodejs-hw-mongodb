import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {createContactsSchema, updateContactsSchema} from '../validation/contactsValidation.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contactsControllers.js';

import isValidId from '../middlewares/isValidId.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));


router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));


router.patch(
  '/contacts/:contactId',
  isValidId, validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);


router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
