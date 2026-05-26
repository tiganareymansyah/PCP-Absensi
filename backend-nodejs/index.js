import express from "express";
import {
  userData
} from "./routes/pcpabsensi-route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
app.post("/api/add-user", userData);

app.listen(3000, () => console.log("Server Berjalan..."));