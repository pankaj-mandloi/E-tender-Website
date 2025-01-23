import React, { useState } from "react";
import ReactDom from "react-dom/client";
import EditProfile from "./EditProfile";
import SearchProduct1 from '../productviews/SearchProduct1';
import SearchProductAddBy from '../productviews/SearchProductAddBy';
import ProductMgt from "../productviews/ProductMgt";
import SupplierHome from "../Picture/SupplierHome.png";
import ViewTender from "../supplierviews/ViewTender";
import PostQuotation from "./PostQuotation";
import ReviewQuotation from "./ReviewQuotation";
import Login from "../supplierviews/Login";
import ViewBillDetails from "./ViewBillDetails";
import {useHistory} from "react-router-dom";



function Home(props){



         const[showDetails,setShowDetails]=useState(false);

    const handleEditSupplierProfile=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<EditProfile data={data}></EditProfile>)
    }
    const handleAddProduct=()=>{
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<ProductMgt data={props.data.suserid}></ProductMgt>)
    }
    const handleViewProduct=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<SearchProduct1 data={data}></SearchProduct1>)
    }
    const handleViewProductAddBy=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<SearchProductAddBy data={data}></SearchProductAddBy>)
    }

    const handleViewTender=()=>{
       var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<ViewTender data={data}></ViewTender>)
    
    }
    const handleTenderList=()=>{
    }
    const handlePostQuatation=()=>{
       

    }
    const handleReviewQuatation=()=>{
        var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<ReviewQuotation data={data}></ReviewQuotation>)
       
    }
    const handleViewBill=()=>{
       // var data=props.data;
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<ViewBillDetails data={props.data.suserid}></ViewBillDetails>)

    }
    const handleProfileButton=()=>{
        setShowDetails(!showDetails);


    }
    const handleLogoutButton=()=>{
        const root=ReactDom.createRoot(document.getElementById("root"));
        root.render(<Login></Login>);


    }
    return(
        <div>
            
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
                     <h5>Supplier login : {props.data.suserid}</h5>
                        <h5>Supplier name : {props.data.sfullname}</h5>
                        <h5>Supplier address : {props.data.sfullname}</h5>
                        <h5>Supplier contact no : {props.data.scontact}</h5>
                        <h5>Supplier email : {props.data.semail}</h5>
                     </table>
                     </div>
                )
                }  
              </div>   
  
            <center > <img src={SupplierHome} border={5} height={300} width={1000} />
            <p>WELCOME : <b>{props.data.sfullname}</b></p>
            <img src={"http://localhost:9190/supplier/getsuserimage/"+props.data.spicname} height={200} width={200} />
            <br></br>
            <br></br>
            <button onClick={handleEditSupplierProfile} >EDIT_PROFILE</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleAddProduct}>ADD_PRODUCT</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewProduct}>VIEW_PRODUCT</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewProductAddBy}>VIEW_PRODUCT_ADD_BY</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewTender}>VIEW_TENDER</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleTenderList}>VIEW_TENDER_LIST</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handlePostQuatation}>POST_QUATATION</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleReviewQuatation}>REVIEW_QUATATION</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleViewBill} style={{backgroundColor:"black",color:"white", borderRadius: "5px"}}
             >VIEW_BILL</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </center>
        </div>
        );
}export default Home;