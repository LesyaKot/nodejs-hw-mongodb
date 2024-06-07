// import express from 'express';
// import cors from 'cors';
// import pino from 'pino-http';
// import fs from 'fs';
// import dotenv from 'dotenv';

// dotenv.config();

// const setupServer = () => {
//   const app = express();
//   const PORT = 3000;

//   app.use(cors());
//   app.use(pino());

//   app.get('/', (req, res) => {
//     res.send('Hello world!');
//   });

//   const getContacts = (req, res) => {
//     try {
//       const dataContacts = fs.readFileSync('contacts.json');
//       const contacts = JSON.parse(dataContacts);
//       res.status(200).json({
//         status: 'success',
//         message: 'Successfully found contacts!',
//         data: contacts,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to fetch contacts',
//         error: error.message,
//       });
//     }
//   };

//   app.get('/contacts', getContacts);

//   app.get('/contacts/:contactId', (req, res) => {
//     const contactId = req.params.contactId;
//     try {
//       const dataContacts = fs.readFileSync('contacts.json');
//       const contacts = JSON.parse(dataContacts);
//       const contact = contacts.find((contact) => contact._id["$oid"] === contactId);
//       if (contact) {
//         res.status(200).json({
//           status: 'success',
//           message: `Successfully found contact with id ${contactId}!`,
//           data: contact,
//         });
//       } else {
//         res.status(404).json({ message: `Contact with id ${contactId} not found` });
//       }
//     } catch (error) {
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to fetch contact',
//         error: error.message,
//       });
//     }
//   });
// };


// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Not found' });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: 'Something went wrong', error: err.message });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// };

// startMongoConnection().then(setupServer);

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const setupServer = () => {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(pino());

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  const getContacts = (req, res) => {
    try {
      const dataContacts = fs.readFileSync('contacts.json');
      const contacts = JSON.parse(dataContacts);
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch contacts',
        error: error.message,
      });
    }
  };

  app.get('/contacts', getContacts);

  app.get('/contacts/:contactId', (req, res) => {
    const contactId = req.params.contactId;
    try {
      const dataContacts = fs.readFileSync('contacts.json');
      const contacts = JSON.parse(dataContacts);
      const contact = contacts.find((contact) => contact._id["$oid"] === contactId);
      if (contact) {
        res.status(200).json({
          status: 'success',
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
      } else {
        res.status(404).json({ message: `Contact with id ${contactId} not found` });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch contact',
        error: error.message,
      });
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
