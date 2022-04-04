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
function Redit() {
   const classes = useStyles();
   const { id } = useParams();
   const navigate = useNavigate();
   let [data, setData] = useState({
      code: "",
      name: "",
      address: "",
      city: "",
      stateCode: "",
      gstIn: "",
      contactName: "",
      contactNumber: "",
      mobileNumber: "",
      emailID: "",
      companyCode: ""
   });

   function textChange(e) {
      setData({
         ...data,
         [e.target.name]: e.target.value
      })
   }

   useEffect(() => {
      async function getdata(id) {
         try {
            const item = await axios.get(`http://104.211.240.205/API/api/PartyList/Code?Code=${id}`)
            setData(item.data);
         } catch (error) {
            console.log("Something is Wrong");
         }
      }
      getdata(id);
   }, [id])


   async function onFormSubmit(e) {
      e.preventDefault()
      if (data.name === '' || data.address === '' || data.city === '' || data.pincode === '' || data.gstIn === '' ||
         data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.emailID === '' || data.companyCode === '') {
         alert("all fields are mandatory")
      }
      else {
         try {
            await axios.patch(`http://104.211.240.205/API/api/PartyList`, {
               ...data,
               pincode: parseInt(data.pincode)
            })
            navigate("/retailer")
         } catch (error) {
            console.log("Something is Wrong");
         }
      }
   }
   function handleClick() {
      navigate("/retailer")
   }
   return (
      <>

         <Grid container justify="center" spacing={4}>
            <Grid item >
               <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
                  <Typography variant="h4">Edit Retailer</Typography>
               </Box>
               <form noValidate>
                  <Grid pl={3} container spacing={2}>
                     <Grid item >
                        <TextField autoComplete="code" name="code" variant="outlined" required fullWidth id="code" color="error" label="Code" value={data.code} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" color="error" label="Name" value={data.name} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="address" name="address" variant="outlined" required fullWidth id="address" color="error" label="Address" value={data.address} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="city" name="city" variant="outlined" required fullWidth id="city" color="error" label="City" value={data.city} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="pincode" name="pincode" variant="outlined" required fullWidth id="pincode" color="error" label="Pincode" value={data.pincode} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="stateCode" name="stateCode" variant="outlined" required fullWidth id="stateCode" color="error" label="StateCode" value={data.stateCode} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="gstIn" name="gstIn" variant="outlined" required fullWidth id="gstIn" color="error" label="GstIn" value={data.gstIn} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactName" name="contactName" variant="outlined" required fullWidth id="contactName" color="error" label="ContactName" value={data.contactName} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="contactNumber" name="contactNumber" variant="outlined" required fullWidth id="contactNumber" color="error" label="ContactNumber Address" value={data.contactNumber} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="mobileNumber" name="mobileNumber" variant="outlined" required fullWidth id="mobileNumber" color="error" label="MobileNumber" value={data.mobileNumber} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="emailID" name="emailID" variant="outlined" required fullWidth id="emailID" color="error" label="EmailID" value={data.emailID} onChange={e => textChange(e)} />
                     </Grid>
                     <Grid item >
                        <TextField autoComplete="companyCode" name="companyCode" variant="outlined" required fullWidth id="companyCode" color="error" label="companyCode" value={data.companyCode} onChange={e => textChange(e)} />
                     </Grid>
                  </Grid>
                  <Box textAlign="end" pr={9} m={3}>
                     <Button type="submit" variant="contained" color="error" onClick={e => onFormSubmit(e)}>Save</Button>
                  </Box>
               </form>
               <Box m={3} pr={9} textAlign="end">
                  <Button variant="contained" color="primary" onClick={handleClick}>Back to Retailer</Button>
               </Box>
            </Grid>
         </Grid >
      </>
   )
}

export default Redit