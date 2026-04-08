import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DataKaryawan from "./pages/dataKaryawan/DataKaryawan";

export default function RoutePages() {
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

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/datakaryawan" element={<DataKaryawan dataResponse={dataResponse} />} />
    </Routes>
  );
}
