import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import { useEffect } from 'react';
import { useState } from 'react';
import { getClassAdmissionSummary } from '../../../utils/services';
import ShowApplications from "./showApplications";
import OpenModal from "./openModal";


export const ManageApplication = () => {
  const selectedClass = 1;
  const [openModal, setOpenModal] = useState(false);
  const [admissionData, setAdmisiionData] = useState(null);
  const [applicationStaus, setApplicationStatus] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const fetchClassAdmissionSummary = (classId) => {
    getClassAdmissionSummary(classId)
      .then(response => {
        if (response.status === 200) {
          setAdmisiionData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };



  useEffect(() => {
    fetchClassAdmissionSummary(selectedClass);
  }, [selectedClass]);

  return (
    <Layout admissionSummary={admissionData?.upperSchoolAdmissionSummary}>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <div className='filterpanel'>
            <div className='filter-head'>
              <span className='filter-title'>
                <i className='icons filter-icon'></i>
                <label>Filters</label>
              </span>
              <Link href=''>Clear All</Link>
            </div>
            <div className='filter-form-area'>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Select Class</Form.Label>
                <Form.Select aria-label='Default select example'>
                  <option value='1'>UKG</option>
                  <option value='2'>LKG</option>
                  <option value='3'>Nursery</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Age</Form.Label>
                <Form.Select aria-label='Default select example'>
                  <option>Select Age</option>
                  <option value='1'>UKG</option>
                  <option value='2'>LKG</option>
                  <option value='3'>Nursery</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Family Income</Form.Label>
                <div className='inner-container'>
                  <div className='slider-block'>
                    <Form.Range />
                  </div>
                  <div className='input-val-wrapper'>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='0' />
                    </div>
                    <div className='value-cell'>
                      <Form.Label className=''>Max</Form.Label>
                      <Form.Control type='text' placeholder='20L' />
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Marks/Grades/GPA</Form.Label>
                <div className='inner-container'>
                  <div className='options-wrap'>
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      checked
                      label='Marks'
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      label='GPA'
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      label='Grade'
                    />
                  </div>
                  <div className='slider-block'>
                    <Form.Label className='form-label'>Add Marks</Form.Label>
                    <Form.Range />
                  </div>
                  <div className='input-val-wrapper'>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='100' />
                    </div>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='10.0' />
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Transport</Form.Label>
                  <div className='radio-choice'>
                    <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Boarding</Form.Label>
                  <div className='radio-choice'>
                    <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' />
                  </div>
                </div>
              </Form.Group>
            </div>
          </div>
          <ShowApplications
            selectedClass={selectedClass}
            applicationStaus={applicationStaus}
            setApplicationStatus={setApplicationStatus}
            applicationId={applicationId}
            setApplicationId={setApplicationId}
            setOpenModal={setOpenModal}
          />
          <OpenModal
            show={openModal}
            setShow={setOpenModal}
            applicationStaus={applicationStaus}
            setApplicationStatus={setApplicationStatus}
            applicationId={applicationId}
            setApplicationId={setApplicationId}
          />
        </div>
      </div>
    </Layout>
  );
};
export default ManageApplication;
