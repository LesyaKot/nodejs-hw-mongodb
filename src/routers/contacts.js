import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contactsValidation.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contactsControllers.js';

import isValidId from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';


const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));


contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


contactsRouter.post(
  '',

  validateBody(createContactsSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);


contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);


contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);


export default contactsRouter;
