module.exports = {
  routes: [
    {
      method: "GET",
      path: "/remote-report",
      handler: "remote-report.getAll",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "POST",
      path: "/remote-report",
      handler: "remote-report.save",
      config: {
        policies: [],
        // middlewares: ["global::writer"],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report/:id",
      handler: "remote-report.deleteReport",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report-user",
      handler: "remote-report.deleteUserReport",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report/exercise/:id",
      handler: "remote-report.deleteExerciseReport",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
  ],
};
