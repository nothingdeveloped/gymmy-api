module.exports = () => {
  return async (ctx, next) => {
    const { user } = ctx.state;
    console.log(user);
    console.log(JSON.stringify(ctx.request.query, null, 2));
    await next();
  };
};
