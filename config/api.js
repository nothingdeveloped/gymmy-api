module.exports = {
  responses: {
    privateAttributes: ["_v", "ids", "created_at"],
  },
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};
