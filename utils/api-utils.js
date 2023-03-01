import { ObjectId } from "mongodb";

async function readAll(db, res, req, collection) {
  const query = req.query;
  const { page, size } = query;
  const skipNumber = (page - 1) * size;
  const content = await db
    .collection(collection)
    .find()
    .limit(Number(size))
    .skip(skipNumber)
    .toArray();
  const total = await db.collection(collection).countDocuments();
  const pageTotal = Math.ceil(total / size);
  res.json({ content, total, pageTotal });
}

async function readOne(db, res, req, collection) {
  const query = req.query;
  const content = await db.collection(collection).findOne(query);
  res.json(content);
}

async function deleteById(db, req, collection) {
  const query = req.query;
  const { _id } = query;
  await db.collection(collection).deleteOne({ _id: new ObjectId(_id) });
}

async function update(db, res, req, collection) {
  const body = req.body;
  const { id, ...updateContent } = body;
  const newData = await db
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateContent });
  res.json(newData);
}

async function create(db, res, req, collection) {
  const body = req.body;
  const data = await db.collection(collection).insertOne(body);
  const { insertedId } = data;
  const newData = await db
    .collection(collection)
    .find({ _id: new ObjectId(insertedId) })
    .toArray();
  res.json(newData);
}

export { readAll, deleteById, update, create, readOne };
