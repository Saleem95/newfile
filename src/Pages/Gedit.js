import { Typography, Box, Grid, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
   addColor: {
      backgroundColor: red[400],
      color: "white"
   },

});

const Gedit = () => {
   const classes = useStyles();
   const { id } = useParams();
   const navigate = useNavigate();

   let [data, setData] = useState({
      godownCode: '',
      godownName: '',
      address: '',
      city: '',
      pincode: '',
      contactName: '',
      contactNumber: '',
      mobileNumber: '',
      emailID: '',
      companyCode: ''
   });
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
         const item = await axios.get(`http://104.211.240.205/API/api/GoDownData/Code?Code=${id}`)
         setData(item.data);
      } catch (error) {
         console.log("Something is Wrong");
      }
   }

   async function onFormSubmit(e) {
      e.preventDefault()
      if (data.godownCode === '' || data.address === '' || data.city === '' || data.pincode === '' || 
         data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.emailID === '' || data.companyCode === '') {
         alert("all fields are mandatory")
      }
      else {
         try {
            await axios.patch(`http://104.211.240.205/API/api/GoDownData`, {
               ...data,
               pincode: parseInt(data.pincode)
            })
            navigate("/godown")
         } catch (error) {
            console.log("Something is Wrong");
         }
      }
   }
   function handleClick() {
      navigate("/godown")
   }

   return (
      <>

         <Grid container >
            <Grid item >
               <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
                  <Typography variant="h4">Edit GodownData</Typography>
               </Box>
               <form >
                  <Grid pl={3} container spacing={2}>
                     <Grid item >
                        <TextField autoComplete="godownCode" name="godownCode"  required fullWidth id="godownCode" value={data.godownCode} color="error" label="godownCode" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="godownName" name="godownName"  required fullWidth id="godownName" value={data.godownName} color="error" label="godownName" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="address" name="address"  required fullWidth id="address" value={data.address} color="error" label="Address" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="city" name="city"  required fullWidth id="city" value={data.city} color="error" label="City" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="pincode" name="pincode"  required fullWidth id="pincode" value={data.pincode} color="error" label="Pincode" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactName" name="contactName"  required fullWidth id="contactName" value={data.contactName} color="error" label="ContactName" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactNumber" name="contactNumber"  required fullWidth id="contactNumber" value={data.contactNumber} color="error" label="ContactNumber" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="mobileNumber" name="mobileNumber"  required fullWidth id="mobileNumber" value={data.mobileNumber} color="error" label="MobileNumber" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="emailID" name="emailID"  required fullWidth id="emailID" value={data.emailID} color="error" label="EmailID" onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="companyCode" name="companyCode"  required fullWidth id="companyCode" value={data.companyCode} color="error" label="companyCode" onChange={e => textChange(e)} />
                     </Grid>
                  </Grid>
                  <Box m={3} pr={9} textAlign="end">
                     <Button type="button" variant="contained" color="error" onClick={e => onFormSubmit(e)}>Update</Button>
                  </Box>
               </form>
               <Box m={3} pr={9} textAlign="end">
                  <Button variant="contained" color="primary" onClick={handleClick}>Back to GoDownData</Button>
               </Box>
            </Grid>
         </Grid >
      </>
   )
}

export default Gedit