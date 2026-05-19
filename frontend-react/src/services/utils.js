export const formatDateYYYYMMDD = (date) => {
    if(typeof date === "object") {
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`; // YYYY-MM-DD
    } else {
        return date;
    }
}

export const formatDateIndonesia = (date) => {
    if (!date) return "";

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const parsedDate =
        typeof date === "string"
            ? new Date(date)
            : date;

    if (isNaN(parsedDate.getTime())) return "";

    const day = parsedDate.getDate();
    const month = months[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();

    return `${day} ${month} ${year}`; // 17 Agustus 1945
};