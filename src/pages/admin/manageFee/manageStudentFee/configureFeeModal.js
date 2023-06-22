import { useState } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { humanize } from "../../../../utils/helper";
import { useEffect } from "react";
import { getClassesFeeDetails } from "../../../../utils/services";

export default function ConfigureFeeModal({ configureFeeModal, handleClose, student, setFeesDetail, feesDetail }) {
  const [calculatedFee, setCalculatedFees] = useState(0);
  const [classFees, setClassFees] = useState([]);

  const fetchStudentFeesData = () => {
    getClassesFeeDetails(student.classId)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          const result = response?.data.map(val => {
            const data = feesDetail.filter(fee => fee.studentFee.feeTypeId === val.classFee.feeTypeId);
            return {
              ...val,
              disabled: val?.classFee?.mandatory,
              isChecked: data.length > 0
            };
          });
          setClassFees(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getCalulagedFee = (fees) => {
    let temp = 0;
    if (fees.length > 0) {
      fees.map(val => {
        if (val?.classFee && val?.classFee?.mandatory) {
          temp = temp + val?.classFee?.feeAmount;
        }
      });
    }
    return temp;
  };
  const handleInput = (isChecked, index, fees) => {
    const updatedFees = fees.map((val, i) => {
      if (i === index) {
        val.classFee.mandatory = isChecked;
      }
      return val;
    });
    setClassFees(updatedFees);
  };

  useEffect(() => {
    if (classFees.length > 0) {
      setCalculatedFees(getCalulagedFee(classFees));
    }
    console.log(classFees);
  }, [classFees]);

  useEffect(() => {
    fetchStudentFeesData();
  }, []);
  return (
    <GenericDialog
      show={configureFeeModal}
      handleClose={handleClose}
      modalHeader='Configure fee'
      style={{ margin: 0 }}
    >
      <div
        className='title-area'
      >
        {`${humanize(student.firstName)} ${humanize(student.lastName)} (${student.className})`}
      </div>
      <table style={{ width: '100%' }}>
        <thead style={{
          border: '2px solid lightgrey'
        }}>
          <tr>
            <th>Fee Type</th>
            <th>Frequency</th>
            <th>Fee Amount</th>
            <th>Mandatory</th>
          </tr>
        </thead>
        <tbody>
          {classFees && classFees.length > 0 &&
            classFees.map((val, index) => (
              <tr key={`configureFee${index}`} style={{
                border: '2px solid lightgrey'
              }}>
                <td>{val?.classFee?.feeTypeName}</td>
                <td>{humanize(val?.classFee?.feeTypeFrequency)}</td>
                <td>{val?.classFee?.feeAmount}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled={val?.disabled}
                    checked={val?.classFee?.mandatory}
                    onChange={e => {
                      handleInput(e.target.checked, index, classFees);
                    }}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <span style={{ marginRight: '10px' }}>Total Amount: {calculatedFee}</span>
        <button className="btn" style={{ background: '#41285F', color: 'white' }}>
          Submit</button>
      </div>
    </GenericDialog>
  );
}