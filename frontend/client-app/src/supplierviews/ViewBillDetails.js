import React,{useState,useEffect} from "react";
import axios from "axios";

function ViewBillDetails()
{
    const[billlist,setBillList]=useState([]);

    useEffect(()=>{
        // axios.post("http://localhost:9190/bill/billshow/").then((res)=>{
        //     setBillList(res.data);
        // }).catch((err)=>{
        //     alert(err);
        // })

    })


    return(
        <div>
            <center>
                <h5>Bill Details</h5>
                <table>
                    <tr>
                        <th>BillId</th>
                    </tr>
                    {
                    // billlist.map((item)=>{
                    //     <tr>
                    //         <td>{su}</td>
                    //     </tr>
                    // })

                }
                </table>
                

            </center>
        </div>
    )

}export default ViewBillDetails;