import mongoose from "mongoose";

const kittySchema = new mongoose.Schema({
  name: 'string',
})

let kitten = mongoose.models?.Kitten || mongoose.model("Kitten", kittySchema)

export default kitten;