import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Categories,
  PizzaBlock,
  Sort,
  Pagination,
  Skeleton,
} from "../components";

export const Home = () => {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const fakeArray = [1, 2, 3, 4, 5, 6];

  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const url = `https://63da2e8c2af48a60a7c709ce.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [currentPage, searchValue, url, categoryId, sort]);

  return (
    <div className={"container"}>
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
