import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home } from "./pages";

import "../src/scss/app.scss";

const Cart = lazy(() =>
  import("./pages/Cart").then((module) => ({ default: module.Cart }))
);
const FullPizza = lazy(() =>
  import("./pages/FullPizza").then((module) => ({ default: module.FullPizza }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((module) => ({ default: module.NotFound }))
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/cart"}
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path={"/pizza/:id"}
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path={"*"}
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
