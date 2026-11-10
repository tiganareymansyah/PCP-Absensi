import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";
import { generateUUID } from "../config/utilities.js";

export async function getKaryawanData(req, res) {
    try {
        const dataKaryawan = await client.query(
            `SELECT id_karyawan, fullname, dob, gender, email FROM data_karyawan`
        );

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Karyawan berhasil ditambahkan",
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
            (id_karyawan, fullname, dob, gender, email, password)
            VALUES
            ('${newIdKaryawan}',
             '${req.body.fullname}',
             '${req.body.dob}',
             '${req.body.gender}',
             '${req.body.email}',
             '${hash}')`
        );

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