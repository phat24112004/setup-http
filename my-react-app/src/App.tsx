/** @format */
import React, { useEffect } from "react";
import { useAppDispatch } from "@domain/hooks";
import { increment } from "@domain/counterSlice";
import { setRentSpaces } from "@domain/reducer";
import { API_BASE_URL } from "@http-services/url.constant";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("🔍 Đang gọi API:", API_BASE_URL); // log URL để chắc chắn
    fetch(API_BASE_URL)
      .then((res) => {
        console.log("📡 Status:", res.status); // ✅ log status code
        return res.json();
      })
      .then((data) => {
        dispatch(setRentSpaces(data));
        console.log("📦 Danh sách từ MockAPI:", data); // ✅ log ra console
      })
      .catch((err) => {
        console.error("❌ Lỗi khi gọi API:", err);
      });
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => dispatch(increment())}>Ấn vào tôi</button>
    </div>
  );
}

export default App;
