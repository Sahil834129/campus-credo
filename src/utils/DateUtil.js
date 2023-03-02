import moment from "moment";

const formatDDMMYYYY = 'DD/MM/YYYY'

export function getDefaultDateFormat() {
    return formatDDMMYYYY
}

export function formatDateToDDMMYYYY(date) {
    return moment(date).format(formatDDMMYYYY)
}

export function parseDateWithDefaultFormat(dateSTR) {
    return moment(dateSTR, formatDDMMYYYY).toDate()
}

export const convertDate = (currentDate) => {
    if (currentDate) {
        const currentDateArr = currentDate.split("/");
        return new Date(`${currentDateArr[1]}/${currentDateArr[0]}/${currentDateArr[2]}`);
    }
    return null;
};
