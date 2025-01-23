import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//import StateMainPage from './statcityviews/StateMainPage';
//import ProductMainPage from './productviews/ProductMainPage';
//import ProductCatgMainPage from './productviews/ProductCatgMainPage';
// import ProductMgt from "./productviews/ProductMgt";
// import ProductCatgMgt from "./productviews/ProductCatgMgt";
 //import MainPage from './supplierviews/MainPage';
// import TenderMgt from './tender/TenderMgt';
//import MainPage from './company/MainPage';
// import MainPage from './supplierviews/MainPage';
import CityMgt from "./statecityviews/CityMgt";
import ProductCatgMgt from './productviews/ProductCatgMgt';
import ShowAllProducts from './productviews/ShowAllProducts';
import SearchProduct1 from './productviews/SearchProduct1';
import SearchProductAddBy from './productviews/SearchProductAddBy';
import PostTender from './company/PostTender';
import TenderMgt from "./tender/TenderMgt";
import PostQuotation from './supplierviews/PostQuotation';
import Bill from './company/Bill';
import EtendeMainPage from './EtendeMainPage';
import {useHistory} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  //   <CityMgt/>
  // </React.StrictMode>

 <useHistory>
  <BrowserRouter>
     <EtendeMainPage/>
  </BrowserRouter>
 </useHistory>
 


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
