import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import PageContent from '../resources/pageContent'

const LeftMenuBar = props => {
  const location = useLocation()
  const pageRef =
    '/' +
    (props.parentPage !== null && props.parentPage !== ''
      ? props.parentPage + '/'
      : '') +
    location.pathname.split('/')[2]

  return (
    <div className='inner-page-content left sidebar'>
      <Nav defaultActiveKey='/home' className='sideNav-indicator'>
        {props.menuItems.map((menuItem, index) => {
          return (
            <Fragment key={'sidemenuItem_' + index}>
              <Navbar.Text>
                <Link
                  className={menuItem.ref === pageRef ? 'active' : ''}
                  to={menuItem.ref}
                >
                  {menuItem.title}
                </Link>
              </Navbar.Text>
            </Fragment>
          )
        })}
      </Nav>
    </div>
  )
}

export default LeftMenuBar
