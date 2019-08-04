import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import './css/HomePage.css';
//import PrivateRoute from "./PrivateRoute";

// const config = {
//   url: "http://localhost:5000/hello/login"
// }

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      authenticated: false
    }
  }

  componentDidMount() {
    if (window.localStorage.getItem("isAuthenticated") === "true") {
      this.props.history.push('/hospital/Profile');
    }
  }

  onEmailChange(e) {
    this.setState({ username: e.target.value });
    // console.log(this.state);
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    //console.log(this.state);
  }

  onSubmit() {
    console.log("login api called");
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        console.log("then ke andar");
        console.log(res);
        if (!res.data.token) {
          window.alert("Wrong Credentials");
        }
        else {
          this.props.loginUser(res.data);
        }



        //this.props.history.push('/hospital/Profile');
      })
      // .then(()=>this.props.history.push('/hospital/Profile'))
      .catch((err) => window.alert(err));
  }
  render() {
    return (
      <div className="mt-12 views">
        <br></br><br></br><br></br>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" className="mx-auto">
              <MDBCard>
                <div className="header pt-3 peach-gradient">
                  <MDBRow className="d-flex justify-content-center">
                    <h3 className="white-text mb-3 pt-3 font-weight-bold">
                      Hospital Log in
                </h3>
                  </MDBRow>
                </div>
                <MDBCardBody className="mx-4">

                  <MDBInput
                    label="Your email"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.onEmailChange.bind(this)}
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                    onChange={this.onPasswordChange.bind(this)}
                  />

                  <div className="text-center mb-3">
                    <MDBBtn className="text-center btn" color="success" onClick={this.onSubmit.bind(this)} /*href="/hospital/nav"*/>
                      Sign in
                </MDBBtn>
                  </div>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  };
}
export default FormPage;