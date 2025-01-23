import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import Home from "./Home";

function Login(){
const[suserid, setSUserId]=useState();
const[suserpass,setSUserPass]= useState();
const[sfullname, setSFullName]= useState();
const[saddress,setSAddress]=useState();
const[scontact,setSContact]=useState();
const[semail,setSEMail]=useState();
const[spicname,setSPicName]=useState();
const[spcatgid,setSPCatgId]=useState();
const[sranking,setSRanking]=useState();

const handleSUserIdText=(evt)=>{
    setSUserId(evt.target.value);
}

const handleSUserPassText=(evt)=>{
    setSUserPass(evt.target.value);
}

const handleLoginButton=()=>{
    var suserobj={
        suserid:suserid,
        suserpass:suserpass
    };

    axios.post("http://localhost:9190/supplier/login",suserobj).then((res)=>{
        if(res.data.suserid != undefined){
            alert(res.data.suserid);
            setSFullName(res.data.sfullname);
            setSAddress(res.data.saddress);
            setSContact(res.data.scontact);
            setSEMail(res.data.semail);
            setSPCatgId(res.data.spcatgid);
            setSRanking(res.data.sranking);
            setSPicName(res.data.spicname);

            const root = ReactDom.createRoot(document.getElementById("root"));
            root.render(<Home data={res.data}></Home>);
        }else{
            alert("not valid user!!");
        }
    }).catch((err)=>{
        alert("hello"+err);
    });
}
return(
    <div>
        <center><h4 style={{backgroundColor:"black",color:"white"}}>SUPPLIER LOGIN PAGE</h4>
    <table border={10} style={{backgroundColor:"black"}}>
            <tr>
                <td style={{color:"white"}}>USER_ID</td>
                <td><input type="text" onChange={handleSUserIdText}/></td>
            </tr>
            <tr>
                <td style={{color:"white"}}>PASSWORD</td>
                <td><input type="password" onChange={handleSUserPassText}/></td>
            </tr>
            <tr>
                    <td></td>
                    <td><button type="submit" onClick={handleLoginButton}>LOGIN</button></td>
            </tr>
            </table>
        </center>
    </div>
);
}export default Login;