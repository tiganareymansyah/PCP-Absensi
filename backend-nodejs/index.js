import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { getKaryawanData, addKaryawanData } from "./routes/pcpabsensi-route.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// Data Karyawan
app.get("/api/get-karyawan", getKaryawanData);
app.post("/api/add-karyawan", addKaryawanData);

app.listen(3000, () => console.log("Server Berjalan..."));