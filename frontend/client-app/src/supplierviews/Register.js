import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import Login from './Login';

function Register(){
    const[suserid,setSUserId]=useState();
    const[suserpass,setSUserPass]=useState();
    const[sfullname,setSFullName]=useState();
    const[saddress,setSAddress]=useState();
    const[scontact,setSContact]=useState();
    const[semail,setSEMail]=useState();
    const[spicname,setSPicName]=useState();
    const[spcatgid,setSPCatgId]=useState();
    const[sranking,setSRanking]=useState();
    const[image,setImage]=useState({preview:'',data:''});
    const[status,setStatus]=useState();
    const[spcatglist,setSPCatgList]=useState([]);
    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);
    const[stid,setStId]=useState();
    const[ctid,setCtId]=useState();

    const handleSUserIdText=(evt)=>{setSUserId(evt.target.value);}
    const handleSUserPassText=(evt)=>{setSUserPass(evt.target.value);}
    const handleSFullNameText=(evt)=>{setSFullName(evt.target.value);}
    const handleSAddressText=(evt)=>{setSAddress(evt.target.value);}
    const handleSContactText=(evt)=>{setSContact(evt.target.value);}
    const handleSEMailText=(evt)=>{setSEMail(evt.target.value);}
    const handlePCatgSelect=(evt)=>{setSPCatgId(evt.target.value);}
    const handleSRanking=()=>{setSRanking(0);}

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
   
    const handleFileChange=async(evt)=>{
        evt.preventDefault();
        const img={preview:URL.createObjectURL(evt.target.files[0]),data:evt.target.files[0],}
        setImage(img);
        alert("Image Uploaded")
        setSPicName(evt.target.files[0].name);
    }

    const handleUploadImage=async()=>{
        var formData=new FormData()
        formData.append('file',image.data)
        const response = await fetch('http://localhost:9190/supplier/uploadsuserimage',{method:'POST', body:formData,});
       // alert(response.statusText);
    if(response){setStatus("File Upload==> " +response.statusText)}
    alert("Upload Supplier User image...");
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

      axios.get("http://localhost:9190/supplier/checkid/"+suserid).then((res)=>{
        //alert(res.data);
         if(res.data.suserid!=suserid){
        // if(res.data==false){
                     handleUploadImage();
                axios.post("http://localhost:9190/supplier/register",suserobj).then((res)=>{
                    alert(res.data);
                    }).catch((err)=>{
                    alert(err);
                    });
            const root = ReactDom.createRoot(document.getElementById("root"));
            root.render(<Login></Login>);
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
    <center>
        <h5 style={{backgroundColor:"black",color:"white"}}>REGISTRATION FORM OF SUPPLIER USER</h5>
    <table border={12} style={{backgroundColor:"black",color:"white"}}>
    <tr><th align="left" style={{color:"white"}}>SUPPLIER USER ID:</th>
        <td><input type="text" onChange={handleSUserIdText}/></td>
    </tr>
    <tr><th align="left">SUPPLIER PASSWORD:</th>
        <td><input type="password" onChange={handleSUserPassText}/></td>
    </tr>
    <tr><th align="left" >SUPPLIER FULLNAME:</th>
        <td><input type="text" onChange={handleSFullNameText}/></td>
    </tr>
    <tr><th align="left" >SUPPLIER STATE:</th>
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
    <tr><th align="left" >SUPPLIER CITY:</th>
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
    <tr><th align="left" >SUPPLIER ADDRESS:</th>
        <td><input type="text" onChange={handleSAddressText}/></td>
    </tr>
    <tr><th align="left" >SUPPLIER CONTACT:</th>
        <td><input type="number" onChange={handleSContactText}/></td>
    </tr>
    <tr><th align="left" >SUPPLIER EMAIL:</th>
        <td><input type="text" onChange={handleSEMailText}/></td>
    </tr>
    <tr><th align="left" >CATEGORY:</th>
        <td><select onClick={handlePCatgSelect}>
                {
                    spcatglist.map((item)=>(
                       <option value={item.pcatgid}>{item.pcatgname}</option>
                    ))
                }
            </select>
        </td>
    </tr>
    <tr><th align="left" >SUPPLIER RANKING:</th>
        <td><input type="number" onChange={handleSRanking}/></td>
    </tr>
    <tr>
        <th align="left" >PHOTO:</th>
            <td><img src={image.preview} height={100} width={100}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="file" name="file" onChange={handleFileChange}/>
            </td>
    </tr>
    <tr><td></td>
        <td><button type="submit" onClick={handleRegisterButton}>REGISTER</button></td>
    </tr>
</table>
</center>
</div>
);
}export default Register;
