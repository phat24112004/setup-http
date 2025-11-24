/** @format */
import React, { useEffect } from "react";
import { API_BASE_URL } from "@http-services/url.constant";
import { useAppDispatch, useAppSelector } from "@domain/hooks";
import { increment } from "@domain/counterSlice";

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Danh sách từ MockAPI:");
        console.table(data);
      });
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>
        {count}
      </button>
    </div>
  );
}

export default App;
