import { useState } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { humanize } from "../../../../utils/helper";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function ConfigureFeeModal({ configureFeeModal, handleClose, student, setFeesDetail, feesDetail }) {
  const [calculatedFee, setCalculatedFees] = useState(0);

  const getCalulagedFee = (fees) => {
    let temp = 0;
    if (fees.length > 0) {
      fees.map(val => {
        if (val?.studentFee && val?.studentFee?.mandatory) {
          temp = temp + val?.studentFee?.feeAmount;
        }
      });
    }
    return temp;
  };
  const handleInput = (isChecked, index, fees) => {
    const updatedFees = fees.map((val, i) => {
      if (i === index) {
        val.studentFee.mandatory = isChecked;
      }
      return val;
    });
    setFeesDetail(updatedFees);
  }

  useEffect(() => {
    if (feesDetail.length > 0) {
      setCalculatedFees(getCalulagedFee(feesDetail));
    }
    console.log(feesDetail);
  }, [feesDetail]);

  return (
    <GenericDialog
      show={configureFeeModal}
      handleClose={handleClose}
      modalHeader='Configure fee'
      style={{margin: 0}}
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
            <th>Total Due</th>
            <th>Mandatory</th>
          </tr>
        </thead>
        <tbody>
          {feesDetail && feesDetail.length > 0 &&
            feesDetail.map((val, index) => (
              <tr key={`configureFee${index}`} style={{
                border: '2px solid lightgrey'
              }}>
                <td>{val?.studentFee?.feeTypeName}</td>
                <td>{val?.studentFee?.feeTypeFrequency}</td>
                <td>{val?.studentFee?.feeAmount}</td>
                <td>{val?.studentFee?.feeAmount}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled={val?.disabled}
                    checked={val?.studentFee?.mandatory}
                    onChange={e => {
                      handleInput(e.target.checked, index, feesDetail);
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
        <span style={{marginRight: '10px'}}>Total Amount: {calculatedFee}</span>
        <button className="btn" style={{ background: '#41285F', color: 'white'}}>
          Submit</button>
      </div>
    </GenericDialog>
  );
}