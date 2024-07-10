import createHttpError from 'http-errors';
import { paginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';



// all contacts
export const getContactsController = async (req, res, next) => {
  const { page, perPage } = paginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  try {
    const contacts = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      ...contacts,
    });
  } catch (error) {
    next(error);
  }
};


// by id
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await getContactById(contactId, userId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};


// post
export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!phoneNumber) {
    return res.status(400).json({ error: 'PhoneNumber is required' });
  }

  try {
    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};


// patch
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const result = await updateContact(contactId, userId, req.body);

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};


// delete
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// CLOUDINARY
export const patchStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      try {
        photoUrl = await saveFileToCloudinary(photo);
      } catch (error) {
        next(createHttpError(500, 'Failed to upload file to Cloudinary', error));
        return;
      }
    } else {
      try {
        photoUrl = await saveFileToUploadDir(photo);
      } catch (error) {
        next(createHttpError(500, 'Failed to upload file to local directory', error));
        return;
      }
    }
  }

  try {
    const result = await updateContact(contactId, {
      ...req.body,
      photo: photoUrl,
    });

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to update contact', error));
  }
};
