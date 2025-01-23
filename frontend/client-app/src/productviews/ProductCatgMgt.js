import React,{useState,useEffect} from "react";
import axios from  "axios";
function ProductCatgMgt()
{
    const[pcatgid,setPCatgId]=useState();
    const[pcatgname,setPCatgName]=useState();
    const[pcatglist,setPCatgList]=useState([]);

    const handlePCatgIdText=(evt)=>{
        setPCatgId(evt.target.value);
    }
    const handlePCatgName=(evt)=>{
        setPCatgName(evt.target.value);
    }
    const handlePCatgList=(evt)=>{
        setPCatgList(evt.target.value);
    }
    const handleSaveButton=()=>{
        var obj={
            pcatgid:pcatgid,
            pcatgname:pcatgname
        }
        axios.post("http://localhost:9190/productcatg/save",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleShowButton=()=>{
            axios.get('http://localhost:9190/productcatg/show').then((res)=>{
                setPCatgList(res.data);
                
            })
    }
    return(
        <div>
            <center>
                <div className="jubotron">
                    <table border={5}>
                        <tr >
                            <th>Product Catogry ID</th>
                            <td>
                                <input type="number" onChange={handlePCatgIdText}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Product Catogry Name</th>
                            <td>
                                <input type="text" onChange={handlePCatgName}/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <button type="submit"  onClick={handleSaveButton}>Save</button>
                            </td>
                              
                        </tr>
                    </table>
                    <h4 style={{backgroundColor:"black",color:"white"}}>Product List </h4>
                            <td>
                                <button type="submit" onClick={handleShowButton}>Show</button>
                            </td>
                    <table border={5}>
                        <tr>
                            <th style={{padding: "10px"}}>Product Id</th>
                            <th style={{padding: "10px"}}>Product Name</th>
                        </tr>
                        
                        {
                            
                            pcatglist.map((item)=>(
                                <tr>
                                   <td>{item.pcatgid}</td>
                                   <td>{item.pcatgname}</td>
                                </tr>
                            ))
                        }
                    </table>


                </div>
            </center>
        </div>
    )

}export default ProductCatgMgt;