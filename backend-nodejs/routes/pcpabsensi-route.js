import bcrypt from "bcryptjs";
import { client } from "../postgresql.js";
import { generateUUID } from "../config/utilities.js";

export async function karyawanData(req, res) {
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);

    const newIdKaryawan = generateUUID();

    console.log(newIdKaryawan); 

    return;

    await client.query(
        `INSERT INTO user_data (idkaryawan, namalengkap, dob, gender, email, password) 
        VALUES ('${newIdKaryawan}', '${req.body.namalengkap}', '${req.body.dob}', '${req.body.gender}', '${hash}')`
    );

    res.send("Karyawan Berhasil Ditambahkan");
}