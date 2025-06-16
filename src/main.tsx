import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/ApolloClient.ts";
import { TokenProvider } from "./hooks/useToken.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </TokenProvider>
  </StrictMode>
);
