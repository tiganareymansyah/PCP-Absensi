import { makeStyles } from "@mui/styles";

export const useRegisterPegawaiBaruStyles = makeStyles({
    containerParent: {
        marginLeft: "10vw", 
        marginRight: "10vw", 
        marginTop: "5vw", 
        marginBottom: "5vw"
    },

    containerChild: {
        marginBottom: "10px", 
        display: "flex", 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    tableContainer: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
    },

    datePickerWrapper: {
        width: "100%",

        "& .react-datepicker-wrapper": {
            width: "100%",
        },

        "& .react-datepicker__input-container": {
            width: "100%",
        },
    },

    datePickerPopper: {
        zIndex: "9999 !important",

        "& .react-datepicker": {
            fontFamily: "Nunito Sans",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
        },
    },

    calendar: {
        border: "none",

        "& .react-datepicker__header": {
            backgroundColor: "#fff",
            borderBottom: "1px solid #f0f0f0",
            paddingTop: "12px",
        },

        "& .react-datepicker__current-month": {
            color: "#18345c",
            fontWeight: 700,
            fontSize: "16px",
            marginBottom: "10px",
        },

        "& .react-datepicker__day-name": {
            color: "#18345c",
            fontWeight: 600,
            width: "2rem",
            lineHeight: "2rem",
        },

        "& .react-datepicker__day": {
            color: "#18345c",
            width: "2rem",
            lineHeight: "2rem",
            borderRadius: "8px",
        },

        "& .react-datepicker__day:hover": {
            backgroundColor: "#18345c",
            color: "#fff",
        },

        "& .react-datepicker__day--selected": {
            backgroundColor: "#18345c !important",
            color: "#fff",
        },

        "& .react-datepicker__day--keyboard-selected": {
            backgroundColor: "#315b96",
            color: "#fff",
        },

        "& .react-datepicker__day--disabled": {
            color: "#c0c0c0",
        },

        "& .react-datepicker__month-select": {
            borderRadius: "6px",
            padding: "4px",
            border: "1px solid #ddd",
        },

        "& .react-datepicker__year-select": {
            borderRadius: "6px",
            padding: "4px",
            border: "1px solid #ddd",
        },
    },
});