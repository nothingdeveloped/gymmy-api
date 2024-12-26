module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 5, // Default is 5
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "30d", // Longer expiry for mobile
      },
    },
  },
});
