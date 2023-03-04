import React, { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices";

export const Categories: FC = () => {
  const categoryId: number = useSelector(
    (state: any) => state.filter.categoryId
  );
  const dispatch = useDispatch();

  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category: string, index: number) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategoryId(index))}
              className={categoryId === index ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
