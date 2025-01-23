import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CLogin from './CLogin';
import CRegister from './CRegister';
import mainpic from "../Picture/homepic.jpg";
import {useHistory} from "react-router-dom";

function CompanyMainPage(){
    return(
        <div>
            <center>
                {/* <img src={mainpic} height={200} width={600} /> */}
                <h4 style={{backgroundColor:"black", color:"white",borderRadius: "100px"}}>Company Login & Register</h4>
               <table border={5} cellPadding={10}><th> <nav>
                    <Link to="/clogin" style={{padding:"10px", color:"black"}}>LOGIN</Link><span></span>
                    <Link to="/cregister" style={{padding:"10px", color:"black"}}>REGISTER</Link><span></span>
                </nav></th></table>
                <Routes>
                    <Route path="/clogin" element={<CLogin></CLogin>}></Route>
                    <Route path="/cregister" element={<CRegister></CRegister>}></Route>
                </Routes>
            </center>
        </div>
    );
}export default CompanyMainPage;