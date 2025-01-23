import React, {useState,useEffect} from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import Login from "./Login";
//import EditProfilePic from "../Picture/homepic.jpg";

function EditProfile(props){

    const[suserid, setSUserId]= useState(props.data.suserid);
    const[suserpass, setSUserPass]= useState(props.data.suserpass);
    const[sfullname, setSFullName]= useState(props.data.sfullname);
    const[saddress,setSAddress]=useState(props.data.saddress);
    const[scontact,setSContact]=useState(props.data.scontact);
    const[semail,setSEMail]=useState(props.data.semail);
    const[spcatgid,setSPCatgId]=useState(props.data.spcatgid);
    const[sranking,setSRanking]=useState(props.data.sranking);
    const[spicname, setSPicName]= useState(props.data.spicname);
    const[image, setImage]= useState({preview:'',data:''});
    const[status, setStatus]= useState();
    const[soldpicname,setSOldPicName]=useState(props.data.spicname);
    const[spcatglist,setSPCatgList]=useState([]);
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);
    const[stid,setStId]=useState(props.data.stid);
    const[ctid,setCtId]=useState(props.data.ctid);
    var pcatgname="";

    const handleSUserIdText=(evt)=>{setSUserId(evt.target.value); }
    const handleSUserPassText=(evt)=>{setSUserPass(evt.target.value);}
    const handleSFullNameText=(evt)=>{setSFullName(evt.target.value);}
    const handleStIdText=(evt)=>{setStId(evt.target.value);}
    const handleCtIdText=(evt)=>{setCtId(evt.target.value);}
    const handleSAddressText=(evt)=>{setSAddress(evt.target.value);}
    const handleSContactText=(evt)=>{setSContact(evt.target.value);}
    const handleSEMailText=(evt)=>{setSEMail(evt.target.value);}
    const handlePCatgSelect=(evt)=>{setSPCatgId(evt.target.value);}
    const handleSRanking=(evt)=>{setSRanking(evt.target.value);}

    useEffect(()=>{
        axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setSPCatgList(res.data);
        }).catch((err)=>{
            alert("Product Category related error=>"+err);
        });

    });

    useEffect(()=>{
            axios.get("http://localhost:9190/state/show").then((res)=>{
                setStList(res.data);
            }).catch((err)=>{
                alert("state related error=>"+err);
            });
    },[]);
    
    const handleFileChange = async(evt)=>{
        evt.preventDefault();
        const img={preview:URL.createObjectURL(evt.target.files[0]),data:evt.target.files[0]}
        //alert(img);
        setImage(img);
       alert("Image Uploaded")
       setSPicName(evt.target.files[0].name);
    }

    const handleUploadImage = async()=>{
        var formData=new FormData()
        formData.append('file',image.data)
        const response = await fetch('http://localhost:9190/supplier/updatesuserimage/'+soldpicname,{method:'POST', body:formData});
    if(response){setStatus("status:- " + response.statusText)}
    alert("Upload New image...");
    }

    const handleRegisterButton=()=>{
        var suserobj={
            suserid:suserid,
            suserpass:suserpass,
            sfullname:sfullname,
            stid:stid,
            ctid:ctid,
            saddress:saddress,
            scontact:scontact,
            semail:semail,
            spicname:spicname,
            spcatgid:spcatgid,
            sranking:sranking
        };

        axios.put("http://localhost:9190/supplier/editprofile/",suserobj).then((res)=>{
        alert(res.data);
        }).catch((err)=>{
        alert(err);
        })

        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<Login></Login>);
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
        <div><center>
        <h5 style={{backgroundColor:"black",color:"white"}}>EDIT USER PROFILE</h5>
        <table style={{backgroundColor:"black",color:"white"}}>
            <tr>
                <td>SUPPLIER USER_ID:</td>
                <td><input type="text" readOnly onChange={handleSUserIdText} value={suserid}/></td>
            </tr>
            <tr>
                <td>SUPPLIER PASSWORD:</td>
                <td><input type="password" onChange={handleSUserPassText} value={suserpass}/></td>
            </tr>
            <tr>
                <td>SUPPLIER FULL_NAME:</td>
                <td><input type="text" onChange={handleSFullNameText} value={sfullname}/></td>
            </tr>
            <tr><td>SUPPLIER STATE:</td>
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
    <tr><td>SUPPLIER CITY:</td>
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
                <td>SUPPLIER ADDRESS:</td>
                <td><input type="text" onChange={handleSAddressText} value={saddress}/></td>
            </tr>
            <tr>
                <td>SUPPLIER CONTACT:</td>
                <td><input type="text" onChange={handleSContactText} value={scontact}/></td>
            </tr>
            <tr>
                <td>SUPPLIER EMAIL:</td>
                <td><input type="text" onChange={handleSEMailText} value={semail}/></td>
            </tr>
            <tr>
                <td>SUPPLIER CATEGORY:</td>
                <td><select onClick={handlePCatgSelect}>
                {
                    spcatglist.map((item)=>(
                       <option value={item.pcatgid}>{item.pcatgname}</option>
                    ))
                }
            </select>
        </td>
            </tr>
            <tr>
                <td>SUPPLIER RANKING:</td>
                <td><input type="number" onChange={handleSRanking} value={sranking}/></td>
            </tr>
            <tr>
                <td>PHOTO:</td>
                <td><img src={"http://localhost:9190/supplier/getsuserimage/"+soldpicname} height={100} width={100} /></td>
            </tr>
            <tr>
                <td>NEW PHOTO:</td>
                <td><img src={image.preview}  height={100} width={100}/>&nbsp;&nbsp;
                <input type="file" name="file" onChange={handleFileChange}/></td>
            </tr>
            <tr><td></td>
<td><button type="submit" onClick={()=>{handleUploadImage();handleRegisterButton();}}>EDIT_PROFILE</button></td>
            </tr>
        </table>
        </center></div>
    );
}export default EditProfile;