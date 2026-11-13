import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";
import { generateUUID } from "../config/utilities.js";

export async function getKaryawanData(req, res) {
    try {
        const dataKaryawan = await client.query(
            `SELECT id_karyawan, fullname, dob, gender, email, created_at 
            FROM data_karyawan`
        );

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Data karyawan berhasil didapatkan",
            data: dataKaryawan.rows
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
            data: []
        });
    }
}

export async function addKaryawanData(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);

        const newIdKaryawan = await generateUUID();

        await client.query(
            `INSERT INTO data_karyawan
            (id_karyawan, fullname, dob, gender, email, password, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
            [
                newIdKaryawan,
                req.body.fullname,
                req.body.dob,
                req.body.gender,
                req.body.email,
                hash
            ]
        );

        // 13 November 2026
        // Cara diatas dibuat seperti itu agar tidak rentan SQL Injection 

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Karyawan berhasil ditambahkan",
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}