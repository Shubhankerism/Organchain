import React from "react";
import HosDrawer from "./HospitalNav";
import jwtDecode from 'jwt-decode';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBCardImage, MDBCardBody, MDBCardText } from "mdbreact";
import hospital from "./images/hospital.png";
import getWeb3 from "./getWeb3";
import OC from './oc';

class Hprofile extends React.Component {

  state = {
    username: 'Ace Hospital',
    hospitalpublickey: '0x68099feE8C881F514dfd6A38fe4F72B9CA5F52e3',
    address: 'Survey No. 32/2A, Pune, Maharashtra',
    contact: '020-25434063',
    city: 'Pune',
    imgurl: './images/hospital.jpg'

  }
red()
{
  console.log("fhj");
  window.localStorage.setItem("firstLoad","true");
      window.location.reload();

}
  componentDidMount =  async ()=>  {
    console.log("token= " + window.localStorage.getItem("token"));
    const user = jwtDecode(window.localStorage.getItem("token"));
    console.log("ye le user : ")
    console.log(user);
    this.setState({ ...user.user });
    const bar=await window.localStorage.getItem("firstLoad");
    setTimeout(() => {
      console.log(bar);
    {bar?null:this.red.bind()}
  },5000);
    
     // Get network provider and web3 instance.
        const web3 = await getWeb3();
        console.log("kuch bhi");
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        window.localStorage.setItem("web3account",accounts[0]);

  }

  render() {
    return (
      <MDBContainer className="mt-5 text-center">
        <MDBRow size="2">
          <HosDrawer />
        </MDBRow>

        <MDBRow size="8" style={{ marginLeft: 180 }}>
          <MDBCol>
            <MDBJumbotron className="text-center">
              <MDBCardTitle className="card-title h4 pb-2">
                <strong>{this.state.username}</strong>
              </MDBCardTitle>

              <MDBCardImage
                src={hospital}
                className="img-fluid mx-auto"
              />
              <MDBCardBody>
                <MDBCardTitle className="indigo-text h5 m-4">
                  Public Key: {this.state.hospitalpublickey}
                </MDBCardTitle>
                <MDBCardText>
                  <h5 className="font-weight-bold">Address:</h5> {this.state.address} <br />
                  <h5 className="font-weight-bold">Contact:</h5> {this.state.contact}<br />
                  <h5 className="font-weight-bold">City:</h5> {this.state.city}<br />
                </MDBCardText>


              </MDBCardBody>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}



export default Hprofile;