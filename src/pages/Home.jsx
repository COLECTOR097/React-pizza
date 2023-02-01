import React, { useEffect, useState } from "react";

import { Categories, PizzaBlock, Sort } from "../components";

import Skeleton from "../components/PizzaBlock/Skeleton";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fakeArray = [1, 2, 3, 4, 5, 6];
  const url = "https://63da2e8c2af48a60a7c709ce.mockapi.io/items";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? fakeArray.map((_) => <Skeleton key={_} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
};
