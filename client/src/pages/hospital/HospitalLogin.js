import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './css/HomePage.css';

const config = {
  url: "http://localhost:5000/hello/api/hospital/Indore"
}

class FormPage extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      email: null,
      password: null
    }
  }

  componentDidMount()
  {
    if(window.localStorage.getItem("isAuthenticated")==="true")
    {
      this.props.history.push('/hospital/Profile');
    }
  }

  onEmailChange(e)
  {
    this.setState({email: e.target.value});
    // console.log(this.state);
  }
  
  onPasswordChange(e)
  {
    this.setState({password: e.target.value});
    // console.log(this.state);
  }

  onSubmit()
  {
    axios.get(config.url)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));
    // axios.post(config.url, {
    //   username: this.state.email,
    //   password: this.state.password
    // })
    // .then(console.log("JO"))
    // .then(() => {
    //   console.log(res);
    //   // window.localStorage.setItem("isAuthenticated","true");
    //   this.props.history.push('/hospital/Profile');
    // })
    // .catch((err)=>window.alert(err));
  }
  render()
  {
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
                type="email"
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