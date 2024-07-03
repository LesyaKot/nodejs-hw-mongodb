import { Contact } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';


// get all
export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = Contact.find({userId});

  if (filter.contactType) {
    contactsQuery = contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery = contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await Contact.countDocuments(contactsQuery.getQuery());

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


// by id
export const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
  } catch (error) {
    throw new Error('No contact: ' + error.message);
  }
};


// post
export const createContact = async ({name, phoneNumber, email, isFavourite, contactType, userId }) => {
  try {
    const contact = await Contact.create({name, phoneNumber, email, isFavourite, contactType, userId });
    return contact;
  } catch (error) {
    throw new Error("Can't create contact" + error.message);
  }
};


// patch
export const updateContact = async (contactId, userId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};


// delete
export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
