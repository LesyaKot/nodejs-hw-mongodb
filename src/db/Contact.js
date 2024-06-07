import mongoose from 'mongoose';
import '../contacts.json';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

