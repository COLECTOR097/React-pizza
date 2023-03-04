import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63da2e8c2af48a60a7c709ce.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchPizza().then((r) => console.log(r));
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className={"content"}>
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.name}</h1>
      <h2>{pizza.price}</h2>
    </div>
  );
};
