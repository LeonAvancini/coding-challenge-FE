import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import "antd/dist/antd.css";

import AppRouter from "./AppRouter";
import ApolloClient from "./apollo";

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
