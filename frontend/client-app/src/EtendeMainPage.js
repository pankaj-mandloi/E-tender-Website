import React, {useState} from "react";
import axios from "axios";


import CompanyMainPage from "./company/CompanyMainPage";
import SupplyMainPage from "./supplierviews/SupplyMainPage";
import {Link,Route,Routes} from "react-router-dom";
import EtendePic from "./Picture/EtenderPic.png";
import Logo from "./Picture/Logo.png";
import pic1 from "./Picture/pic1.jpeg";
import pic2 from "./Picture/pic2.webp"
import Arrow from "./Picture/Arrow.jpg";
import CLogin from "./company/CLogin";
import CRegister from "./company/CRegister";
import Login from "./supplierviews/Login";
import Register from "./supplierviews/Register";
import {useHistory} from "react-router-dom";

function EtendeMainPage()
{
   
    

    return(
        <div >

            <div   style={{ backgroundColor:"black", top: "10px", left: "10px" }}>
                <marquee  behavior="alternate" scrollamount="10">
                  <img src={Logo} height={50} width={80} style={{ border: "3px dotted", borderRadius: "20px"}}></img>
                </marquee>
                
            </div>
  <center>
  <header style={{backgroundColor:"lightgreen"}}>
       <div>
                <br/>
                <marquee  scrollamount="20" >
                    
                    <img src={EtendePic} height={200} width={1000} style={{ borderRadius: "15px" }}></img>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={pic1} height={200} width={1000} style={{ borderRadius: "15px" }}></img>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                   <img src={pic2} height={200} width={1000} style={{ borderRadius: "15px" }}></img>
                </marquee>
                </div>

                <div>
                    <br/>
                <nav>
                    <table border={10}>
                    <th>
                        <Link to="/companymainpage" style={{padding:"5px", color:"black"}}>Company</Link>
                        <Link to="/supplymainpage" style={{padding:"5px", color:"black"}}>Supplier</Link>
                    </th>
                    </table>
                </nav>
                    <Routes>
                        <Route path="/companymainpage" element={<CompanyMainPage></CompanyMainPage>}></Route>
                        <Route path="/supplymainpage" element={<SupplyMainPage></SupplyMainPage>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/clogin" element={<CLogin></CLogin>}></Route>
                        <Route path="/cregister" element={<CRegister></CRegister>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/login" element={<Login></Login>}></Route>
                        <Route path="/register" element={<Register></Register>}></Route>
                    </Routes>
                
                </div> 
 </header>
<footer style={{backgroundColor:"pink"}}>
    <div >
        <div >
            {/* <img src="footer-logo.png" alt="Footer Logo"> */}
        </div>
        <div >
            <h4>Quick Links</h4>
              <tr>
                   <td style={{padding:"10px"}}><li><a href="/about">About Us</a></li></td> 
                   <td style={{padding:"10px"}}> <li><a href="/services">Our Services</a></li></td>
                   <td style={{padding:"10px"}}><li><a href="/contact">Contact Us</a></li></td>
                   <td style={{padding:"10px"}}><li><a href="/contact">Contact Us</a></li></td>
                   <td style={{padding:"10px"}}><li><a href="/faq">FAQ</a></li></td> 
                </tr>
            
        </div>
        <div >
            <h4>Contact Us</h4>
            <p>Ganesh Nagar Khandwa naka Indore</p>
            <p>Email: mandloipankaj@example.com</p>
            <p>Phone: +123 456 7890</p>
        </div>
    </div>
    <div>
        <h4>About eTender</h4>
        <p>eTender is your premier platform for managing and participating in tenders online. Find the latest opportunities, submit bids, and manage your contracts seamlessly.</p>
        <marquee behavior="alternate">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        </marquee>
    </div>
</footer>
 </center>
</div>
    )

}export default EtendeMainPage;