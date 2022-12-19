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