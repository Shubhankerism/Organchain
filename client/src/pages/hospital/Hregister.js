import React from "react";
import HosDrawer from "./HospitalNav";
import { MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";
import ipfs from './ipfs';
import jwtDecode from 'jwt-decode';
//import Web3 from 'web3';
import getWeb3 from "./getWeb3";
import OC from './oc';
// import axios from 'axios';

// const config = {
//   url: "http://localhost:5000/hello/loggedin"
// }

class FormsPage extends React.Component {
  state = {
    name: "Otto",
    address: "",
    city: "",
    email: "",
    contact: "",
    bgroup: "",
    organ: "",
    patientkey: '',
    account: null,
    buffer: null,
    ipfsHash: '',
    EMRHash: '',
    hkey:''
  }
  componentDidMount = async () => {
    console.log("Hello from recipient register");
    const user = await jwtDecode(window.localStorage.getItem("token"));
   this.setState({hkey:user.user.hospitalpublickey})
   console.log(this.state.hkey);
    const acc = await window.localStorage.getItem("web3account");
        this.setState({ account: acc });
        console.log(this.state.account);
}

onfileChange(e) {
  event.preventDefault()
  const file = e.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
  }
}

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    console.log(this.state);
    const data = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      city: this.state.city,
      address: this.state.address,
      contact: this.state.contact
  });
  console.log(data);
  var buf = Buffer.from(JSON.stringify(data));
  console.log("buffer:", buf);
  ipfs.files.add(buf, (error, result) => {
      if (error) {
          console.error(error)
          return
      }
      this.setState({ ipfsHash: result[0].hash });
      console.log('ipfsHash', this.state.ipfsHash);
  });
  ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
          console.error(error)
          return
      }
      this.setState({ EMRHash: result[0].hash })
      console.log('EMRHash', this.state.EMRHash);
  });

  setTimeout(() => {
      OC.methods.addrecipient(this.state.hkey,this.state.patientkey, this.state.ipfsHash, this.state.EMRHash, this.state.organ, this.state.bgroup).send({
          from: this.state.account,
          gas: 2000000
      })
          .then((result) => {
              if (result.status == false) {
                  console.log("could not add recipient. re-try again");
              }
              else if (result.status == true) {
                  console.log("recipient gaya in blockchain");
              }
          });

  }, 30000);
    
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div >
        <MDBRow>
            <HosDrawer/>
        <MDBCol>
          {/* <MDBJumbotron> */}
            <h4 className="h3 display-4 text-center mt-5 mb-5" >Register new recipient here.</h4>
           
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
          <MDBCol md="4">
          <MDBInput
                value={this.state.patientkey}
                name="patientkey"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterEmailEx2"
                label="Public Key"
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
                label="City"
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
                value={this.state.bgroup}
                onChange={this.changeHandler}
                type="email"
                id="materialFormRegisterConfirmEx3"
                name="bgroup"
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
            <MDBCol md="4">
            <MDBInput
                onChange={this.onfileChange.bind(this)}
                type="file"
                id="materialFormRegisterConfirmExc3"
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