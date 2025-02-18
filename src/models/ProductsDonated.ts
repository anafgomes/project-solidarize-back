import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productsDonated = new Schema({
  products: {
    required: true,
    type: [
      {
        name: String,
        quantity: Number,
      },
    ],
  },
  ONGdestination: {
    type: String,
    required: true,
  },
  UserDonator: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ProductsDonated', productsDonated);
