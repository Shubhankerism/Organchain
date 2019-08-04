import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact';
import './css/HomePage.css';
import OC from './oc';
import ipfs from './ipfs';

class FormPage extends React.Component {

    state = {
        dkey: null,
        donorid:'',
        organ:'',
        ipfsHash:'',
        bgroup:'',
        recipientid:'',
        dname:'',
        dcity:'',
        daddress:'',
        demail:'',
        dcontact:'',
        hid: '',
        rhash: '',
        rorgan: '',
        rbgroup:'',
        rid:'',
        rname:'',
        rcity:'',
        raddress:'',
        rcontact:'',
        remail:'' 
      }

     
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
      
    onSubmit=async()=>{
          event.preventDefault();
          console.log("Dkey: "+this.state.dkey);
          console.log("record ke submit ke andar");
        await OC.methods.getdonor(this.state.dkey).call().then((donor) => {
            this.setState({ donorid: donor[0],
            ipfsHash: donor[1],
            organ: donor[2],
            bgroup: donor[3],
            recipientid: donor[4] });
            console.log(this.state);
            ipfs.cat(donor[1], (err,res) => {
          if(err) 
          {
        console.error(err)
      return
    }
      const temp=JSON.parse(res.toString());
      console.log(temp);
      var ten=JSON.parse(temp);
      this.setState({ dname: ten["name"],
            daddress: ten["address"],
            dcity: ten["city"],
            demail: ten["email"],
            dcontact: ten["contact"] });
      console.log(this.state);

      });
            if(donor[4]==="0x0000000000000000000000000000000000000000")
              console.log("no recipient match");
            else
              console.log("recipiet hai");
        });
        setTimeout(() => {
          if(this.state.recipientid==="0x0000000000000000000000000000000000000000"){
            console.log("no recipient match");
          }
          else {
        OC.methods.getrecipient(this.state.recipientid).call().then((recipient) => {
            this.setState({ rid: recipient[0],
            hid: recipient[1],
            rhash: recipient[2],
            rorgan: recipient[3],
            rbgroup: recipient[4] });
            console.log(this.state);
            ipfs.cat(recipient[2], (err,res) => {
          if(err) 
          {
        console.error(err)
      return
    }
      const temp=JSON.parse(res.toString());
      console.log(temp);
      var ten=JSON.parse(temp);
      this.setState({ rname: ten["name"],
            raddress: ten["address"],
            rcity: ten["city"],
            remail: ten["email"],
            rcontact: ten["contact"] });
      console.log(this.state);
    });
      });
      }
      }, 3000);
  }

render(){
  return (
    <div className="mt-12 views">
    <br></br><br></br><br></br>
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="mx-auto">
          <MDBCard>
          <div className="header pt-3 blue-gradient">
              <MDBRow className="d-flex justify-content-center">
                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                   Donor Log in
                </h3>
              </MDBRow>
             
            </div>
            <MDBCardBody className="mx-4">
              
               <MDBInput
                label="Enter Key"
                group
                type="text"
                name="dkey"
                onChange={this.onChange.bind(this)}
               
              />
             
              <div className="text-center mb-3">
                <MDBBtn
                  className="text-center btn" color="success"
                  onClick={this.onSubmit.bind(this)}
                >
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
}
}

export default FormPage;