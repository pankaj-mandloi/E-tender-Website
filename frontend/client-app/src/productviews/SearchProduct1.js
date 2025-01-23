import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchProduct1(props){
    const [pcatgid,setPCatgId]=useState(props.data.spcatgid);
    const [productlist, setProductList] = useState([]);
    const [productcatglist, setProductCatgList] = useState([]);
    var catgname=" ";
    
    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value);
    }

useEffect(()=>{
        axios.get("http://localhost:9190/product/supplierproductsearch"+pcatgid).then((res)=>{  
            setProductList(res.data);
            }).catch((err)=>{
                alert("hello"+err);
            });
        axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setProductCatgList(res.data);
            }).catch((err)=>{
            alert("Product Category related error=>"+err);
            });
    },[])
return(
<div>
    <center>
    <h5 style={{ backgroundColor: "green", color: "white" }}>SHOW PRODUCT LIST BY CATEGORY FOR SUPPLIER</h5>
    <p align="left" style={{ backgroundColor: "pink", color: "black" }}>
        <h5>HELLO {props.data.sfullname}, PLEASE CHECK AND SUBMIT TENDER AS SOON AS POSSIBLE...</h5></p>
            <hr/>
        <table border={10} style={{backgroundColor:"tan"}}>
            <tr>
              <th style={{ backgroundColor: "red", color: "white" }}>PRODUCT ID</th>
              <th style={{ backgroundColor: "red", color: "white" }}>PRODUCT NAME</th>
              <th style={{ backgroundColor: "red", color: "white" }}>DESCRIPTION</th>
              <th style={{ backgroundColor: "red", color: "white" }}>CATEGORY NAME</th>
              <th style={{ backgroundColor: "red", color: "white" }}>PRODUCT PHOTO</th>
            </tr>
          {
          productlist.map((item)=>(
              <tr>
                <td style={{ textAlign:"center", color: "black" }}>{item.pid}</td>
                <td style={{ textAlign:"center", color: "black" }}>{item.pname}</td>
                <td style={{ textAlign:"center", color: "black" }}>{item.pdesc}</td>
                {
                  productcatglist.map((pcatgitem)=>{
                    if(pcatgitem.pcatgid==item.pcatgid){
                        catgname=pcatgitem.pcatgname;
                    }
                  })
                }
                <td style={{ textAlign:"center", color: "black" }}>{catgname}</td>
                <td style={{ textAlign:"center", color: "black" }}><img src={"http://localhost:9190/product/getimage/"+item.ppicname} height={50} width={100}/></td> 
              </tr>
            ))}
        </table>
    </center>
</div>
    );
}export default SearchProduct1;