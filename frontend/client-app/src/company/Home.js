import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDom from "react-dom/client";
import EditProfile from "./EditProfile";
import PostTender from './PostTender';
import CompanyHome from "../Picture/CompanyHome.jpg";
import ViewTenders from "./ViewTenders";
import CLogin from "../company/CLogin";
import {useHistory} from "react-router-dom";


function Home(props){

    const[stlist,setStList]=useState([]);
    const[ctlist,setCtList]=useState([]);
    const [showDetails, setShowDetails] = useState(false);
    var stname=" ";
    var ctname=" ";

useEffect(()=>{
        axios.get("http://localhost:9190/state/show").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert("state related error=>"+err);
        });
},[]);

useEffect(()=>{
    axios.get("http://localhost:9190/city/show").then((res)=>{
        setCtList(res.data);
    }).catch((err)=>{
        alert("state related error=>"+err);
    });
},[]);
    const handleEditCompanyProfile=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<EditProfile data={data}></EditProfile>)
    }

    const handlePostTender=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<PostTender data={data}></PostTender>)
    }
    const handleViewTender=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<ViewTenders data={data}></ViewTenders>)
        
        
    }
    const handleTenderList=()=>{
        
    }
    const handlePostQuatation=()=>{

    }
    const handleViewQuatation=()=>{

    }
    const handleProfileButton=()=>{
        setShowDetails(!showDetails);

    }
    const handleLogoutButton=()=>{
        const root=ReactDom.createRoot(document.getElementById("root"));
        root.render(<CLogin></CLogin>)

    }

    return(
        
        <div >
            <div style={{ position: "absolute", top: "10px", right: "10px"}}>
                <img 
                    src="https://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png" 
                    height={50} 
                    width={50} 
                    alt="Profile Logo"/>
                <br />
                <tr>
                    <td >
                        <button type="submit" onClick={handleProfileButton} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>Profile</button>
                         
                        <button type="submit" onClick={handleLogoutButton} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}} >LogOut</button>
                        
                    </td>
                </tr>
                {
                   showDetails && (
                    <div style={{ 
                        position: "absolute", 
                        right: "0", 
                        backgroundColor: "black", 
                        color: "white",  
                         }}>

                     <table border={4}>
                        <h5>Company login: {props.data.cuserid}</h5>
                        <h5>Company name: {props.data.companyname}</h5>
                        <h5>Company address: {props.data.caddress}</h5>
                        <h5>Company contact no: {props.data.ccontact}</h5>
                        <h5>Company email: {props.data.cemail}</h5>
                     </table>    
                    </div>
                )
                }     
            </div>

        
        <center> 
            <img src={CompanyHome} height={200} width={900} border={10}  />  
           
        <h5 style={{backgroundColor:"black", color:"white",borderRadius: "100px"}}>COMPANY DETAILS</h5>
        <table border={10} style={{backgroundColor:"black",color:"white"}}>
        <p><h5>COMPANY ID :  {props.data.cuserid}</h5></p>
            <p><h5>WELCOME : {props.data.companyname}</h5></p>
            {
                  stlist.map((sitem)=>{
                    if(sitem.stid==props.data.stid){
                        stname=sitem.stname;
                    }
                  })
                }
            <p><h5>COMPANY STATE : {stname}</h5></p>
            {
                  ctlist.map((citem)=>{
                    if(citem.ctid==props.data.ctid){
                        ctname=citem.ctname;
                    }
                  })
                }
            <p><h5>COMPANY CITY : {ctname}</h5></p>
            <p><h5>COMPANY ADDRESS : {props.data.caddress}</h5></p>
            <p><h5>COMPANY CONTACT NO. : {props.data.ccontact}</h5></p>
            <p><h5>COMPANY EMAIL ID :  {props.data.cemail}</h5></p>
            </table> 
            <br></br>
            <br></br>
          
            <button onClick={handleEditCompanyProfile}  
            style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>EDIT_PROFILE</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handlePostTender} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>POST_TENDER</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewTender} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>VIEW_TENDER</button>&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <button onClick={handleTenderList} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>VIEW_TENDER_LIST</button>&nbsp;&nbsp;&nbsp;&nbsp; */}
            <button onClick={handlePostQuatation} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>POST_QUATATION</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewQuatation} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}>VIEW_QUATATION</button>&nbsp;&nbsp;&nbsp;&nbsp;
            
            </center>
            

            
        </div>
        
        );
}export default Home;