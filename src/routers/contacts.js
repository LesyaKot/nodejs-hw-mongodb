// import { Router } from 'express';

// import { validateBody } from '../middlewares/validateBody.js';

// import {createContactsSchema, updateContactsSchema} from '../validation/contactsValidation.js';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// import {
//   getContactsController,
//   getContactByIdController,
//   createContactController,
//   patchContactController,
//   deleteContactController,
// } from '../controllers/contactsControllers.js';

// import isValidId from '../middlewares/isValidId.js';


// const contactsRouter = Router();

// contactsRouter.get('/contacts', ctrlWrapper(getContactsController));


// contactsRouter.get(
//   '/contacts/:contactId',
//   isValidId,
//   ctrlWrapper(getContactByIdController),
// );


// contactsRouter.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));


// contactsRouter.patch(
//   '/contacts/:contactId',
//   isValidId, validateBody(updateContactsSchema),
//   ctrlWrapper(patchContactController),
// );


// contactsRouter.delete(
//   '/contacts/:contactId',
//   isValidId,
//   ctrlWrapper(deleteContactController),
// );

// export default contactsRouter;



// new code

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


const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));


contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);


contactsRouter.post('', validateBody(createContactsSchema), ctrlWrapper(createContactController));


contactsRouter.patch(
  '/:contactId',
  isValidId, validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);


contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
