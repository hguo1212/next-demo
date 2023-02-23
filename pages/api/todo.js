import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const method = req.method;
  const query = req.query;
  const body = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    switch (method) {
      case "GET":
        const {page, size} = query;
        const skipNumber = (page - 1) * size;
        const todo = await db
          .collection("kittens")
          .find()
          .limit(Number(size))
          .skip(skipNumber)
          .toArray();
        const total = await db.collection("kittens").countDocuments();
        const pageTotal =  Math.ceil(total / size);
        res.json({content: todo, total, pageTotal});
        break;
      case "POST":
        const data = await db.collection("kittens").insertOne(body);
        const { insertedId } = data;
        const newData = await db
          .collection("kittens")
          .find({ _id: new ObjectId(insertedId) }).toArray();
          res.json(newData);
        break;
      case "DELETE":
        const { _id } = query;
        const xx = await db
          .collection("kittens")
          .deleteOne({ _id: new ObjectId(_id) });
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
