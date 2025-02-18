import mongoose from 'mongoose';

const Schema = mongoose.Schema; //classe

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  typeUser: {
    type: String,
    required: true,
    enum: ['ONG', 'User'],
  },
  emailUser: {
    type: String,
    required: true,
    unique: true,
  },
  nameOnwerOng: {
    type: String,
  },
  nameOng: {
    type: String,
    // required: true,
  },
  phoneOnwerOng: {
    type: String,
    required: true,
  },
  phoneOng: {
    type: String,
    // required: true,
  },
  address: {
    type: {
      street: {
        type: String,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  onboarding_completed: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
