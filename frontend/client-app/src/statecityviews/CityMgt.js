import React,{useState,useEffect} from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

function CityMgt()
{
    const[ctid,setCtId]=useState();
    const[ctname,setCityName]=useState();
    const[stid,setStId]=useState();
    //const[stname,setStName]=useState();
    const[ctlist,setCtList]=useState([]);
    const[stlist,setStList]=useState([]);
    var stname=" ";

    useEffect(()=>{
        axios.get("http://localhost:9190/state/show").then((res)=>{
            setStList(res.data);
        }) 
            axios.get("http://localhost:9190/city/show").then((res)=>{
                setCtList(res.data);   
        })
})

const handleCtNameText=(evt)=>{
    setCityName(evt.target.value);
}
const handleStIdSelect=(evt)=>{
    setStId(evt.target.value);
}

const handleCtIdText=(evt)=>{
    setCtId(evt.target.value);
}
const handleSaveButton=()=>{
    var obj={
        ctid:ctid,
        ctname:ctname,
        stid:stid
       
    }
    axios.post("http://localhost:9190/city/save",obj).then((res)=>{
        alert(res.data);
    }).catch((err)=>{
        alert(err);
    })
}
return(
    <div >                     
        <center>
            <h4 style={{backgroundColor:"black",color:"white"}}>City Entry Form</h4>
            <table border="5">
                <tr>
                    <td>City Id</td>
                    <td>
                        <input type="number" onChange={handleCtIdText}/>
                    </td>
                </tr>
                <tr>
                    <td>City Name</td>
                    <td>
                        <input type="text" onChange={handleCtNameText}/>
                    </td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>
                        <select onClick={handleStIdSelect}>
                            {
                                stlist.map((item)=>(
                                    <option value={item.stid}>{item.stname}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
                <tr align="center">
                       <td></td>
                    <td>
                        <button type="submit"  style={{backgroundColor:"lightblue"}} onClick={handleSaveButton}>Save</button>
                    </td>
                    
                </tr>
                <td></td>
            </table>
            <h4 style={{backgroundColor:"black",color:"white"}}>CITY LIST</h4>
                <table border="5">
                    <tr>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>CITY ID</th>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>CITY NAME</th>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>STATE ID</th>
                        <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>STATE NAME</th>
                    </tr>
                    {
                        ctlist.map((citem)=>(
                            <tr>
                                <td align="center">{citem.ctid}</td>
                                <td align="center">{citem.ctname}</td>
                                <td align="center">{citem.stid}</td>
                                {
                                    stlist.map((sitem)=>{
                                        if(citem.stid==sitem.stid)
                                            {
                                                 stname=sitem.stname;
                                            }
                                        }
                                    )

                                }
                                <td align="center">{stname}</td>
                              </tr>
                        ))
                    
                    }  
                </table>
                
        </center>
    </div>
)
}export default CityMgt;