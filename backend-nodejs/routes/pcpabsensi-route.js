import { client } from "../postgresql";
import bcrypt from "bcryptjs";

export async function userData(req, res) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);

    await client.query(
        `INSERT INTO user_data (namalengkap, dob, gender, email, password) 
        VALUES ('${req.body.namalengkap}', '${req.body.dob}', '${req.body.gender}', '${hash}')`
    );

    res.send("User Berhasil Ditambahkan");
}