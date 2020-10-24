import React from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { STATE_HANDLER } from '../../../../shared/STATE_HANDLER';
import './SubHeader.scss';
import Axios from 'axios';

const tk = localStorage.getItem("token");

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showcategories: false,
      linkSend: false
    };
  }

  static contextType = STATE_HANDLER;

  sendLink(){
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`, {
      requestType:"VERIFY_EMAIL",
      idToken: tk
    })
    .then(resp => {
      console.log(resp);
      if(resp.status === 200) {
        this.setState({
          linkSend: true
        });
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
    })
    // this.setState({
    //   linkSend: true
    // });
  }

render() {
  return (
    <div className="sub-nav">
      <div className="email-verify-notify d-flex align-items-center w-100">
        <div className="container">
          {!this.context.userInfo.emailVerified && 
            <div>
              <h1 style={{display: this.state.linkSend ? "none" : "block"}}>Email not verified, <span onClick={() => this.sendLink()}>Click here to verify.</span></h1>
              {
                this.state.linkSend && <h1>Verification link sent... , Haven't received the link <span onClick={() => this.sendLink()}>Resend.</span></h1>
              }
            </div>
          }
        </div>
      </div>
      <div className="container">
        <div className="d-flex align-items-center sub-nav-child">
          {/*  */}
          <div className="subnav-menu d-flex align-items-center">
            <ul
              className={`navbar-menulist ${
                this.context.showcategories ? "showcategories" : ""
              }`}
            >
              {/* <li><Link to="#home">Ready to Ship</Link></li>
              <li><Link to="#link">Trade Shows</Link></li> */}
              <li className="main-list-parent">
                <Link className="main-list" to="#link">
                  Electronics
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="#link">
                  TV & Appliances
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="/">
                  Men
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="/">
                  Women
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="/">
                  Home & Furniture
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="/">
                  Baby & Kids
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="main-list-parent">
                <Link className="main-list" to="/">
                  Sports, Books & More
                  <ExpandMoreRoundedIcon />
                </Link>
                <ul className="categories-menu">
                  <li>
                    <ul>
                      <li>
                        <Link to="#home">Kitchen</Link>
                      </li>
                      <li>
                        <Link to="#link">Cup</Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Launch Box
                        </Link>
                      </li>
                      <li>
                        <Link to="#link">
                          Bottles
                        </Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
                      <li>
                        <Link to="/">Bottles</Link>
                      </li>
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
  );
}
}