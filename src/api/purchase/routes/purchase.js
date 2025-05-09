module.exports = {
  routes: [
    {
      method: "POST",
      path: "/purchase-verify",
      handler: "purchase.verifyPurchase",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/coins",
      handler: "purchase.getCoins",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/subscription-status",
      handler: "purchase.subscriptionStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
