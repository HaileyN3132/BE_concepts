const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  isFavorite: { type: Boolean, default: false },
  title: {
    type: String,
    required: true,
  },
  titleCustom: String,
  personalRating: { type: Number, min: 0, max: 5 },
  note: String,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", movieSchema);
