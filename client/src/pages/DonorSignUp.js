import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";
import axios from "axios";


class FormsPage extends React.Component {
  state = {
    name: "Mark",
    address: "",
    city: "",
    email: "",
    contact: "",
    bloodgroup: "",
    organ: ""
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const { name, address, city, email, contact, bloodgroup, organ } = this.state;
    axios.post('/api/adddonor',{name, address, city, email, contact, bloodgroup, organ})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div >
        <MDBRow>
        <MDBCol>
          {/* <MDBJumbotron> */}
            <h4 className="h3 display-3 text-center mt-5 mb-5" >New Donor? Sign up here!</h4>
           
          {/* </MDBJumbotron> */}
        </MDBCol>
      </MDBRow>
        <form
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate
        >
          <MDBRow center>
          <MDBCol md="4">
              <MDBInput
                value={this.state.name}
                name="name"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Full name"
                required
              >
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow center>
            <MDBCol md="4">
            <MDBInput
                value={this.state.contact}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="contact"
                label="Contact"
                required
              >
            <div className="valid-feedback">Looks good!</div>
              </MDBInput>
            </MDBCol>
           
            <MDBCol md="4">
              <MDBInput
                value={this.state.address}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="address"
                label="Address"
                required
              >
            <div className="valid-feedback">Looks good!</div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow center>  
            <MDBCol md="4">
              <MDBInput
                value={this.state.city}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="city"
                label="Zip"
                required
              >
                <div className="invalid-feedback">
                  Please provide a valid zip.
                </div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
            </MDBCol>

            <MDBCol md="4">
              <MDBInput
                value={this.state.email}
                onChange={this.changeHandler}
                type="email"
                id="materialFormRegisterConfirmEx3"
                name="email"
                label="Your Email address"
              >
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </MDBInput>
            </MDBCol>

          </MDBRow>

          <MDBRow center>
            <MDBCol md="4">
            <MDBInput
                value={this.state.bloodgroup}
                onChange={this.changeHandler}
                type="email"
                id="materialFormRegisterConfirmEx3"
                name="bloodgroup"
                label="Your Blood Group"
              >
               
              </MDBInput>
            </MDBCol>
            
            <MDBCol md="4">
              <MDBInput
                value={this.state.organ}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="organ"
                label="Organ"
                required
              >
              </MDBInput>
            </MDBCol>
          </MDBRow>
         
          <MDBRow center>
          <MDBBtn color="success" type="submit">
            Submit Form
          </MDBBtn>
          </MDBRow>
          
        </form>
      </div>
    );
  }
}

export default FormsPage;