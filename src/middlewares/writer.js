module.exports = () => {
  return async (ctx, next) => {
    const { user } = ctx.state;
    // check expire time
    if (new Date(user.subscription_expire_time) < new Date()) {
      console.log("EXPIRED");
      return ctx.badRequest("Unauthorized", { reason: "Not Premium User" });
    }
    if (user.subscriber == true) {
      console.log("SUBSCRIBER ACTIVE");
      await next();
    } else {
      return ctx.badRequest("Unauthorized", { reason: "Not Premium User" });
    }
  };
};
