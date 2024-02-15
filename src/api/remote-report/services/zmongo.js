const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;
const collectionName = process.env.MONGO_COLLECTION_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db();
const collection = db.collection(collectionName);
const excludedFields = {
  user: 0,
};

module.exports = {
  async monGo() {},

  async getAll(user, exer, page) {
    try {
      // construct query
      var filter = {
        user: user,
      };
      if (exer) {
        filter["exer_id"] = parseInt(exer);
      }
      const result = await collection
        .find(filter, { projection: excludedFields })
        .skip(10 * (parseInt(page) - 1) ?? 0)
        .limit(10)
        .toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async create(report) {
    try {
      const result = await collection.insertOne(report);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletById(user, id) {
    try {
      const objectId = new ObjectId(id);
      const result = await collection.deleteMany({ user: user, _id: objectId });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletByUser(user) {
    try {
      console.log({
        user: user,
      });
      const result = await collection.deleteMany({ user: user });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletByExercise(user, exercise) {
    try {
      console.log({
        user: user,
        exercise: parseInt(exercise),
      });
      const result = await collection.deleteMany({
        user: user,
        exercise: parseInt(exercise),
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },
};
