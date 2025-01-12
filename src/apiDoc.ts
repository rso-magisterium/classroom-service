import fs from "fs";
import { OpenAPIV3 } from "openapi-types";

const packageJson = fs.readFileSync("./package.json", "utf-8");
const packageInfo = JSON.parse(packageJson);

const apiDoc: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Magisterium: Classroom service",
    version: packageInfo.version,
  },
  components: {
    schemas: {
      Response: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          error: {
            type: "object",
          },
        },
        required: ["message"],
      },
      Classroom: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          teachers: {
            type: "array",
            items: {
              type: "string",
            },
          },
          students: {
            type: "array",
            items: {
              type: "string",
            },
          },
          content: {
            type: "string",
          },
        },
        required: ["id", "name"],
      },
      ClassroomFull: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          teachers: {
            type: "array",
            items: {
              type: "string",
            },
          },
          students: {
            type: "array",
            items: {
              type: "string",
            },
          },
          content: {
            type: "string",
          },
          forumPosts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                author: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                createdAt: {
                  type: "string",
                },
              },
              required: ["id", "author", "content", "createdAt"],
            },
          },
        },
        required: ["id", "name", "teachers", "content", "forumPosts"],
      },
    },
    responses: {
      MissingParameters: {
        description: "Missing required parameters",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response",
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthenticated",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response",
            },
          },
        },
      },
      Forbidden: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response",
            },
          },
        },
      },
      NotFound: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response",
            },
          },
        },
      },
      ServerError: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Response",
            },
          },
        },
      },
    },
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        name: "jwt",
        in: "cookie",
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {},
};

export default apiDoc;
