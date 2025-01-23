import React,{useState,useEffect} from "react";
import axios from "axios";

function Bill(props)
{
    const[billid,setBillId]=useState();
    const[billdate,setBillDate]=useState();
    const[suserid,setSUserID]=useState();
    const[qid,setQId]=useState();
    const[qamount,setQAmount]=useState();
    const[qblist,setQBillList]=useState();
    const[mydate,setMyDate]=useState();
    const[suppdate,setSuppDate]=useState();
    const[sname,setSName]=useState();
    const[saddress,setSAddress]=useState();
    const[scontact,setSContact]=useState();
    const[semail,setSEmail]=useState();
    //const[sitems,setSItem]=useState();
    var total=props.data.qamount;
 
    useEffect(()=>{
        //get customer details

        axios.get("http://localhost:9190/supplier/checkid/"+props.data.qbyid).then((res)=>{
           setSName(res.data.sfullname);
           setSAddress(res.data.saddress);
           setSContact(res.data.scontact);
           setSEmail(res.data.semail);
           mydateFun();

        }).catch((err)=>{
            alert("Bill Related Error:"+err);
        })

        //get next bill id
        axios.get("http://localhost:9190/bill/getbillid/").then((res)=>{
            //alert(billid);
            setBillId(res.data[0].billid!=undefined?res.data[0].billid+1:10001);
            mydateFun();
        }).catch((err)=>{
            alert(err);
        })
    },[])

    function mydateFun()
    {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let currentDate = `${String(day).padStart(2,"0")}-${String(month).padStart(2,"0")}-${year}`;
        setMyDate(currentDate);

    }


    const handlePayNowButton=async()=>{
        alert("Payment process in progress....");
       // props.data.selitems.map((item)=>{
            var obj={
                billid:billid,
                billdate:mydate,
                qid:props.data.qid,
                suserid:props.data.qbyid,
                qamount:props.data.qamount

            }
            //save bill details
            axios.post("http://localhost:9190/bill/billsave",obj).then((res)=>{
                alert("Bill Saved");
            }).catch((err)=>{
                alert("Bill Saved Error :"+err);
            })
    

        //});
        //call payment gatway script
        displayRazorpay();
     }

function loadScript(src)
 {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}

async function displayRazorpay() 
{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js"
    );
//alert(res)
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
    var myamount=total*100;
    alert("Total Amount :"+myamount);

    // creating a new order
    const result = await axios.post("http://localhost:9190/payment/orders/"+myamount);
    //alert("sulekh"+result);
    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_8CxHBNuMQt1Qn8", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Universal Informatics.",
        description: "Test Transaction",
        //image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                billid:billid
            };
            alert(data.razorpayPaymentId);
            const result = await axios.post("http://localhost:9190/payment/success", data);

            alert(result.data);
        },
        prefill: {
            name: "Universal Informatics",
            email: "uni@gmail.com",
            contact: "9999999999",
        },
        notes: {
            address: "Universal Indore",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}



return(
    <div >
        <center >
            <div style={{ position: "absolute", top: "10px", right: "10px"}}>
                <img src="https://encrypted-tbn0.gstatic.com/
                          images?q=tbn:ANd9GcR9u-zTWNh1x_5hzO7LCfmLi8udG4Ezc-6WgA&s"
                     height={100} width={100} />
            </div>
                    
            <h2 >Bill Generate</h2>
            <table >
                <tr>
                    <td>Bill Id :</td>
                    <td>
                        {billid}
                        
                    </td>
                </tr>
                <tr>
                    <td>Supplier Name :</td>
                    <td>
                        {sname}
                    </td>
                </tr>
                <tr>
                    <td>Address :</td>
                    <td>
                        {saddress}
                        
                    </td>
                </tr>
                <tr>
                    <td>Contact :</td>
                    <td>
                        {scontact}
                    
                    </td>
                </tr>
                <tr>
                    <td>Bill Date</td>
                    <td>
                        {mydate}

                     </td>
                </tr>

            </table>

            <center>
                <hr/>
                <h4 style={{backgroundColor:"black",color:"white"}}>Total Amount : {total}</h4>
                <button type="submit" onClick={handlePayNowButton}>Pay Now</button>
            </center>
            
        </center>

        
    </div>
);
}export default Bill;
