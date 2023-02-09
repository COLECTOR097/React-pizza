import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices";

import styles from "./Search.module.scss";

export const Search = () => {
  const [value, setValue] = useState("");
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={"feather feather-search " + styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder={"Поиск пиццы..."}
      />
      {searchValue && (
        <svg
          className={styles.clear}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
