import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";
import { generateUUID } from "../config/utilities.js";

export async function karyawanData(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);

        const newIdKaryawan = await generateUUID();

        await client.query(
            `INSERT INTO user_data
            (id_karyawan, nama_lengkap, dob, gender, email, password)
            VALUES
            ('${newIdKaryawan}',
             '${req.body.nama_lengkap}',
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