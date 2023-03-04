import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import qs from "qs";

import { setCurrentPage, setFilters, fetchPizzas } from "../redux/slices";

import {
  Categories,
  PizzaBlock,
  Sort,
  Pagination,
  Skeleton,
  sortList,
} from "../components";

export const Home: FC = () => {
  // Hook useRef
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  // Hook useNavigate
  const navigate = useNavigate();
  // Redux Toolkit hooks
  const dispatch = useAppDispatch();
  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state: any) => state.filter
  );
  const { items, status } = useSelector((state: any) => state.pizza);
  // Fake array for skeletons
  const fakeArray = [1, 2, 3, 4, 5, 6];
  // Custom functions
  const fetchingPizzas = () => {
    const sortBy: string = sort.sortProperty.replace("-", "");
    const order: string = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search: string = searchValue ? `&search=${searchValue}` : "";
    const category: string = (
      categoryId > 0 ? `&category=${categoryId}` : ""
    ).toString();

    // @ts-ignore
    dispatch(fetchPizzas({ category, currentPage, order, search, sortBy }));
  };

  // Hook useEffect
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
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      // @ts-ignore
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
        {status === "error" ? (
          <div className={"content__error-info"}>
            <h1>Произошла ошибка 😕</h1>
            <p>К сожелению не удалось получить пиццы.</p>
          </div>
        ) : status === "loading" ? (
          fakeArray.map((_) => <Skeleton key={_} />)
        ) : (
          items.map((item: any, index: number) => (
            <PizzaBlock key={index} {...item} />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};
