      import React from "react";
      import { BrowserRouter as Router } from "react-router-dom";
      import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, 
      MDBRow, MDBCol, MDBContainer} from "mdbreact";
      // import "./app.css";
      import Routes from "./Routes";
      
     // var authenticated = window.localStorage.getItem("isAuthenticated");
      
      class AppPage extends React.Component {
      state = {
        collapsed: false,
        authenticated: false,
        user: null,
      };

      componentDidMount()
      {
        const x = window.localStorage.getItem("isAuthenticated")==="true";
        this.setState({authenticated: x});
      }
      
      handleTogglerClick = () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
      };

      loginUser(data)
      {
        console.log("hello from loginUser");
        console.log(data);
        window.localStorage.setItem("isAuthenticated","true");
        window.localStorage.setItem("token",data.token);
        this.setState({authenticated:true, }, () => {
          document.querySelector("#hospital").click();
        });
      }

      logoutUser()
      {
        this.setState({authenticated:false} , () => {
          document.querySelector("#home").click();
        });
        window.localStorage.removeItem("isAuthenticated");
        window.localStorage.removeItem("token");
      }

      render() {
      
      return (
      <div id="apppage">
        <Router>
          <div>
            <MDBNavbar color="black" dark expand="md" fixed="top" scrolling isCollapsed={false}>
              <MDBContainer>
                <MDBNavbarBrand>
                  <strong className="white-text">OrganChain</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.handleTogglerClick.bind(this)} />
                <MDBCollapse /*isOpen={this.state.collapsed}*/ navbar>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBNavLink id="home" to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/policy">Policy</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/donorlogin">Donor Login</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink id="hospital" to={!this.state.authenticated?"/hospital":"/hospital/Profile"}>Hospital {!this.state.authenticated?"Login":null} </MDBNavLink>:
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/contact">Contact Us</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/signup">Donor Sign Up</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      {this.state.authenticated?<a className="nav-link Ripple-parent" onClick={this.logoutUser.bind(this)}>
                      Logout
                      </a>:null}
                    </MDBNavItem>

                  </MDBNavbarNav>
                
                </MDBCollapse>
                
              </MDBContainer>
            </MDBNavbar>
            {/* {this.state.collapsed && overlay} */}
            <main style={{ marginTop: "4rem" }}>
                  <Routes authenticated={this.state.authenticated} loginUser={this.loginUser.bind(this)}/>
            </main>
          </div>
        </Router>
        

        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                &copy; Developed by Group 32.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      );
      }
      }

      export default AppPage;