const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;
const dailyCollectionName = process.env.MONGO_DAILY_COLLECTION_NAME;
const planCollectionName = process.env.MONGO_PLAN_COLLECTION_NAME;
const monthlyCollectionName = process.env.MONGO_MONTHLY_COLLECTION_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db();
const dailyCollection = db.collection(dailyCollectionName);
const planCollection = db.collection(planCollectionName);
const monthlyCollection = db.collection(monthlyCollectionName);
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

      const total = await dailyCollection.countDocuments(filter);

      const result = await dailyCollection
        .find(filter, { projection: excludedFields })
        .skip(10 * (parseInt(page) - 1) ?? 0)
        .limit(10)
        .toArray();

      return {
        total: total,
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async create(report) {
    try {
      const result = await dailyCollection.insertOne(report);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletById(user, id) {
    try {
      const objectId = new ObjectId(id);
      const result = await dailyCollection.deleteMany({
        user: user,
        _id: objectId,
      });
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
      const result = await dailyCollection.deleteMany({ user: user });
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
      const result = await dailyCollection.deleteMany({
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
