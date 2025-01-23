import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import mainpic from "../Picture/homepic.jpg";
import {useHistory} from "react-router-dom";

function SupplyMainPage(){
    return(
        <div>
            <center>
                {/* <img src={mainpic} height={200} width={600} /> */}
                <h4 style={{backgroundColor:"black", color:"white",borderRadius: "150px"}}>Supplier Login & Register</h4>

               <table border={5}  cellPadding={10}><th> <nav>
                    <Link to="/login" style={{padding:"10px", color:"black"}} >LOGIN</Link><span></span>
                    <Link to="/register" style={{padding:"10px", color:"black"}}>REGISTER</Link><span></span>
                </nav></th></table>
                <Routes>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                </Routes>
            </center>
        </div>
    );
}export default SupplyMainPage;