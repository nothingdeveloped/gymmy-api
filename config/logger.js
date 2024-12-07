// config/logger.ts

"use strict";

const {
  winston,
  formats: { prettyPrint, levelFilter },
} = require("@strapi/logger");

module.exports = {
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        levelFilter("http"),
        prettyPrint({ timestamps: "YYYY-MM-DD hh:mm:ss.SSS" }),
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "error.log",
      format: winston.format.combine(
        levelFilter("http"),
        prettyPrint({ timestamps: "YYYY-MM-DD hh:mm:ss.SSS" }),
      ),
    }),
  ],
};
