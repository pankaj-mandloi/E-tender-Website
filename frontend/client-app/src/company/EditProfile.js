import React, {useState,useEffect} from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import CLogin from "./CLogin";
import {useHistory} from "react-router-dom";

function EditProfile(props){

    
    function goBack(){
          
    }

    const[cuserid,setCUserId]= useState(props.data.cuserid);
    const[cuserpass,setCUserPass]= useState(props.data.cuserpass);
    const[companyname, setCompanyName]= useState(props.data.companyname);
    const[stid,setStId]=useState(props.data.stid);
    const[ctid,setCtId]=useState(props.data.ctid);
    const[caddress,setCAddress]=useState(props.data.caddress);
    const[ccontact,setCContact]=useState(props.data.ccontact);
    const[cemail,setCEMail]=useState(props.data.cemail);
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);

    const handleCUserIdText=(evt)=>{setCUserId(evt.target.value); }
    const handleCUserPassText=(evt)=>{setCUserPass(evt.target.value);}
    const handleCompanyNameText=(evt)=>{setCompanyName(evt.target.value);}
    const handleStIdText=(evt)=>{setStId(evt.target.value);}
    const handleCtIdText=(evt)=>{setCtId(evt.target.value);}
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

        axios.put("http://localhost:9190/company/editprofile/",cuserobj).then((res)=>{
        alert(res.data);
        }).catch((err)=>{
        alert(err);
        })

        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<CLogin></CLogin>);
    }
    const handleStateSelect=(evt)=>{
        setStId(evt.target.value);
       // alert(evt.target.value);
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
        <div><center>
        <h5 style={{backgroundColor:"black",color:"white"}}>EDIT COMPANY USER PROFILE</h5>

        <div style={{align:"left"}}>
            <th>
               <button style={{backgroundColor:"black",color:"white",borderRadius:"10px"}} onClick={goBack}>Go Back</button> 
            </th>
                    
        </div>

        <table style={{backgroundColor:"black",color:"white"}}>
            <tr>
                <td>COMPANY USER ID:</td>
                <td><input type="text" readOnly onChange={handleCUserIdText} value={cuserid}/></td>
            </tr>
            <tr>
                <td>COMPANY PASSWORD:</td>
                <td><input type="password" onChange={handleCUserPassText} value={cuserpass}/></td>
            </tr>
            <tr>
                <td>COMPANY NAME:</td>
                <td><input type="text" onChange={handleCompanyNameText} value={companyname}/></td>
            </tr>
            <tr><td>COMPANY STATE:</td>
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
    <tr><td>COMPANY CITY:</td>
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
            <tr>
                <td>COMPANY ADDRESS:</td>
                <td><textarea type="text" onChange={handleCAddressText} value={caddress}/></td>
            </tr>
            <tr>
                <td>COMPANY CONTACT:</td>
                <td><input type="number" onChange={handleCContactText} value={ccontact}/></td>
            </tr>
            <tr>
                <td>COMPANY EMAIL:</td>
                <td><input type="email" onChange={handleCEMailText} value={cemail}/></td>
            </tr>
            <tr>
                <td></td>
                 
                <td><button type="submit" onClick={handleRegisterButton}>EDIT_PROFILE</button></td>
            </tr>
        </table>
        </center>
    </div>
    );
}export default EditProfile;