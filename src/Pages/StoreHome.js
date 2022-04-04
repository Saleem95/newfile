import { Grid, TextField, Button } from '@mui/material'
import { red } from '@mui/material/colors';
import axios from "axios";
import { Typography,Tooltip } from "@mui/material"
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";


const useStyles = makeStyles({
 addColor: {
  backgroundColor: red[500],
  color: "white"
 },
 
})

const StoreHome = () => {
 const classes = useStyles();
 const [items, setItems] = useState([])
 let [data, setData] = useState({
   code: '',
   name: '',
   address: '',
   city: '',
   pincode: '',
   gstIn: '',
   contactName: '',
   contactNumber: '',
   mobileNumber: '',
   emailID: '',
   companyCode: ''
 });

 let [status, setStatus] = useState()

 function textChange(e) {
   setData({
     ...data,
     [e.target.name]: e.target.value
   })
 }

 useEffect(() => {
   async function getdata() {
     try {
       const item = await axios.get(`http://104.211.240.205/API/api/Stores`)
       setItems(item.data);
     } catch (error) {
       console.log("Something is Wrong");
     }
   }
   getdata();
 }, [])

 async function onFormSubmit(e) {
   e.preventDefault();
   if (data.code === '' || data.name === '' || data.address === '' || data.city === '' || data.pincode === '' || data.gstIn === '' ||
     data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.emailID === '' || data.companyCode === '') {
     alert("all fields are mandatory")
   }
   else {
     try {
       await axios.post(`http://104.211.240.205/API/api/Stores`, {
         ...data,
         pincode: parseInt(data.pincode)

       })

       setStatus(true);
     } catch (error) {
       console.log("Something is Wrong");
     }
   }
 }
 if (status) {
   return <StoreHome />
 }

 const handleDelete = async (id) => {
   await axios.delete(`http://104.211.240.205/API/api/Stores?Code=${id}`);
   var newData = items.filter((item) => {
     // console.log(item);
     return item.code !== id;
   })
   setItems(newData);
 }


 return (
  <>
   <Grid container  spacing={4}>
    <Grid item >
     <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
      <Typography variant="h4">Add Stores</Typography>
     </Box>
     <form noValidate>
      <Grid container pl={3} spacing={2}>
       <Grid item >
        <TextField autoComplete="code" name="code" variant="outlined" required fullWidth id="code" color="error" label="Code" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" color="error" label="Name" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="address" name="address" variant="outlined" required fullWidth id="address" color="error" label="Address" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="city" name="city" variant="outlined" required fullWidth id="city" color="error" label="City" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="pincode" name="pincode" variant="outlined" required fullWidth id="pincode" color="error" label="Pincode" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="gstIn" name="gstIn" variant="outlined" required fullWidth id="gstIn" color="error" label="GstIn" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="contactName" name="contactName" variant="outlined" required fullWidth id="contactName" color="error" label="ContactName" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="contactNumber" name="contactNumber" variant="outlined" required fullWidth id="contactNumber" color="error" label="ContactNumber" onChange={e => textChange(e)} />
       </Grid>
       <Grid item >
        <TextField autoComplete="mobileNumber" name="mobileNumber" variant="outlined" required fullWidth id="mobileNumber" color="error" label="MobileNumber" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="emailID" name="emailID" variant="outlined" required fullWidth id="emailID" color="error" label="emailID" onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="companyCode" name="companyCode" variant="outlined" required fullWidth id="companyCode" color="error" label="companyCode" onChange={e => textChange(e)}/>
       </Grid>
      </Grid>
      <Box textAlign="end" pr={7} m={3}>
       <Button type="submit" variant="contained" color="error"  onClick={e => onFormSubmit(e)}>save</Button>
      </Box>
     </form>
    </Grid>
     
   </Grid>
   <Box textAlign="center" p={2} mb={1} className={classes.addColor}>
    <Typography variant="h4">Store List</Typography>
   </Box>
   <br/>
   <table>
     <thead>       
      <tr>     
      <th>No..</th>
          <th>Code</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Pincode</th>
          <th>Gst</th>
          <th>Contactname</th>
          <th>Contactnumber</th>
          <th>Mobilenumber</th>
          <th>Email</th>
          <th>Companycode</th>
          <th>Actions</th>

      </tr>
      
      </thead>
      <tbody>
        
      {items.map((value, i) => {
        return (

          <tr key={i} >
          <td>{i + 1}</td>
          <td>{value.code}</td>
          <td>{value.name}</td>
          <td>{value.address}</td>
          <td>{value.city}</td>
          <td>{value.pincode}</td>
          <td>{value.gstIn}</td>
          <td>{value.contactName}</td>
          <td>{value.contactNumber}</td>
          <td>{value.mobileNumber}</td>
          <td>{value.emailID}</td>
          <td>{value.companyCode}</td>
            <td>
            <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(value.code)}><DeleteIcon color="secondary" /></IconButton>
            </Tooltip>
            <Tooltip title="Edit">
            <IconButton><Link to={`/sedit/${value.code}`}><EditIcon /></Link></IconButton>
            </Tooltip>
              </td> 
          </tr>
        )
      }

      )}
     </tbody>
      </table>
  </>
 )
}

export default StoreHome