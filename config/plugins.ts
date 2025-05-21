export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env.int("SMTP_PORT", 587),
        secure: env.bool("SMTP_SECURE", false),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        debug: true,
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: env("SMTP_FROM", "seu-email@gmail.com"),
        defaultReplyTo: env("SMTP_REPLY_TO", "seu-email@gmail.com"),
      },
    },
  },
});
