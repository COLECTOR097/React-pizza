import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import { setCurrentPage, setFilters } from "../redux/slices";

import {
  Categories,
  PizzaBlock,
  Sort,
  Pagination,
  Skeleton,
  list,
} from "../components";

export const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const fakeArray = [1, 2, 3, 4, 5, 6];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchingPizzas = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const url = `https://63da2e8c2af48a60a7c709ce.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`;

    axios.get(url).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchingPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchValue, categoryId, sort]);

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
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};
