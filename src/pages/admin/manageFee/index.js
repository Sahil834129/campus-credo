import Nav from 'react-bootstrap/Nav'
import { getCurrentModulePermission } from '../../../utils/helper'
import Layout from '../layout'
import { useState } from 'react'
import { MANAGE_FEE_OPTIONS } from '../../../constants/app'
import { ManageFeesTypes } from './manageFeeTypes'
import { FeeSettings } from './feeSettings'
import { ManageClassFees } from './manageClassFees'

export const ManageFees = () => {
  const [visible, setVisible] = useState('manageFeeTypes')
  const isWritePermission = getCurrentModulePermission("Manage Admission");

  return (
    <Layout>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <div className='filterpanel sidenav'>
            <Nav defaultActiveKey='default' className='flex-column'>
              {MANAGE_FEE_OPTIONS.map((val) => {
                return (
                  <Nav.Link key={val.value} onClick={() => setVisible(`${val.value}`)}>{val.text}</Nav.Link>
                )
              })}
            </Nav>
          </div>
          {(() => {
            switch (visible) {
              case 'manageFeeTypes':
              case 'manageClassFees':
                return <ManageClassFees />;
              case 'feeSettings':
                return <FeeSettings isWritePermission={isWritePermission} />
              default:
                return <ManageFeesTypes />;
            }
          })()}


        </div>
      </div>
    </Layout >
  )
}
export default ManageFees
