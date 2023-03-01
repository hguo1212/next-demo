import { isNil } from "lodash/fp";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { update, deleteById, create } from "../../utils/api-utils";

export default async (req, res) => {
  const method = req.method;
  const collection = "statistical";
  try {
    const client = await clientPromise;
    const db = client.db("test");
    switch (method) {
      case "GET":
      const query = req.query;
      const content = await db.collection(collection).findOne(query);
      if(isNil(content)) {
        const {title} = query;
        await create(db, res, {title,count:0 }, collection)
      } else {
        res.json(content);
      }
        break;
      case "POST":
        await create(db, res, req, collection);
        break;
      case "PUT":
        await update(db, res, req, collection);
        break;
      case "DELETE":
        await deleteById(db, req, collection);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
