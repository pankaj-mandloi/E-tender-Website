import React, {useState, useEffect} from "react";
import axios from "axios";
import PostQuotation from "./PostQuotation";
import ReactDom from "react-dom/client";
function ViewTender(props){

    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    const[tlist,setTList]=useState([]);
    var catgname="";
    var pname="";

 useEffect(()=>{
    axios.get("http://localhost:9190/tender/showtenderbycatgid/"+props.data.spcatgid).then((res)=>{
        setTList(res.data);
    }).catch((err)=>{
        alert("Tender related error=>"+err);
    });

    axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert("Product Category related error=>"+err);
        });

    axios.get("http://localhost:9190/product/show").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert("Product related error=>"+err);
        });
    },[]);
 
    const handleAcceptButton=(tenderid)=>{
        var obj = {
            suserid:props.data.suserid,
            tid:tenderid

        } 
        const root = ReactDom.createRoot(document.getElementById("root"));
        root.render(<PostQuotation data={obj}></PostQuotation>)
        
    }

return(
<div >
    <center>
<h5 style={{backgroundColor:"black",color:"white"}}>TENDER DETAILS</h5>
    <table border={10} style={{backgroundColor:"black",color:"white"}}>
        <tr style={{textAlign:"center", backgroundColor: "black", color: "white" }}>
            <th>TENDER ID</th>
            <th>TENDER_BY ID</th>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>CATEGORY</th>
            <th>PRODUCT</th>
            <th>ACTION</th>
        </tr>
        {
            tlist.map((titem)=>(
                <tr>
                    <td align="center">{titem.tenderid}</td>
                    <td align="center">{titem.tenderbyid}</td>
                    <td align="center">{titem.tendersdate}</td>
                    <td align="center">{titem.tenderedate}</td>
                    {
                  pcatglist.map((pcatgitem)=>{
                    if(pcatgitem.pcatgid==titem.pcatgid){
                        catgname=pcatgitem.pcatgname;
                    }
                  })
                }
                <td align="center">{catgname}</td>
                {
                  plist.map((pitem)=>{
                    if(pitem.pid==titem.pid){
                        pname=pitem.pname;
                    }
                  })
                }
                <td align="center">{pname}</td>
               <td>
                <button type="submit" onClick={()=>handleAcceptButton(titem.tenderid)}>POST</button>
               </td>
                </tr>
            ))
        }
    </table>
</center>
</div>
);
}export default ViewTender;
