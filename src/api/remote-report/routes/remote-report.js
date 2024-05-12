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
    // Plans
    //
    ///
    //

    {
      method: "GET",
      path: "/plan",
      handler: "remote-report.getAllPlans",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "GET",
      path: "/plan-images",
      handler: "remote-report.getTodayPlanImages",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "POST",
      path: "/plan",
      handler: "remote-report.postPlan",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "PUT",
      path: "/plan",
      handler: "remote-report.updatePlan",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "DELETE",
      path: "/plan/:id",
      handler: "remote-report.deletePlan",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "DELETE",
      path: "/plan/date/:date",
      handler: "remote-report.deleteDayPlans",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
    {
      method: "DELETE",
      path: "/plan/all",
      handler: "remote-report.deleteAllPlans",
      config: {
        policies: [],
        // middlewares: ["global::reader"],
      },
    },
  ],
};
