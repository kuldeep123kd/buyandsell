import React from 'react';
import { Link } from 'react-router-dom';

import './SubHeader.scss';

export default class Header extends React.Component {

render() {
  return (
    <div className="sub-nav" >
      <div className="container">
        <div className="d-flex align-items-center sub-nav-child">
          {/* <div className="categories">
            <div className="burger-cat h-100 d-flex align-items-center justify-content-start" >
              <div className="burger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div> */}
          <div className="subnav-menu d-flex align-items-center">
            <ul className="navbar-menulist">
              {/* <li><Link to="#home">Ready to Ship</Link></li>
              <li><Link to="#link">Trade Shows</Link></li> */}
              <li>
                <Link className="main-list" to="#link">Electronics<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="#link">TV & Appliances<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="/">Men<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="/">Women<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="/">Home & Furniture<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="/">Baby & Kids<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="main-list" to="/">Sports, Books & More<i className="fa fa-chevron-down"></i></Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li><Link to="#home">Kitchen</Link></li>
                      <li><Link to="#link">Cup</Link></li>
                      <li>
                        <Link to="#link">Launch Box<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li>
                        <Link to="#link">Bottles<i className="fa fa-chevron-right"></i></Link>
                      </li>
                      <li><Link to="/">Bottles</Link></li>
                      <li><Link to="/">Bottles</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* <li><Link to="/">Women<i className="fa fa-chevron-down"></i></Link></li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )}
}