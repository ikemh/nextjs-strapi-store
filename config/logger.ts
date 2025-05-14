// ./config/logger.ts

import * as winston from "winston";

export default ({ env }) => ({
  level: "debug", // Defina o nível para 'debug' para obter logs mais detalhados
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Adiciona cores nos logs
        winston.format.simple() // Formato simples de log
      ),
      level: "debug", // Nível de log no console
    }),
  ],
});
