import { Router } from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    data: contacts,
  });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }

  res.status(200).json({
    data: contact,
  });
});

// export default router;
export default router;
