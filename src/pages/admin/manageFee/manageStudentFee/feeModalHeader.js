import { humanize } from "../../../../utils/helper";

export default function FeeModalHeader({student, session }) {
  return(
    <div
      className='title-area stufeedetal'
      // style={{ backgroundColor: '#F0EEF2', padding: '5px', border: '1px solid lightGrey', display: 'flex', justifyContent: 'flex-start', paddingLeft:'25px' }}
    >
      <h2 className="title"> {`${humanize(student.firstName)} ${humanize(student.lastName)} `} </h2>
      <div className="tag-wrapper">
        <span className="tag-item">
          <label>ID - </label> <strong>{student.schoolStudentId}</strong>
        </span>
        <span className="tag-item"><label>Roll No. - </label> <strong>{student.rollNo}</strong></span>
        <span className="tag-item"><label>Academic Year - </label> <strong>{session ? `(${session})` : ''}</strong></span>
        <span className="tag-item"><label>Class - </label> <strong>{student.className}</strong></span>
        <span className="tag-item" 
          // style={{ border: '1px solid black', padding: '0px 8px 0px 8px', borderRadius: '4px', marginLeft: '5px' }}
        >
          <label 
            // style={{ color: 'grey' }}
          >Section - </label> <strong>{student.classSection}</strong>
        </span>
      </div>
    </div>
  )
}
