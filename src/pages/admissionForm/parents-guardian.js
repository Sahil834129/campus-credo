import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from "react-toastify";
import '../../assets/scss/custom-styles.scss';
import RestEndPoint from "../../redux/constants/RestEndpoints";
import RESTClient from "../../utils/RestClient";
import ParentsGuardianForm from "./parents-guardian-form";

const initalValue = {
  relation: 'father',
  otherRelation: '',
  firstName: '',
  lastName: '',
  gender: 'Male',
  nationality: 'Indian',
  otherNationality: '',
  maritalStatus: 'Married',
  addressLine1: '',
  addressLine2: '',
  pincode:'', 
  state:'',
  city:'',
  qualification: 'Diploma',
  occupation: 'Chartered_Accountant',
  annualFamilyIncome: '',
  isAddressSameAsStudent: 'Yes',
  guardianDeceased: 'No',
  dateOfBirth: '' //formatDateToDDMMYYYY(getGuadianMaxDateOfBirth())
};
export default function ParentsGuardianComponent({ currentStudent, setStep }) {
  const [key, setKey] = useState('father');
  const [parentExist, setParentExist] = useState(false);
  const [allParentDetail, setAllParentDetail] = useState([]);
  const [values, setValues] = useState(initalValue);

  const getParentDetail = (parentDetails, selectedParent) => {
    return parentDetails.find(val => {
      const parent = val.relation;
      if (selectedParent === 'other') {
        return (parent.toLowerCase() !== 'father' && parent.toLowerCase() !== 'mother');
      } else {
        return (parent.toLowerCase() === selectedParent);
      }
    });
  };
  async function getUsersParent(user) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PARENT + `/${user.childId}`
      );
      if (response.data !== '' && response.data.length > 0) {
        const parents = response.data;
        setAllParentDetail(parents);
        const fatherDetail = getParentDetail(parents, 'father');
        if (fatherDetail) {
          setValues(val => {
            return {
              ...val,
              ...fatherDetail,
              dateOfBirth: fatherDetail?.dateOfBirth,
              gender: 'Male',
              otherRelation: fatherDetail?.relation,
              nationality:
                fatherDetail?.nationality === ''
                  ? 'Other'
                  : fatherDetail?.nationality,
              
              isAddressSameAsStudent: (isAddressSameAsStudent(fatherDetail, currentStudent) ? 'Yes' : 'No'),
            };
          });
          setParentExist(true);
        }
      } else {
        setParentExist(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  }

  function isAddressSameAsStudent(fatherAddress, studentAddress) {
    if (fatherAddress.addressLine1) {
      return (
        fatherAddress.addressLine1 === studentAddress.addressLine1 &&
        fatherAddress.addressLine2 === studentAddress.addressLine2 &&
        fatherAddress.city === studentAddress.city &&
        fatherAddress.state === studentAddress.state &&
        fatherAddress.pincode === studentAddress.pincode)
    }
    return true
  }

  useEffect(() => {
    if (key !== "") {
      const data = getParentDetail(allParentDetail, key);
      if (data) {
        setValues(() => {
          return {
            ...initalValue,
            ...data,
            dateOfBirth: data?.dateOfBirth,
            gender: 'Male',
            otherRelation: data?.relation,
            gender: key == "mother" ? 'Female' : ( key == "father" ? 'Male' : data?.gender),
            nationality:
              data?.nationality === ''
                ? 'Other'
                : data?.nationality,
            isAddressSameAsStudent: ( isAddressSameAsStudent(data, currentStudent) ? 'Yes' : 'No')
          };
        });
        setParentExist(data ? true : false);
      }else {
        setValues(() => {
          return {
            ...initalValue,
            gender: key == "mother" ? 'Female' : ( key == "father" ? 'Male' :data?.gender),
            relation: key,
          }
        })
      }
      setParentExist(data ? true : false);
    }
  }, [key, allParentDetail]);

  useEffect(() => {
    if (currentStudent.childId)
      getUsersParent(currentStudent);
  }, [currentStudent]);

  return (
    <div className='supporting-document tab_btn'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={k => setKey(k)}
        className='mb-3'
      >
        <Tab eventKey='father' title='Father' >
          <div className='tab-content'>
            <div className='tab-pane active' id='paperback'>
              <ParentsGuardianForm
                values={values}
                setValues={setValues}
                currentStudent={currentStudent}
                setStep={setStep}
                currentParent={key}
                setKey={setKey}
                nextParent={'mother'}
                previousParent={''}
                parentExist={parentExist}
                disableGender={true}
                setAllParentDetail={setAllParentDetail}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey='mother' title='Mother' >
          <div className='tab-content'>
            <div className='tab-pane active' id='paperback'>
              <ParentsGuardianForm
                values={values}
                setValues={setValues}
                currentStudent={currentStudent}
                setStep={setStep}
                currentParent={key}
                setKey={setKey}
                nextParent={'other'}
                previousParent={'father'}
                parentExist={parentExist}
                disableGender={true}
                setAllParentDetail={setAllParentDetail}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey='other' title='Guardian' >
          <div className='tab-content'>
            <div className='tab-pane active' id='paperback'>
              <ParentsGuardianForm
                values={values}
                setValues={setValues}
                currentStudent={currentStudent}
                setStep={setStep}
                currentParent={key}
                setKey={setKey}
                nextParent={''}
                previousParent={'mother'}
                parentExist={parentExist}
                disableGender={false}
                setAllParentDetail={setAllParentDetail}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
