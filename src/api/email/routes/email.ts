export default {
  routes: [
    {
      method: "POST",
      path: "/email/send-order-notification",
      handler: "email.sendOrderNotification",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
