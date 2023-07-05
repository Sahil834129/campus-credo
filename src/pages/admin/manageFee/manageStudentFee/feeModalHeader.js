import { humanize } from "../../../../utils/helper";

export default function FeeModalHeader({student, session }) {
  return(
    <div
      className='title-area'
      style={{ backgroundColor: '#F0EEF2', padding: '5px', border: '1px solid lightGrey', display: 'flex', justifyContent: 'flex-start', paddingLeft:'25px' }}
    >
      <span>
        <b>{`${humanize(student.firstName)} ${humanize(student.lastName)} `}</b>
      </span>
      <span style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}>
        <b>
          <label style={{ color: 'grey' }}>ID - </label>{student.schoolStudentId}
        </b>
      </span>
      <span style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}>
        <b>
          <label style={{ color: 'grey' }}>Roll No. - </label>{student.rollNo}
        </b>
      </span>
      <span style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}>
        <b>
          <label style={{ color: 'grey' }}>Academic Year - </label>{`(${session})`}
        </b>
      </span>
      <span style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}>
        <b>
          <label style={{ color: 'grey' }}>Class - </label>{student.className}
        </b>                    
      </span>
      <span style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}>
        <b>
          <label style={{ color: 'grey' }}>Section - </label>{student.classSection}
        </b>
      </span>
    </div>
  )
}
