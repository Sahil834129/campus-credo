import { useState } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { humanize } from "../../../../utils/helper";
import { useEffect } from "react";
import { addFeeInStudenFee, getClassesFeeDetails, removeFeeFromStudenFee } from "../../../../utils/services";

export default function ConfigureFeeModal({ configureFeeModal, handleClose, student, fetchStudentFees, feesDetail }) {
  const [calculatedFee, setCalculatedFees] = useState(0);
  const [classFees, setClassFees] = useState([]);

  const fetchStudentFeesData = (feesDetail) => {
    getClassesFeeDetails(student.classId)
      .then(response => {
        if (response.status === 200) {
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
  const handleInput = (isChecked, index, fees, feesDetailIds) => {
    const updatedFees = fees.map((val, i) => {
      if (i === index) {
        val.classFee.mandatory = isChecked;
        val.isChecked = isChecked
        if (val.isChecked){
        const payload = {
          "studentId": student.studentId,
          "classId": val.classId,
          "classFeeId": val.classFeeId,
        }
        addFeeInStudenFee(payload)
        .then(res => fetchStudentFees())
        .catch(err=> console.log(err))
      } else{
        const studentId = feesDetailIds[i].studentId
        const studentFeeId = feesDetailIds[i].studentFeeId
        removeFeeFromStudenFee(studentId, studentFeeId)
      }
      }
      return val;
    });
    setClassFees(updatedFees);
  };

  useEffect(() => {
    if (classFees.length > 0) {
      setCalculatedFees(getCalulagedFee(classFees));
    }
  }, [classFees]);

  useEffect(() => {
    fetchStudentFeesData(feesDetail);
  }, [feesDetail]);

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
        {`${humanize(student.firstName)} ${humanize(student.lastName)} (${student.schoolStudentId}) (${student.className})`}
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
                    checked={val?.isChecked || false}
                    onChange={e => {
                      handleInput(e.target.checked, index, classFees, feesDetail);
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
      </div>
    </GenericDialog>
  );
}