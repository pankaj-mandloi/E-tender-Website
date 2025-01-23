import React,{useState,useEffect} from "react";
import axios from "axios";

function ProductMgt(){
    const[pid,setPId]=useState();
    const[pname,setPName]=useState();
    const[pdesc,setPDesc]=useState();
    const[pcatgid,setPCatgId]=useState();
    const[ppicname,setPpicName]=useState();
    const [image,setImage]=useState({preview:'',data:''});
    const [status,setStatus]=useState();
    const [pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);

    const handlePName=(evt)=>{setPName(evt.target.value);}
    const handlePDescText=(evt)=>{setPDesc(evt.target.value);}
    const handlePCatgSelect=(evt)=>{setPCatgId(evt.target.value);}

    const handleFileChange = async (evt) => {
        evt.preventDefault();
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0] // Set the data field to the file itself
        };
        setImage(img);
        setPpicName(evt.target.files[0].name);
    }
     
    const handleUploadImage = async () => {
        var formData = new FormData();
        formData.append('file', image.data); // Use image.data instead of image.preview
        const response = await fetch("http://localhost:9190/product/uploadproductimage", { method: 'POST', body: formData });
        if (response) {setStatus("status" + response.statusText);}
        alert("Upload Image");
    }
    
    const handleSaveButton=()=>{
        const obj={pid:pid,pname:pname,pdesc:pdesc,pcatgid:pcatgid,ppicname:ppicname}
        axios.post("http://localhost:9190/product/save",obj).then((res)=>{
            alert("data save in server....")
        })
    }

    
    //code to load product category in dropdown list
    useEffect(()=>{
        axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert("Product Catogary ERROR"+err);
        });

    });
    useEffect(()=>{
        axios.get("http://localhost:9190/product/show").then((res)=>{
            setPId(parseInt(res.data[res.data.length-1].pid)+1);
            setPList(res.data);
        }).catch((err)=>{
            alert("Product Related ERROR"+err);
        })
    },[])
    return(
        <div>
            <center>
                <h4 style={{backgroundColor:"black",color:"white"}} >Product Details Form</h4>
                <table border={5}>
                <tr>
                    <td>Product ID</td>
                    <td>
                         {pid}
                    </td>
                </tr>
                <tr>
                    <td>Product Name</td>
                    <td>
                        <input type="text" onChange={handlePName}/>
                    </td>
                </tr>
                <tr>
                    <td>Product Description</td>
                    <td>
                        <input type="text" onChange={handlePDescText}/>
                    </td>
                </tr>
                <tr>
                    <td>Product Category ID</td>
                    <td>
                       <select onClick={handlePCatgSelect}>
                            {
                                pcatglist.map((item)=>(
                                    <option value={item.pcatgid}>{item.pcatgname}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Product PIC Name</td>
                    <td>
                       <img src={image.preview} height={100} width={100}></img>
                         <input type="file" name="file"  onChange={handleFileChange}></input>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>{status && <h4>{status}</h4>}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" onClick={()=>{handleUploadImage();handleSaveButton();}}>Save</button>
                    </td>
                </tr>
                </table>
                <h4 style={{backgroundColor:"black",color:"white"}}>Product List</h4>
                <table border={5}>
                    <tr>
                            <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>Product Id</th>
                            <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>Product Name</th>
                            <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>Product Distription</th>
                            <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>Product Category ID</th>
                            <th style={{backgroundColor:"black",padding:"10px",color:"white"}}>Product PIC Name</th>
                    </tr>
                
                {
                    plist.map((item)=>(
                        <tr>
                            <td align="center">{item.pid}</td>
                            <td align="center">{item.pname}</td>
                            <td align="center">{item.pdesc}</td>
                            <td align="center">{item.pcatgid}</td>
                            <td align="center">{item.ppicname}</td>
                        </tr>


                    ))
                }
                </table>

                
            </center>
        </div>
    )

}export default ProductMgt;