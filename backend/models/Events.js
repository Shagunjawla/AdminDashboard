const eventSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});