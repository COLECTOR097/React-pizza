import { Header, Categories, Sort, PizzaBlock } from "./components";

import "../src/scss/app.scss";

import pizzas from "./assets/pizza.json";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza, index) => {
              return <PizzaBlock key={index} {...pizza} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
