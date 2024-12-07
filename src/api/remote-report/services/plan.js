const _ = require("lodash");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;

const planCollectionName = process.env.MONGO_PLAN_COLLECTION_NAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db();
const planCollection = db.collection(planCollectionName);
const excludedFields = {
  user: 0,
};

module.exports = {
  async monGo() {},

  async getAll(user, page, type, date) {
    try {
      page = Math.max(page, 1);
      // construct query
      var filter = {
        user: user,
      };
      console.log({ type, date });
      if (type == "date" || type == "today") {
        filter["time"] = date;
      }
      //   filter["date"] = new Date();
      const total = await planCollection.countDocuments(filter);

      const querySet = planCollection
        .find(filter, {
          projection: excludedFields,
        })
        .sort({ time: "asc" });
      if (type != "today")
        querySet.skip(10 * (parseInt(page) - 1 ?? 0)).limit(10);

      const result = await querySet.toArray();

      return {
        total: total,
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async getTodayPlanImages(user, page, type, date) {
    try {
      page = Math.max(page, 1);
      // construct query
      var filter = {
        user: user,
      };
      console.log({ type, date });
      if (type == "date" || type == "today") {
        filter["time"] = date;
      }

      const querySet = planCollection
        .find(filter, {
          projection: {
            imageUrl: 1,
          },
        })
        .sort({ time: "asc" });
      if (type != "today")
        querySet.skip(10 * (parseInt(page) - 1 ?? 0)).limit(10);

      const result = await querySet.toArray();

      return {
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async create(plan) {
    try {
      plan = {
        dateAdded: new Date(),
        ...plan,
      };

      const result = await planCollection.insertOne(plan);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async update(plan) {
    var updatePlanData = _.omit(plan, ["_id"]);
    console.log({
      $set: {
        ...updatePlanData,
        dateAdded: new Date(),
      },
    });
    try {
      const objectId = new ObjectId(plan._id);
      const result = await planCollection.updateOne(
        {
          _id: objectId,
        },
        {
          $set: {
            ...updatePlanData,
            dateAdded: new Date(),
          },
        }
      );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletById(user, id) {
    try {
      const objectId = new ObjectId(id);
      const result = await planCollection.deleteMany({
        user: user,
        _id: objectId,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  async deletDayPlan(user, date) {
    try {
      const result = await planCollection.deleteMany({
        user: user,
        date: date,
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
      const result = await planCollection.deleteMany({ user: user });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error interacting with MongoDB");
    }
  },

  //   async deletByExercise(user, exercise) {
  //     try {
  //       console.log({
  //         user: user,
  //         exercise: parseInt(exercise),
  //       });
  //       const result = await planCollection.deleteMany({
  //         user: user,
  //         exercise: parseInt(exercise),
  //       });
  //       return result;
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error("Error interacting with MongoDB");
  //     }
  //   },
};
