import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import Container from 'react-bootstrap/Container'
import { ReactComponent as CampusLogo } from '../../assets/img/campuscredso-logo.svg'
import { ReactComponent as SignupGraphic } from '../../assets/img/singup-graphic1.svg'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ListGroup from 'react-bootstrap/ListGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Avatar from 'react-avatar'

export const Dashboard = () => {
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=''
      ref={ref}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      &#x25bc;
    </a>
  ))

  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className='mx-3 my-2 w-auto'
            placeholder='Type to filter...'
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <ul className='list-unstyled'>
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      )
    }
  )

  const history = useNavigate()
  return (
    <Container className='main-container' fluid>
      <div className='top-navigation'>
        <div className='items-row'>
          <div className='item-col'>
            <Link href=''>
              <CampusLogo />
            </Link>
          </div>
          <div className='item-col'>
            <div className='inner-cell'>
              <label className='datetime'> 11 October 2022 - 9:09 PM</label>
            </div>
            <div className='inner-cell profile-info'>
              <Avatar name='Wim Mostmans' size='28' round={true} />
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id='dropdown-custom-components'
                >
                  Custom toggle
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
                  <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
                  <Dropdown.Item eventKey='3' active>
                    Orange
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='1'>Red-Orange</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='inner-cell'>
              <Link href=''>
                <i className='icons union-icon'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Navbar className='mainmenu-wrap'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='menu-items'>
            <Nav.Link className='active-page' href='#'>
              Dashboard
            </Nav.Link>
            <Nav.Link href='#'>Manage Application</Nav.Link>
            <Nav.Link href='#'>Manage Admission</Nav.Link>
            <Nav.Link href='#'>Manage Fees</Nav.Link>
            <Nav.Link href='#'>Manage Users</Nav.Link>
            <Nav.Link href='#'>Manage Users</Nav.Link>
          </Nav>
          <Button className='guide-btn'>Guide</Button>
        </Navbar.Collapse>
      </Navbar>

      <div className='content-area'>
        <div className='title-kpi-wrapper'>
          <Breadcrumb className='bc-nav'>
            <Breadcrumb.Item href='#'>Admin</Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className='kpi-wrapper'>
            <ListGroup className='kpi-list-group'>
              <ListGroup.Item>
                <label className='lbl'>Seats</label>{' '}
                <span className='value'>200</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <label className='lbl'>Application Received</label>{' '}
                <span className='value'>300</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <label className='lbl'>Under Review</label>{' '}
                <span className='value'>60</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <label className='lbl'>AT/PI</label>{' '}
                <span className='value'>80</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <label className='lbl'>Final Review</label>{' '}
                <span className='value'>20</span>
              </ListGroup.Item>
              <ListGroup.Item className='application-status'>
                <label className='lbl'>Application Status</label>
                <div className='app-status-cell'>
                  <label className='lbl'>Accepted</label>{' '}
                  <span className='value'>20</span>
                </div>
                <div className='app-status-cell'>
                  <label className='lbl'>Declined</label>{' '}
                  <span className='value'>10</span>
                </div>
                <span className='value'>
                  Accepted <span>20</span>
                </span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>

        <div className='content-area-inner'>
          <div className='metrics-wrap'>
            <div className='metrics-block mb1'>
              <div className='title-area'>
                <h2>Application Processing </h2>
                <div className='value'>90</div>
              </div>
              <ListGroup className='mlist-group'>
                <ListGroup.Item>
                  <div className='mitem-wrap'>
                    <label className='lbl'>Application Approved</label>{' '}
                    <span className='value'>70</span>
                  </div>
                  <div className='mitem-wrap'>
                    <label className='lbl'>Under Review</label>{' '}
                    <span className='value'>4</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='mitem-wrap'>
                    <label className='lbl'>AT/PI</label>{' '}
                    <span className='value'>10</span>
                  </div>
                  <div className='mitem-wrap'>
                    <label className='lbl'>Under Final Review</label>{' '}
                    <span className='value'>6</span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className='metrics-block mb2'>
              <div className='title-area'>
                <h2>All Seats</h2>
                <div className='value'>200</div>
              </div>
              <ListGroup className='mlist-group'>
                <ListGroup.Item>
                  <div className='info'>
                    <label>Opening:</label>
                    <span className='value'>200</span>
                  </div>
                  <ProgressBar variant='success' now={40} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='info'>
                    <label>Filled:</label>
                    <span className='value'>80</span>
                  </div>
                  <ProgressBar variant='warning' now={60} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='info'>
                    <label>Vacant:</label>
                    <span className='value'>120</span>
                  </div>
                  <ProgressBar variant='danger' now={80} />
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className='metrics-block mb3'>
              <div className='title-area'>
                <h2>Application Approved Vs Offers Accepted</h2>
              </div>
              <div className='chart-area'>sdsdsds</div>
            </div>
          </div>
          <div className='chart-wrap'>
            <div className='chart-block ch1'>
              <div className='title-area'>
                <div className='left-col'>
                  <h2>Application Status</h2>
                </div>
                <div className='right-col'>
                  <ListGroup className='clist-group'>
                    <ListGroup.Item>
                      <span className='value'>1200</span>
                      <label>Received</label>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className='value'>180</span>
                      <label>Approved</label>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className='value'>20</span>
                      <label>Declined</label>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className='chart-area'>dsdsdsd</div>
            </div>
            <div className='chart-block ch2'>
              <div className='title-area'>
                <div className='right-col'>
                  <ListGroup className='clist-group'>
                    <ListGroup.Item>
                      <span className='value'>200</span>
                      <label>Total Seats</label>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className='value'>1200</span>
                      <label>Application Received</label>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className='value'>₹8500</span>
                      <label>Fee Collected</label>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className='chart-area'>dsdsdsd</div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-panel'>
        <Link href=''>Terms &amp; Conditions</Link>
      </div>
    </Container>
  )
}
export default Dashboard
