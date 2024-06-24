import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(/^\+\d{10,16}$/).required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^\+\d{10,16}$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});


const dataToValidate = {
  name: 'Yulia Shevchenko',
  phoneNumber: '+380000000001',
  email: 'oleh1@example.com',
  isFavourite: false,
  contactType: 'personal',
};

export const validationResult = createContactsSchema.validate(dataToValidate);
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
};
