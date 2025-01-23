import React,{useState,useEffect} from "react";
import axios from "axios";


function ReviewQuotation(props)
{
   const[qlist,setQList]=useState([]);

   useEffect(()=>{
   // alert(props.data.tid);
    axios.get("http://localhost:9190/quotation/showquotbysuserid/"+props.data.suserid).then((res)=>{
        setQList(res.data);

    }).catch((err)=>{
        alert("Quotation Related Error"+err);
    })
   },[]);

   
   return(
    <div>
        <center>
            <h4 style={{backgroundColor:"black",color:"white"}}>Quotation Details</h4>
            <table border={5} style={{backgroundColor:"black",color:"white"}}>
                <tr >
                    <th>Quotation Id</th>
                    <th>Tender Id</th>
                    <th>Quotation by Company</th>
                    <th>Quotation Submit Date</th>
                    <th>Quotation Amount</th>
                    <th>Status</th>
                </tr>
                {
                    qlist.map((qitem)=>(
                        <tr align="center">
                            <td>{qitem.qid}</td>
                            <td>{qitem.tid}</td>
                            <td>{qitem.qbyid}</td>
                            <td>{qitem.qsubdate}</td>
                            <td>{qitem.qamount}</td>
                            <td>{qitem.qstatus}</td>
                            
                        </tr>
                    ))

                    
                }

            </table>
        </center>
    </div>


   )

}export default ReviewQuotation;