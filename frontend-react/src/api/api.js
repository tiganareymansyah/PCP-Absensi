import axios from "axios";

let ApiUrl = "http://localhost:3000/api";

export async function apiGetDataKaryawan() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/get-karyawan",
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Content-Type": "application/json", // Kalau pakai BE Express pakai ini
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiAddNewKaryawan({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/add-karyawan",
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}