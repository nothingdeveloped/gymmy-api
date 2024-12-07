module.exports = {
  responses: {
    privateAttributes: ["_v", "ids", "created_at"],
  },
  rest: {
    // FIX: Not Working
    defaultLimit: 25,
    maxLimit: 25,
    withCount: true,
  },
};
