import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const LeftMenuBar = props => {
  const location = useLocation()
  const pageRef =
    '/' +
    (props.parentPage ? props.parentPage + '/' : '') +
    location.pathname.split('/')[1]
  
  return (
    <div className='inner-page-content left sidebar'>
      <Nav defaultActiveKey='/home' className='sideNav-indicator'>
        {props.menuItems.filter(it=> it.show !== false).map((menuItem, index) => {
          return (
            <Fragment key={'sidemenuItem_' + index}>
              <Navbar.Text>
                <Link
                  className={menuItem.ref === pageRef || (props.step ? menuItem.menuIndex == props.step : false) ? 'active' : ''}
                  to={menuItem.ref}
                  
                >{menuItem.icon ? <i className={'icons '+menuItem.icon}></i>:
                  <span className='indicator'><span className='indiShape circle'></span></span> }
                  <span className='category-name'>{menuItem.title}</span>
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
