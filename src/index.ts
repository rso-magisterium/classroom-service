import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request } from "express";
import cors from "cors";
import { json } from "body-parser";
import cookies from "cookie-parser";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import apiDoc from "./apiDoc";
import logger from "./logger";
import api from "./api/routes";

const app: Express = express();
const port = process.env.PORT;

if (process.env.JWT_SECRET == null) {
  logger.error("JWT secret is not set");
  process.exit(100);
}

let tokenExtractor = (req: Request) => {
  let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  if (req.signedCookies && token == null) {
    return req.signedCookies.jwt;
  }

  return token;
};

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: tokenExtractor,
    },
    async (payload, done) => {
      if (payload) {
        return done(null, payload);
      } else {
        return done(null, false);
      }
    }
  )
);

app.use(cors({ origin: "*" }));
app.use(json());
app.use(cookies(process.env.COOKIE_SECRET));
app.use(passport.initialize());

app.use("/api", api);

app.get("/healthz", async (req, res) => {
  try {
    // await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    logger.error({ request: { path: req.originalUrl }, error: err }, "Prisma healthcheck failed");
    res.status(500).json({ message: "Prisma error", error: err });
    return;
  }

  res.status(200).json({ message: "OK", uptime: process.uptime() });
});

app.get("/api/openapi.json", (req, res) => {
  res.send(swaggerJsdoc({ definition: apiDoc, apis: ["./{src,dist}/api/*.{js,ts}"] }));
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, undefined, undefined, undefined, undefined, "/api/openapi.json")
);

app.listen(port, () => {
  logger.info(`User service is running at http://localhost:${port}`);
});
