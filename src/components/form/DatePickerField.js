import DatePicker from "react-datepicker";
import { formatDateToDDMMYYYY, parseDateWithDefaultFormat } from "../../utils/DateUtil";

const DatePickerField = ({ name, value, setFieldValue, errors, touched, dateFormat, maxDate }) => {
    return (
      <>
        <div className="field-group-wrap">
          <DatePicker
            selected={value ? parseDateWithDefaultFormat(value) : ""}
            dateFormat={dateFormat || "dd/MM/yyyy"}
            className="form-control"
            name={name}
            autoComplete="off"
            placeholderText={dateFormat.toLowerCase() || "DD/MM/YYYY"}
            onChange={(date) => {
              return date
                ? setFieldValue("dateOfBirth", formatDateToDDMMYYYY(date))
                : "";
            }}
            //maxDate={getStudentMaxDateOfBirth()}
            maxDate={maxDate || false}
            dropdownMode="select"
            showMonthDropdown
            showYearDropdown
          />
        </div>
        {errors[name] && touched[name] ? (
          <div className="error-exception">{errors[name]}</div>
        ) : null}
      </>
    );
}
export default DatePickerField