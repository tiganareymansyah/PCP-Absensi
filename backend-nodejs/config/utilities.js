import { client } from "../postgresql.js";

export async function generateUUID() {
    const dateNow = new Date();

    const dd = String(dateNow.getDate()).padStart(2, "0");
    const mm = String(dateNow.getMonth() + 1).padStart(2, "0");
    const yy = String(dateNow.getFullYear()).slice(-2);

    const prefix = `00${dd}${mm}${yy}`;

    // Cari ID terakhir hari ini
    const result = await client.query(`
        SELECT id_karyawan
        FROM user_data
        WHERE id_karyawan LIKE '${prefix}%'
        ORDER BY id_karyawan DESC
        LIMIT 1
    `);

    let urut = "01";

    if (result.rows.length > 0) {
        const lastId = result.rows[0].id_karyawan;
        const lastNumber = parseInt(lastId.slice(-2), 10);
        urut = String(lastNumber + 1).padStart(2, "0");
    }

    const idKaryawan = prefix + urut;

    return idKaryawan;
}