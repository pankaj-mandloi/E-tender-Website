import React, { useState, useEffect } from "react";
import axios from "axios";

function TenderMgt() {
    const [tenderid, setTenderId] = useState();
    const [tenderbyid, setTenderById] = useState();
    const [tendersdate, setTenderSDate] = useState();
    const [tenderedate, setTenderEDate] = useState();
    const [pcatgid, setPCatgId] = useState();
    const [pid, setPId] = useState();
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);
    const [tlist, setTList] = useState([]);
    let catgname = "";
    let pname = "";

    const handleTenderIdText = (evt) => { setTenderId(evt.target.value); }
    const handleTenderByIdText = (evt) => { setTenderById(evt.target.value); }
    const handleTenderSDateText = (evt) => { setTenderSDate(evt.target.value); }
    const handleTenderEDateText = (evt) => { setTenderEDate(evt.target.value); }
    const handlePCatgSelect = (evt) => { setPCatgId(evt.target.value); }
    const handlePIdSelect = (evt) => { setPId(evt.target.value); }

    useEffect(() => {
        axios.get("http://localhost:9190/productcatg/show")
            .then((res) => {
                setPCatgList(res.data);
            })
            .catch((err) => {
                alert("Product Category related error=>" + err);
            });

        axios.get("http://localhost:9190/product/show")
            .then((res) => {
                setPList(res.data);
            })
            .catch((err) => {
                alert("Product related error=>" + err);
            });
    }, []);

    const handleSaveButton = () => {
        const tobj = {
            tenderid: tenderid,
            tenderbyid: tenderbyid,
            tendersdate: tendersdate,
            tenderedate: tenderedate,
            pcatgid: pcatgid,
            pid: pid
        };
        alert("inside save button");

        axios.post("http://localhost:9190/tender/save", tobj)
            .then((res) => {
                alert("Tender saved!!");
            })
            .catch((err) => {
                alert(err);
            });

        axios.get("http://localhost:9190/tender/showall")
            .then((res) => {
                setTList(res.data);
            })
            .catch((err) => {
                alert("Tender related error=>" + err);
            });
    }

    return (
        <div >
            <center>
                <h5 style={{ backgroundColor: "black", color: "white" }}>TENDER ENTERY FORM</h5>
                <table border={10} style={{ backgroundColor: "black", color: "white" }}>
                    <tr>
                        <th align="left">TENDER ID:</th>
                        <td><input type="number" onChange={handleTenderIdText} /></td>
                    </tr>
                    <tr>
                        <th align="left">TENDER_BY ID:</th>
                        <td><input type="text" onChange={handleTenderByIdText} /></td>
                    </tr>
                    <tr>
                        <th align="left">TENDER START DATE:</th>
                        <td><input type="datetime-local" onChange={handleTenderSDateText} /></td>
                    </tr>
                    <tr>
                        <th align="left">TENDER END DATE:</th>
                        <td><input type="datetime-local" onChange={handleTenderEDateText} /></td>
                    </tr>
                    <tr>
                        <th align="left">PRODUCT CATEGORY:</th>
                        <td>
                            <select onClick={handlePCatgSelect}>
                                {pcatglist.map((item) => (
                                    <option value={item.pcatgid}>{item.pcatgname}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th align="left">PRODUCT ID:</th>
                        <td>
                            <select onClick={handlePIdSelect}>
                                {plist.map((item) => (
                                    <option value={item.pid}>{item.pname}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type="submit" onClick={handleSaveButton}>SAVE</button></td>
                    </tr>
                </table>
                <h5 style={{ backgroundColor: "black", color: "white" }}>TENDER DETAILS</h5>
                <table border={10} style={{ backgroundColor: "black", color: "white" }}>
                    <tr style={{ textAlign: "center", backgroundColor: "black", color: "white" }}>
                        <th>TENDER ID</th>
                        <th>TENDER_BY ID</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>CATEGORY</th>
                        <th>PRODUCT</th>
                    </tr>
                    {tlist.map((titem) => (
                        <tr>
                            <td align="center">{titem.tenderid}</td>
                            <td align="center">{titem.tenderbyid}</td>
                            <td align="center">{titem.tendersdate}</td>
                            <td align="center">{titem.tenderedate}</td>
                            {pcatglist.map((pcatgitem) => {
                                if (pcatgitem.pcatgid == titem.pcatgid) {
                                    catgname = pcatgitem.pcatgname;
                                }
                            })}
                            <td align="center">{catgname}</td>
                            {plist.map((pitem) => {
                                if (pitem.pid == titem.pid) {
                                    pname = pitem.pname;
                                }
                            })}
                            <td align="center">{pname}</td>
                        </tr>
                    ))}
                </table>
            </center>
        </div>
    );
}

export default TenderMgt;
