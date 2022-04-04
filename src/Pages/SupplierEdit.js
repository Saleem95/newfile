import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import Notification from '../Pages/Notifications';

const useStyles = makeStyles({
   addColor: {
      backgroundColor: red[400],
      color: "white"
   },

});

const Edit = () => {
   const classes = useStyles();
   const { id } = useParams();
   // console.log(id);
   const navigate = useNavigate();

   let [data, setData] = useState({
      code: '',
      name: '',
      address: '',
      city: '',
      pincode: '',
      stateCode: '',
      gstIn: '',
      contactName: '',
      contactNumber: '',
      mobileNumber: '',
      emailID: '',
      companyCode: ''
   });

  const [notify ,setNotify] =useState({isOpen:false, Message:'', type:''})

   function textChange(e) {
      setData({
         ...data,
         [e.target.name]: e.target.value
      })
   }
   
   useEffect(() => {
      getdata(id);
  }, [id])

  async function getdata(id) {
      try {
          const item = await axios.get(`http://104.211.240.205/API/api/Supplier/Code?Code=${id}`)
          setData(item.data);
      } catch (error) { 
          console.log("Something is Wrong");
      }
  }

   async function onFormSubmit(e) {
      e.preventDefault()
      if ( data.name === '' || data.address === '' || data.city === '' || data.pincode === '' || data.stateCode === '' || data.gstIn === '' || data.stateCode === '' ||
         data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.emailID === '' || data.companyCode === '') {
         alert("all fields are mandatory")
      }
      else {
         try {
            await axios.patch(`http://104.211.240.205/API/api/Supplier`, {
               ...data,
                pincode: parseInt(data.pincode)
            })
            navigate("/supplier")
         } catch (error) {
            console.log("Something is Wrong");
         }
      }
   }
   function handleClick() {
      navigate("/supplier")
   }

   return (
      <>

         <Grid container >
            <Grid item >
               <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
                  <Typography variant="h4">Edit Supplier</Typography>
               </Box>
               <form  noValidate>
                  <Grid pl={3}  container spacing={2}>
                     <Grid item >
                        <TextField autoComplete="code" name="code" variant="outlined" required fullWidth id="code" value={data.code} color="error" label="Code" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" value={data.name} color="error" label="Name" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="address" name="address" variant="outlined" required fullWidth id="address" value={data.address} color="error" label="Address" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="city" name="city" variant="outlined" required fullWidth id="city" value={data.city} color="error" label="City" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="pincode" name="pincode" variant="outlined" required fullWidth id="pincode" value={data.pincode} color="error" label="Pincode" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="stateCode" name="stateCode" variant="outlined" required fullWidth id="stateCode" value={data.stateCode} color="error" label="StateCode" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="gstIn" name="gstIn" variant="outlined" required fullWidth id="gstIn" value={data.gstIn} color="error" label="GstIn" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactName" name="contactName" variant="outlined" required fullWidth id="contactName" value={data.contactName} color="error" label="ContactName" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactNumber" name="contactNumber" variant="outlined" required fullWidth id="contactNumber" value={data.contactNumber} color="error" label="ContactNumber" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="mobileNumber" name="mobileNumber" variant="outlined" required fullWidth id="mobileNumber" value={data.mobileNumber} color="error" label="MobileNumber" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="emailID" name="emailID" variant="outlined" required fullWidth id="emailID" value={data.emailID} color="error" label="EmailID" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="companyCode" name="companyCode" variant="outlined" required fullWidth id="companyCode" value={data.companyCode} color="error" label="companyCode" onChange={e => textChange(e)} />
                     </Grid>
                  </Grid>
                  <Box m={3} pr={9}  textAlign="end">
                     <Button type="button" variant="contained" color="error" onClick={e => onFormSubmit(e)}>Update</Button>
                  </Box>
               </form>
               <Box m={3} pr={9} textAlign="end">
                  <Button variant="contained" color="primary" onClick={handleClick}>Back to Supplier</Button>
               </Box>
            </Grid>
         </Grid >

      {/* <Notification notify={notify} setNotify={setNotify}/> */}

      </>
   )
}

export default Edit