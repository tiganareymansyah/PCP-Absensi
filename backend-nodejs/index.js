import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { karyawanData } from "./routes/pcpabsensi-route.js";

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

// Data User
app.post("/api/add-karyawan", karyawanData);

app.listen(3000, () => console.log("Server Berjalan..."));