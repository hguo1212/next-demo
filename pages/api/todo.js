import clientPromise from "../../lib/mongodb";
import { readAll, update, deleteById, create } from "../../utils/api-utils";

export default async (req, res) => {
  const method = req.method;
  const collection = "kittens";
  try {
    const client = await clientPromise;
    const db = client.db("test");
    switch (method) {
      case "GET":
        await readAll(db, res, req, collection);
        break;
      case "POST":
        await create(db, res, req, collection);
        break;
      case "PUT":
        await update(db, res, req, collection);
        break;
      case "DELETE":
        const { _id } = query;
        const xx = await db
          .collection("kittens")
          .deleteOne({ _id: new ObjectId(_id) });
        await deleteById(db, req, collection);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
