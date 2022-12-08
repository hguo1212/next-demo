//  cerate the mongodb connection

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI

const main = async() => {
  await mongoose.connect("mongodb+srv://hua:test123@cluster0.belxibd.mongodb.net/?retryWrites=true&w=majority")
  console.log('Database connected');
}

export default main;