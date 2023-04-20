const Schema = require('mongoose').Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String, required: true},
  duration: { type: Number, required: true},
  category: { type: [Schema.Types.ObjectId], ref: 'Category' },
  price: { type: Number, required: true, default: 0},
  images: { type: [String], required: true},
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

serviceSchema.path('images').validate((val) => val.length > 0, 'Must have at least one image')

module.exports = serviceSchema;
