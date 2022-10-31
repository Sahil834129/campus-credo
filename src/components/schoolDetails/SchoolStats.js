import React from "react";

const SchoolStats = (props) => {
    const schoolDetails = props.schoolDetails;
    return (
        <><h2>Academic Stats</h2><div className='academic-stats-content'>
            <div className='academic-stats-row'>
                <div className='cell'>
                    <div className='title'>Board</div>
                    <div className='particular'>{schoolDetails.board}</div>
                </div>
                <div className='cell'>
                    <div className='title'>Ownership</div>
                    <div className='particular'>{schoolDetails.ownership}</div>
                </div>
                <div className='cell'>
                    <div className='title'>School Level</div>
                    <div className='particular'>{schoolDetails.schoolLevel}</div>
                </div>
            </div>
            <div className='academic-stats-row'>
                <div className='cell'>
                    <div className='title'>Co-Ed Status</div>
                    <div className='particular'>{schoolDetails.gender}</div>
                </div>
                <div className='cell'>
                    <div className='title'>Establishment Year</div>
                    <div className='particular'>{schoolDetails.yearEstablishedIn}</div>
                </div>
                <div className='cell'>
                    <div className='title'>School Format</div>
                    <div className='particular'>{schoolDetails.schoolFormat}</div>
                </div>
            </div>
            <div className='academic-stats-row'>
                <div className='cell'>
                    <div className='title'>School Medium</div>
                    <div className='particular'>{schoolDetails.mediumOfInstruction}</div>
                </div>
                <div className='cell'>
                    <div className='title'>Academic Session</div>
                    <div className='particular'>{schoolDetails.admissionInfo?.admissionSession}</div>
                </div>
                <div className='cell'>
                    <div className='title'>Student/Teacher Ratio</div>
                    <div className='particular'>{schoolDetails.studentTeacherRatio}</div>
                </div>
            </div>
            <div className='academic-stats-row'>
                <div className='cell'>
                    <div className='title'>School Timings</div>
                    <div className='particular'>8:00 a.m. to 3:00 p.m.</div>
                </div>
                <div className='cell'>
                    <div className='title'>Admission Status</div>
                    <div className='particular'>{schoolDetails.admissionInfo?.admissionStatus} for {schoolDetails.admissionInfo?.admissionSession}</div>
                </div>
                <div className='cell'>
                    <div className='title'>Academic Performance</div>
                    <div className='particular'>{schoolDetails.academicPerformancePerc}%</div>
                </div>
            </div>
        </div></>
    )
}

export default SchoolStats;