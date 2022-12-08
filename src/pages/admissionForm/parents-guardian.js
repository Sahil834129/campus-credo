import React, { useState } from 'react';
import '../../assets/scss/custom-styles.scss';
import { Tab, Tabs } from 'react-bootstrap';
import ParentsGuardianForm from "./parents-guardian-form";
import RESTClient from "../../utils/RestClient";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initalValue = {
  relation: 'father',
  otherRelation: '',
  firstName: '',
  lastName: '',
  gender: '',
  nationality: 'Indian',
  otherNationality: '',
  maritalStatus: 'Married',
  addressLine1: 'Yes',
  qualification: 'Diploma',
  occupation: 'Chartered_Accountant',
  annualFamilyIncome: '',
  dateOfBirth: new Date()
};
export default function ParentsGuardianComponent({ currentStudent, setStep }) {
  const [key, setKey] = useState('father');
  const [parentExist, setParentExist] = useState(false);
  const [allParentDetail, setAllParentDetail] = useState([]);
  const [values, setValues] = useState(initalValue);

  const getParentDetail = (parentDetails, selectedParent) => {
    return parentDetails.find(val => {
      const parent = val.relation;
      return (parent.toLowerCase() === selectedParent);
    });
  };
  async function getUsersParent(user) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PARENT + `/${user.childId}`
      );
      if (response.data !== '') {
        const parents = response.data;
        setAllParentDetail(parents);
        const fatherDetail = getParentDetail(parents, 'father');
        if (fatherDetail) {
          setValues(val => {
            return {
              ...val,
              ...fatherDetail,
              dateOfBirth: fatherDetail?.dateOfBirth,
              otherRelation: fatherDetail?.relation,
              nationality:
                fatherDetail?.nationality === ''
                  ? 'Other'
                  : fatherDetail?.nationality

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

  useEffect(() => {
    if (key !== "father") {
      const data = getParentDetail(allParentDetail, key);
      setValues(() => {
        return {
          ...initalValue,
          ...data,
          dateOfBirth: data?.dateOfBirth,
          otherRelation: data?.relation,
          nationality:
            data?.nationality === ''
              ? 'Other'
              : data?.nationality
        };
      });
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
                parentExist={parentExist}
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
                parentExist={parentExist}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey='other' title='Others' >
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
                parentExist={parentExist}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
