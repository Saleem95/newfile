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

const Uedit = () => {
 const classes = useStyles();
 const { id } = useParams();
 const navigate = useNavigate();
 const [data, setData] = useState({
      userName:'',
      name:'',
      companyCode:'',
      godownCode:'',
      storeCode:'',
      contactName:'',
      contactNumber:'',
      mobileNumber:'',
      email:'',
      id:'',
      // password:'',
      userType:''
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
      const item = await axios.get(`http://104.211.240.205/API/api/Users/userId?userId=${id}`)
      setData(item.data);
  } catch (error) {
      console.log("Something is Wrong");
  }
}

async function onFormSubmit(e) {
  e.preventDefault()
  if (data.userName === '' || data.name === '' || data.userType === '' || data.companyCode === '' || data.storeCode === '' || data.godownCode === '' ||
      data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.email === '' ) {
      alert("all fields are mandatory")
  }
  else {
      try {
          await axios.patch(`http://104.211.240.205/API/api/Users/${id}`,
          {...data})
          navigate("/users")
      } catch (error) {
          console.log("Something is Wrong");
      }
  }
}
function handleClick() {
  navigate("/users")
}

 return (
  <>

   <Grid container  >
    <Grid item>
     <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
      <Typography variant="h4">Edit Users</Typography>
     </Box>
     <form noValidate>
      <Grid pl={3} container spacing={2}>
       <Grid item >
        <TextField autoComplete="userName" name="userName" variant="outlined" required fullWidth id="userName" color="error" label="userName" value={data.userName} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" color="error" label="Name" value={data.name} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="companyCode" name="companyCode" variant="outlined" required fullWidth id="companyCode" color="error" label="CompanyCode" value={data.companyCode} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="storeCode" name="storeCode" variant="outlined" required fullWidth id="storeCode" color="error" label="StoreCode" value={data.storeCode} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="godownCode" name="godownCode" variant="outlined" required fullWidth id="godownCode" color="error" label="GodownCode" value={data.godownCode} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="contactName" name="contactName" variant="outlined" required fullWidth id="contactName" color="error" label="ContactName" value={data.contactName} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="contactNumber" name="contactNumber" variant="outlined" required fullWidth id="contactNumber" color="error" label="ContactNumber " value={data.contactNumber} onChange={e => textChange(e)} />
       </Grid>
       <Grid item >
        <TextField autoComplete="mobileNumber" name="mobileNumber" variant="outlined" required fullWidth id="mobileNumber" color="error" label="MobileNumber" value={data.mobileNumber} onChange={e => textChange(e)}/>
       </Grid>
       <Grid item >
        <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" color="error" label="Email" value={data.email} onChange={e => textChange(e)}/>
       </Grid>
       {/* <Grid item >
        <TextField autoComplete="password" name="password" variant="outlined" required fullWidth id="password" color="error" label="Password" value={data.password} onChange={e => textChange(e)}/>
       </Grid> */}
       <Grid item >
        <TextField autoComplete="userType" name="userType" variant="outlined" required fullWidth id="userType" color="error" label="UserType" value={data.userType} onChange={e => textChange(e)}/>
       </Grid>
      </Grid>
      <Grid item>
      <Box textAlign="end" pr={9} m={3}>
       <Button type="submit" variant="contained" color="error"  onClick={e => onFormSubmit(e)}>Update</Button>
      </Box>
      </Grid>
     </form>
     <Box m={3} pr={9} textAlign="end">
      <Button variant="contained" color="primary" onClick={handleClick}>Back to users</Button>
     </Box>
    </Grid>
   </Grid >
  </>
 )
}

export default Uedit