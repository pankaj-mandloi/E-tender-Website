import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import CLogin from './CLogin';

function Register(){
    const[cuserid,setCUserId]=useState();
    const[cuserpass,setCUserPass]=useState();
    const[companyname,setCompanyName]=useState();
    const[stid,setStId]=useState();
    const[ctid,setCtId]=useState();
    const[caddress,setCAddress]=useState();
    const[ccontact,setCContact]=useState();
    const[cemail,setCEMail]=useState();
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);
   
    const handleCUserIdText=(evt)=>{setCUserId(evt.target.value);}
    const handleCUserPassText=(evt)=>{setCUserPass(evt.target.value);}
    const handleCompanyNameText=(evt)=>{setCompanyName(evt.target.value);}
    const handleCAddressText=(evt)=>{setCAddress(evt.target.value);}
    const handleCContactText=(evt)=>{setCContact(evt.target.value);}
    const handleCEMailText=(evt)=>{setCEMail(evt.target.value);}

    useEffect(()=>{
            axios.get("http://localhost:9190/state/show").then((res)=>{
                setStList(res.data);
            }).catch((err)=>{
                alert("state related error=>"+err);
            });
    },[]);
   
    const handleRegisterButton=()=>{
        var cuserobj={
            cuserid:cuserid,
            cuserpass:cuserpass,
            companyname:companyname,
            stid:stid,
            ctid:ctid,
            caddress:caddress,
            ccontact:ccontact,
            cemail:cemail
        };

      axios.get("http://localhost:9190/company/checkid/"+cuserid).then((res)=>{
         if(res.data.cuserid!=cuserid){
                axios.post("http://localhost:9190/company/register",cuserobj).then((res)=>{
                    alert(res.data);
                    }).catch((err)=>{
                    alert(err);
                    });
            const root = ReactDom.createRoot(document.getElementById("root"));
            root.render(<CLogin></CLogin>);
          }else{
           alert("user allready exist, Please try another User Id...");
            }
        }).catch((err)=>{
        alert(err);
        });
    }

    const handleStateSelect=(evt)=>{
        setStId(evt.target.value);
        axios.get("http://localhost:9190/city/getcitybystid/"+evt.target.value).then((res)=>{
            setCtList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleCitySelect=(evt)=>{
        setCtId(evt.target.value);
    }
return(
<div>
    <center><h5 style={{backgroundColor:"black",color:"white"}}>REGISTRATION FORM OF COMPANY USER</h5>
<table border={10} style={{backgroundColor:"black",color:"white"}}>
    <tr><th align="left" >COMPANY USER ID:</th>
        <td><input type="text" onChange={handleCUserIdText}/></td>
    </tr>
    <tr><th align="left" >COMPANY PASSWORD:</th>
        <td><input type="password" onChange={handleCUserPassText}/></td>
    </tr>
    <tr><th align="left" >COMPANY NAME:</th>
        <td><input type="text" onChange={handleCompanyNameText}/></td>
    </tr>
    <tr><th align="left" >COMPANY STATE:</th>
        <td>
            <select onClick={handleStateSelect}>
                {
                    stlist.map((item)=>(
                            <option value={item.stid}>{item.stname}</option>
                    ))
                }

            </select>
        </td>
    </tr>
    <tr><th align="left" >COMPANY CITY:</th>
        <td>
            <select onClick={handleCitySelect}>
                {
                    ctlist.map((item)=>(
                            <option value={item.ctid}>{item.ctname}</option>
                    ))
                }

            </select>
        </td>
    </tr>
    <tr><th align="left" >COMPANY ADDRESS:</th>
        <td><textarea type="text" onChange={handleCAddressText}/></td>
    </tr>
    <tr><th align="left" >COMPANY CONTACT:</th>
        <td><input type="number" onChange={handleCContactText}/></td>
    </tr>
    <tr><th align="left" >COMPANY EMAIL:</th>
        <td><input type="email" onChange={handleCEMailText}/></td>
    </tr>
    <tr><td></td>
        <td><button type="submit" onClick={handleRegisterButton}>REGISTER</button></td>
    </tr>
</table>
</center>
</div>
);
}export default Register;
