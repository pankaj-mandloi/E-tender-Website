import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import Home from "./Home";

function CLogin(){
const[cuserid, setCUserId]=useState();
const[cuserpass,setCUserPass]= useState();
const[companyname, setCompanyName]= useState();
const[stid,setStId]=useState();
const[ctid,setCtId]=useState();
const[caddress,setCAddress]=useState();
const[ccontact,setCContact]=useState();
const[cemail,setCEMail]=useState();


const handleCUserIdText=(evt)=>{
    setCUserId(evt.target.value);
}

const handleCUserPassText=(evt)=>{
    setCUserPass(evt.target.value);
}

const handleLoginButton=()=>{
    var cuserobj={
        cuserid:cuserid,
        cuserpass:cuserpass
    };

    axios.post("http://localhost:9190/company/login",cuserobj).then((res)=>{
        if(res.data.cuserid != undefined){
            alert(res.data.cuserid);
            setCompanyName(res.data.companyname);
            setStId(res.data.stid);
            setCtId(res.data.ctid);
            setCAddress(res.data.caddress);
            setCContact(res.data.ccontact);
            setCEMail(res.data.cemail);

            const root = ReactDom.createRoot(document.getElementById("root"));
            root.render(<Home data={res.data}></Home>);
        }else{
            alert("not valid user!!");
        }
    }).catch((err)=>{
        alert("login related error"+err);
    });
}
return(
    <div>
        <center><h4 style={{backgroundColor:"black",color:"white"}}>COMPANY LOGIN PAGE</h4>
    <table border={5} style={{backgroundColor:"black", color:"white"}}>
            <tr><td>COMPANY_USER_ID</td>
                <td><input type="text" onChange={handleCUserIdText}/></td>
            </tr>
            <tr><td>COMPANY_PASSWORD</td>
                <td><input type="password" onChange={handleCUserPassText}/></td>
            </tr>
            <tr>
                    <td></td>
                    <td><button type="submit" onClick={handleLoginButton}>LOGIN</button></td>
            </tr>
            </table>
        </center>
    </div>
);
}export default CLogin;