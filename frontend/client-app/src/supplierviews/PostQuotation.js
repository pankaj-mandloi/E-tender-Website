import React,{useState,useEffect} from "react";
import axios from "axios";
import ViewTender from "./ViewTender";

function PostQuotation(props)
{
    const[qid,setQId]=useState();
    const[tid,setTId]=useState(props.data.tid);
    const[qbyid,setQById]=useState(props.data.suserid);
    const[qsubdate,setQSubDate]=useState();
    const[qamount,setQAmount]=useState();

    const handleQIdText=(evt)=>{
        setQId(evt.target.value);
    }

    

    function mydateFun(tdate) {
        const date = new Date(tdate);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let mydate = `${String(day).padStart(2,"0")}-${String(month).padStart(2,"0")}-${year}`;
        return mydate;
    }

    const handleQSubDateText=(evt)=>{
        setQSubDate(mydateFun(evt.target.value));
    }
    const handleQAmountText=(evt)=>{
        setQAmount(evt.target.value);
    }
    const handlePostQuot=()=>{
        var obj={
            qid:qid,
            tid:tid,
            qbyid:qbyid,
            qsubdate:qsubdate,
            qamount:qamount,
            qstatus:"IN PROGRESS"
        }
        axios.post("http://localhost:9190/quotation/save",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    

    return(
        <div>
            <center>
                <h5 style={{backgroundColor:"black",color:"white"}}>POST QUOTATION</h5>
                <table border={5} style={{backgroundColor:"black",color:"white"}}>
                    <tr>
                        <td>Quotation Id</td>
                        <td>
                            <input type="number" onChange={handleQIdText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Tender Id</td>
                        <td>
                            <input type="text" value={tid}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Quotation By Id</td>
                        <td>
                            <input type="text" value={qbyid}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Submit Date</td>
                        <td>
                            <input type="date" onChange={handleQSubDateText}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>
                            <input type="number" onChange={handleQAmountText}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" onClick={handlePostQuot}>Post</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    )
}export default PostQuotation;