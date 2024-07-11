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
//   "name": "Serg Sternenko",
//   "email": "rusoris@ua.com",
//   "password": "smtng"
// }

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


//  new contact

// {
// 	"name": "Skoobi Doo",
// "email": "jjjjj@ua.com",
// "phoneNumber": "+380975673378",
// "isFavourite": true,
// "contactType": "work"
// }
// {
//   "status": 201,
//   "message": "Successfully created a contact!",
//   "data": {
//       "userId": "667e89d6ba6d0642169b638f",
//       "name": "Skoobi Doo",
//       "phoneNumber": "+380975673378",
//       "email": "jjjjj@ua.com",
//       "isFavourite": true,
//       "contactType": "work",
//       "_id": "66856014596d08b8d159e758",
//       "createdAt": "2024-07-03T14:28:36.983Z",
//       "updatedAt": "2024-07-03T14:28:36.983Z"
//   }
// }

