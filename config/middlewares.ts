export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://0.0.0.0:3000",
        "http://localhost:3000",
        "http://10.0.0.159:3000",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      headers: "*",
      credentials: true,
    },
  },
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["http://localhost:3000"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
