import dotenv from "dotenv";
import { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.USER_SERVICE_URL}/graphql`,
  documents: "./src/graphql/**/*.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/graphql/generated/graphql.ts": {
      plugins: [
        "typescript", // Generates TypeScript types for your schema
        "typescript-operations", // Generates TypeScript types for queries, mutations, and fragments
        "typescript-urql", // Generates helpers and utilities for @urql/core
      ],
      config: {
        withComponent: false, // Set to true if using React and want React components generated
        withHooks: false, // Set to true if using React and want hooks generated
        withMutationFn: false, // Useful for mutation function helpers; typically false for @urql/core
      },
    },
  },

  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
