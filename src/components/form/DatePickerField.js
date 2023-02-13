import DatePicker from "react-datepicker";
import { formatDateToDDMMYYYY, parseDateWithDefaultFormat } from "../../utils/DateUtil";

const DatePickerField = ({ name, value, setFieldValue, errors, touched }) => {
    return (
      <>
        <div className="field-group-wrap">
          <DatePicker
            selected={value ? parseDateWithDefaultFormat(value) : ""}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            name={name}
            placeholderText="DD/MM/YYYY"
            onChange={(date) => {
              return date
                ? setFieldValue("dateOfBirth", formatDateToDDMMYYYY(date))
                : "";
            }}
            //maxDate={getStudentMaxDateOfBirth()}
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