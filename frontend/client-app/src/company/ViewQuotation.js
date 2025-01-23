import React,{useState,useEffect} from "react";
import Bill from "./Bill";
import ReactDOM from "react-dom/client";
import axios from "axios";


function ViewQuotation(props)
{
   const[qlist,setQList]=useState([]);

   useEffect(()=>{
   // alert(props.data.tid);
    axios.get("http://localhost:9190/quotation/showquotbytid/"+props.data.tid).then((res)=>{
        setQList(res.data);

    }).catch((err)=>{
        alert("Quotation Related Error"+err);
    })
   },[]);

   const handleAcceptButton=(qid)=>{
    var qstatus="Accepted by "+props.data.tenderbyid;
    var qstate="Processed";
    axios.put("http://localhost:9190/quotation/update/"+qid+"/"+qstatus+"/"+qstate).then((res)=>{
        alert(res.data);
    }).catch((err)=>{
        alert(err);
    })
   }

   const handleRejectButton=(qid)=>{
    var qstatus="Rejected by "+props.data.tenderbyid;
    var qstate="Cancel";
    axios.put("http://localhost:9190/quotation/update/"+qid+"/"+qstatus+"/"+qstate).then((res)=>{
        alert(res.data);
    }).catch((err)=>{
        alert(err);
    })

   }
   

   const handlePaymentButton=(qitem)=>{
     const root =ReactDOM.createRoot(document.getElementById("root"));
     root.render(<Bill data={qitem}></Bill>)


   }



   return(
    <div>
        <center>
            <h4 style={{backgroundColor:"black",color:"white"}}>Quotation Details</h4>
            <table border={5} style={{backgroundColor:"black",color:"white"}}>
                <tr >
                    <th>Quotation Id</th>
                    <th>Tender Id</th>
                    <th>Tender by Company</th>
                    <th>Quotation By Supplier Id</th>
                    <th>Quotation Submit Date</th>
                    <th>Quotation Amount</th>
                    <th>Status</th>
                    <th>State</th>
                    <th>Action</th>
                    <th>Gatway</th>
                    
                </tr>
                {
                    qlist.map((qitem)=>(
                        <tr align="center">
                            <td>{qitem.qid}</td>
                            <td>{qitem.tid}</td>
                            <td>{props.data.tenderbyid}</td>
                            <td>{qitem.qbyid}</td>
                            <td>{qitem.qsubdate}</td>
                            <td>{qitem.qamount}</td>
                            <td>{qitem.qstatus}</td>
                            <td>{qitem.qstate}</td>
                            <td>
                            {
                                    qitem.qstatus=="IN PROGRESS"?
                                    (<p>
                                        <button type="submit" onClick={()=>handleAcceptButton(qitem.qid)}>Accept</button>
                                        <button type="submit" onClick={()=>handleRejectButton(qitem.qid)}>Reject</button>
                                    </p>):(<label></label>)
                                    
                                    
                            }
                            </td>
                            <td>
                                {
                                    qitem.qstate=="Processed"?(<button type="submit" onClick={()=>handlePaymentButton(qitem)}>Payment</button>):(<label></label>)
                                }
                            </td>
                            
                            
                        </tr>
                    ))

                    
                }

            </table>
        </center>
    </div>


   )

}export default ViewQuotation;