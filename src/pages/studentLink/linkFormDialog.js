import { useState } from 'react';
import GenericDialog from '../../dialogs/GenericDialog';
import { getLocalData } from '../../utils/helper';
import StudentForm from './studentForm';

import ConfirmDetailPage from './confirmDetailPage';
import OtpPage from './otpPage';


const LinkFormDialog = ({ setShowForm, showForm, setUpdateTable, }) => {

    const [data, setData] = useState([])
    const [displayCss, setDisplayCss] = useState(true)
    const [searchResponse, setSearchResponse] = useState(0)
    const [page, setPage] = useState(1)

    const userId = getLocalData('userId')

    const handleClose = () => {
        setDisplayCss(true)
        setSearchResponse(0)
        setShowForm(false)
        setPage(1)
    }
    
    return (
        <GenericDialog
            show={showForm}
            handleClose={handleClose}
            modalHeader="Enroll Student For Fee Payment"
            className="enroll-student-model"
        >
            {page === 1 && <div className='esf-content-outer' 
            
            // style={{
            //     display: 'flex',
            //     width: '100%',
            //     justifyContent: 'flex-start',
            //     height: '100%',
            // }}
            >
                <StudentForm setData={setData} setSearchResponse={setSearchResponse} setDisplayCss={setDisplayCss} />
                <OtpPage searchResponse={searchResponse} displayCss={displayCss} setPage={setPage} userId={userId}/>
            </div>}
            {page === 2 && <ConfirmDetailPage data={data} userId={userId} setShowForm={setShowForm} setUpdateTable={setUpdateTable} handleClose={handleClose}/>}
        </GenericDialog >
    )
}

export default LinkFormDialog;