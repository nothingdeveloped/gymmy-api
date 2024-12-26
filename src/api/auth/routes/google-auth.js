module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/google/mobile",
      handler: "google-auth.mobileAuth",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
