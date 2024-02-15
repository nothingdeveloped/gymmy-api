module.exports = {
  routes: [
    {
      method: "GET",
      path: "/remote-report",
      handler: "remote-report.getAll",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/remote-report",
      handler: "remote-report.save",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report/:id",
      handler: "remote-report.deleteReport",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report-user",
      handler: "remote-report.deleteUserReport",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/remote-report/exercise/:id",
      handler: "remote-report.deleteExerciseReport",
      config: {
        policies: [],
      },
    },
  ],
};
