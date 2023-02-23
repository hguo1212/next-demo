import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
      const client = await clientPromise;
      const db = client.db("test");

      const statistical = await db
          .collection("statistical")
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();

      res.json(statistical);
  } catch (e) {
      console.error(e);
  }
};