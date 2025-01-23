import React ,{useState,useEffect} from "react";
import axios from "axios";

function StateMgt()
{
    const[stid,setStId]=useState();
    const[stname,setStName]=useState();
    const[stlist,setStList]=useState([]);

    const handleStIdText=(evt)=>{
        setStId(evt.target.value);
    }
    const handleStName=(evt)=>{
        setStName(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9190/state/show").then((res)=>{
            setStId(parseInt(res.data[res.data.length-1].stid)+1);
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    })
    const handleSaveButton=()=>{
        var obj={
            stid:stid,
            stname:stname
        }
        axios.post("http://localhost:9190/state/save",obj).then((res)=>{
            alert("State Saved");
        }).catch((err)=>{
            alert(err);
        })
    }
    return(
        <div>
            <center style={{backgroundColor:"lightblue"}}>
                <h4 style={{backgroundColor:"black",color:"white"}}>State Entery Form</h4>
                <table border="5">
                    <tr>
                        <td>State Id</td>
                        <td>{stid}</td>
                    </tr>
                    <tr>
                        <td>State Name</td>
                        <td>
                            <input type="text" onChange={handleStName}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td align="center" >
                            <button type="submit" onClick={handleSaveButton}>Save</button>
                        </td>
                    </tr>
                </table>
                <h4 style={{backgroundColor:"black",color:"white"}}>STATE LIST</h4>
                <table border="5">
                    <tr>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>STATE ID</th>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>STATE NAME</th>
                    </tr>
                    {
                        stlist.map((item)=>(
                            <tr>
                                <td align="center">{item.stid}</td>
                                <td align="center">{item.stname}</td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )

}export default StateMgt;