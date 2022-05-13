import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import Home from "./pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
