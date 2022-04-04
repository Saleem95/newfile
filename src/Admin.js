import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import SupplierHome from "./Pages/SupplierHome";
import TransporterHome from "./Pages/TransporterHome";
import GodownHome from "./Pages/GodownHome";
import RetailerHome from "./Pages/RetailerHome";
import StoreHome from "./Pages/StoreHome";
import CompanyHome from "./Pages/CompanyHome";
import UserHome from "./Pages/UserHome"
import Category from './Pages/Category';

import Edit from "./Pages/SupplierEdit";
import Tedit from "./Pages/Tedit";
import Gedit from "./Pages/Gedit";
import Redit from "./Pages/Redit";
import Sedit from "./Pages/Sedit";
import Cedit from "./Pages/Cedit";
import Uedit from "./Pages/Uedit";
import CategoryEdit from './Pages/CategoryEdit';


function Admin() {

    const history = useNavigate();

    const handleClick = (path) => {
        history(path);
    };

    return (
        <>

            <div className='App'>
                <div className='page'>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group">
                            <FormControlLabel value="supplier" onClick={() => handleClick("/supplier")} control={<Radio />} label="Supplier" />
                            <FormControlLabel value="transporter" onClick={() => handleClick("/transporter")} control={<Radio />} label="Transporter" />
                            <FormControlLabel value="godown" onClick={() => handleClick("/godown")} control={<Radio />} label="Godown" />
                            <FormControlLabel value="retailer" onClick={() => handleClick("/retailer")} control={<Radio />} label="Retailer" />
                            <FormControlLabel value="store" onClick={() => handleClick("/store")} control={<Radio />} label="Store" />
                            <FormControlLabel value="companyInfo" onClick={() => handleClick("/companyInfo")} control={<Radio />} label="CompanyInfo" />
                            <FormControlLabel value="users" onClick={() => handleClick("/users")} control={<Radio />} label="Users" />
                            <FormControlLabel value="category" onClick={() => handleClick("/category")} control={<Radio />} label="Category" />

                        </RadioGroup>
                    </FormControl>

                </div>

                <Routes>
                    <Route exact path='/supplier' element={<SupplierHome />} />
                    <Route exact path='/edit/:id' element={<Edit />} />
                    <Route exact path='/transporter' element={<TransporterHome />} />
                    <Route exact path='/tedit/:id' element={<Tedit />} />
                    <Route exact path='/godown' element={<GodownHome />} />
                    <Route exact path='/gedit/:id' element={<Gedit />} />
                    <Route exact path='/retailer' element={<RetailerHome />} />
                    <Route exact path='/redit/:id' element={<Redit />} />
                    <Route exact path='/store' element={<StoreHome />} />
                    <Route exact path='/sedit/:id' element={<Sedit />} />
                    <Route exact path='/companyInfo' element={<CompanyHome />} />
                    <Route exact path='/cedit/:id' element={<Cedit />} />
                    <Route exact path='/users' element={<UserHome />} />
                    <Route exact path='/uedit/:id' element={<Uedit />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/categoryedit/:id' element={<CategoryEdit />} />

                    {/* <Route exact path='/details' element={<Details  />} />  */}
                    {/* <Route exact path='/main' element={<Main  />} />  */}

                </Routes>

            </div>
            <br />
        </>
    )
}

export default Admin;