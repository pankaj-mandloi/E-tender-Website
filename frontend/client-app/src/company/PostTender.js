import React, {useState, useEffect} from "react";
import axios from "axios";
function PostTender(props){
    const[tenderid,setTenderId]=useState();
    const[tenderbyid,setTenderById]=useState(props.data.cuserid);
    const[tendersdate,setTenderSDate]=useState();
    const[tenderedate,setTenderEDate]=useState();
    const[pcatgid,setPCatgId]=useState();
    const[pid,setPId]=useState();
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    

    const handleTenderIdText=(evt)=>{setTenderId(evt.target.value);}
    const handleTenderByIdText=(evt)=>{setTenderById(evt.target.value);}
    const handleTenderSDateText=(evt)=>{setTenderSDate(evt.target.value);}
    const handleTenderEDateText=(evt)=>{setTenderEDate(evt.target.value);}

    const handlePCatgSelect=(evt)=>{
        setPCatgId(evt.target.value);
        axios.get("http://localhost:9190/product/show").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert("Product related error=>"+err);
        });
    }

    const handlePIdSelect=(evt)=>{setPId(evt.target.value);}

    useEffect(()=>{
        axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert("Product Category related error=>"+err);
        });
    },[]);

    const handleSaveButton=()=>{
        var tobj={ tenderid:tenderid,
                   tenderbyid:tenderbyid, 
                   tendersdate:tendersdate,
                   tenderedate:tenderedate,
                   pcatgid:pcatgid, 
                   pid:pid};

        axios.post("http://localhost:9190/tender/save",tobj).then((res)=>{
                    alert("Tender saved!!");
                    }).catch((err)=>{
                    alert(err);
                    }); 
                }
return(
<div >
<center>
    <h5 style={{backgroundColor:"black",color:"white"}}>TENDER DETAILS</h5>
<table border={10} style={{backgroundColor:"black", color:"white"}}>
    <tr><th >TENDER ID:</th>
    <td><input type="number" onChange={handleTenderIdText}/></td>
    </tr>
    <tr><th  >COMPANY/TENDER_BY ID:</th>
    <td><input type="text" onChange={handleTenderByIdText}  value={tenderbyid}/></td>
    </tr>
    <tr><th >TENDER START DATE:</th>
        <td><input type="date" onChange={handleTenderSDateText}/></td>
    </tr>
    <tr><th >TENDER END DATE:</th>
        <td><input type="date"  onChange={handleTenderEDateText}/></td>
    </tr>
    <tr><th >PRODUCT CATEGORY:</th>
        <td><select onClick={handlePCatgSelect}>
                {
                    pcatglist.map((item)=>(
                       <option value={item.pcatgid}>{item.pcatgname}</option>
                    ))
                }
            </select>
        </td>
    </tr>
    <tr><th >PRODUCT NAME:</th>
        <td><select onClick={handlePIdSelect}>
                {
                    plist.map((item)=>(
                       <option value={item.pid}>{item.pname}</option>
                    ))
                }
            </select>
        </td>
    </tr>
    <tr><td></td>
        <td ><button type="submit" onClick={handleSaveButton}>POST</button></td>
    </tr>
</table>
</center>
</div>
);
}export default PostTender;
