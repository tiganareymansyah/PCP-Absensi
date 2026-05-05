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

    calendarContainer: {
        display: "flex",
        flexDirection: "row",
        "& .react-datepicker__portal": {
            zIndex: "1 !important"
        },
    },

    calendar: {
        width: "100%",
        fontFamily: "Nunito Sans",
        backgroundColor: "white",
        "& .react-datepicker__day--disabled": {
            backgroundColor: "#d3d3d3",
        },
        "& .react-datepicker__header": {
            backgroundColor: "white",
            border: "0px",
            margin: 0,
        },
        "& .react-datepicker__day-name": {
            color: "#18345c",
            padding: "0.7vw",
            fontSize: 15,
            paddingBottom: 0,
        },
        "& .react-datepicker__day": {
            color: "#18345c",
            padding: "0.7vw",
        },
        "& .react-datepicker__day:hover": {
            color: "white",
            backgroundColor: "#18345c",
        },
        "& .react-datepicker__current-month": {
            marginBottom: 4,
        },
        "& .react-datepicker__header__dropdown": {
            paddingBottom: 0,
        },
        "& .react-datepicker__month-select": {
            padding: 2,
        },
        "& .react-datepicker__year-select": {
            padding: 2,
        },
        // "& .react-datepicker__triangle": {
        //   fill: 'blue',
        //   top: '-8px',
        // },
    },

    datePickerPopper: {
        zIndex: 3
    },

    datePickerWrapper: {
        "& .react-datepicker-wrapper": {
            width: "100%"
        }
    }
});