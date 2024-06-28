import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);

// new user

// {
//   "status": 201,
//   "message": "Successfully registered a user!",
//   "data": {
//       "_id": "667e89d6ba6d0642169b638f",
//       "name": "Serg Sternenko",
//       "email": "rusoris@ua.com",
//       "createdAt": "2024-06-28T10:00:55.003Z",
//       "updatedAt": "2024-06-28T10:00:55.003Z"
//   }
// }
