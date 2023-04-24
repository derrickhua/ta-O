const Schema = require('mongoose').Schema;

const classSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String, required: true},
  city: {type: String, required: true}, 
  duration: { type: String, required: true},
  category: { type: String, required: true},
  price: { type: Number, required: true, default: 0},
  images: { type: [String]},
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  username: {type: String}
}, {
  timestamps: true
});

// classSchema.path('images').validate((val) => val.length > 0, 'Must have at least one image')

module.exports = classSchema;
