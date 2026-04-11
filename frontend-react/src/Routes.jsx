import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DataKaryawan from "./pages/dataKaryawan/DataKaryawan";
import Loader from "./components/Loader/Loader";

export default function RoutePages() {
  const [loading, setLoading] = useState(false);

  const dataResponse = [
    {
      id: 1,
      nama: "Bahasa Pemrograman C",
      images: "react.svg",
    },
    {
      id: 2,
      nama: "Bahasa Pemrograman HTML, CSS, Javascript",
      images: "react.svg",
    },
    {
      id: 3,
      nama: "Bahasa Pemrograman Javascript Fundamental (Node.js)",
      images: "react.svg",
    },
    {
      id: 4,
      nama: "Postman, Github",
      images: "react.svg",
    },
    {
      id: 5,
      nama: "Bahasa Pemrograman Javascript (React)",
      images: "react.svg",
    },
  ];

  const doLoad = () => {
    setLoading((prev) => !prev);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/datakaryawan"
          element={<DataKaryawan dataResponse={dataResponse} />}
          doLoad={doLoad}
        />
      </Routes>
      <Loader open={loading} />
    </>
  );
}
