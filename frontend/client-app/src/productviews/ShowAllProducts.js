import React, {useState,useEffect} from "react";
import axios from "axios";

function ShowAllProducts()
{
    const[plist,setPList]=useState([]);
    const[pcatglist,setPCatgList]=useState([]);
    var catgname=" ";

    useEffect(()=>{
        axios.get("http://localhost:9190/product/show").then((res)=>{
            setPList(res.data);
        }).catch(err=>{
            alert(err);
        })

        axios.get("http://localhost:9190/productcatg/show").then((res)=>{
            setPCatgList(res.data);
        }).catch(err=>{
            alert(err);
        })

    })

    return(
        <div >
            <center>
            <div className="jumbotron">
                <table border={1}>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Photo</th>
                </tr>
                {
                    plist.map((item)=>(
                        <tr>
                            <td>{item.pid}</td>
                            <td>{item.pname}</td>
                            <td>{item.pdesc}</td>
                            
                            {
                                pcatglist.map((pcatitem)=>{
                                    if(pcatitem.pcatgit==item.pcatgit)
                                        {
                                            catgname=pcatitem.pcatgname
                                        }
                             })
                            }
                            <td>{catgname}</td>
                            <td>
                                <img src={"http://localhost:9190/product/getimage/"+item.ppicname} height={50} width={50}></img>
                            </td>




                        </tr>

                    ))
                }


                </table>
                </div>
            </center>
        </div>
    )

}export default ShowAllProducts;