import { cacheExchange, Client, fetchExchange } from "@urql/core";

const client = new Client({
  url: `${process.env.USER_SERVICE_URL}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
});

export default client;
