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
import { useNavigate } from 'react-router-dom'


const useStyles = makeStyles({

  addColor: {
    backgroundColor: red[400],
    color: "white"
  },
  
})

const Category = () => {
  const classes = useStyles()
  const [items,setItems] = useState([])
  let [data, setData] = useState({
      categoryName:'',
      code:'',
      hsn:'',
      cgst:'',
      sgst:'',
      igst:'',
  });

  let [status, setStatus] = useState()
    const navigate = useNavigate();

    function textChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const changeCase=(event)=>{
      event.preventDefault();
      setData(event.target.value.toUpperCase());
  }

    useEffect(() => {
        async function getdata() {
            try {
                const item = await axios.get(`http://104.211.240.205/API/api/Category`)
                setItems(item.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getdata();
    }, [])

    async function onFormSubmit(e) {
        e.preventDefault();
        if(data.code === '' || data.name === '' || data.address === '' || data.city === '' || data.pincode === '' || data.stateCode === '' ||
            data.contactName === '' || data.contactNumber === '' ||  data.mobileNumber === '' || data.gstIn === '' ){
            alert("all fields are mandatory")
        }
        else{ 
        try {
            await axios.post(`http://104.211.240.205/API/api/Category`, {
                ...data,
                cgst: parseInt(data.cgst),sgst: parseInt(data.sgst),igst: parseInt(data.igst)
            })
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong");
        }
    }
    }
    if (status) {
        return <Category />
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://104.211.240.205/API/api/Category?Id=${id}`);
        var newData = items.filter((item) => {
            // console.log(item);
            return item.id !== id;
        })
        setItems(newData);
    }

  return (
    <>
      <Grid container >
        <Grid item >
          <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
            <Typography variant="h4">Add Category Data</Typography>
          </Box>
          <form noValidate>
            <Grid ml={1} container spacing={2}>
            <Grid item >
                <TextField autoComplete="categoryName" name="categoryName"  required fullWidth id="categoryName" color="error" label="CategoryName" onChange={e => textChange(e)} />
              </Grid>
              <Grid item >
                <TextField autoComplete="code" name="code"  required fullWidth id="code" color="error" label="Code" onChange={e => textChange(e)} />
              </Grid>
              <Grid item >
                <TextField autoComplete="hsn" name="hsn" onMouseEnter={changeCase}   required fullWidth id="hsn" color="error" label="Hsn" onChange={e => textChange(e)} />
              </Grid>
              <Grid item >
                <TextField autoComplete="cgst" name="cgst"  required fullWidth id="cgst" color="error" label="Cgst" onChange={e => textChange(e)} />
              </Grid>
              <Grid item >
                <TextField autoComplete="sgst" name="sgst"  required fullWidth id="sgst" color="error" label="Sgst" onChange={e => textChange(e)} />
              </Grid>
              <Grid item >
                <TextField autoComplete="igst" name="igst"  required fullWidth id="igst" color="error" label="Igst" onChange={e => textChange(e)} />
              </Grid> 
            </Grid>
             <Box textAlign="end" m={3}>
              <Button type="submit" variant="contained" color="error" onClick={e => onFormSubmit(e)}>Save</Button>
            </Box>
          </form>
        </Grid>

      </Grid>
      <Box textAlign="center" className={classes.addColor} mb={2} p={2} >
        <Typography variant="h4"> Category List</Typography>
      </Box>
      <table>
        <thead>
        <tr>
          <th>Id..</th>
          <th>CategoryName</th>
          <th>Code</th>
          <th>Hsn</th>
          <th>CGST</th>
          <th>SGST</th>
          <th>IGST</th>
          <th>Actions</th>

        </tr>
        </thead>
        <tbody>
        {items.map((value, i) => {
          return (

            <tr key={i} >
              <td>{i + 1}</td>
              <td>{value.categoryName}</td>
              <td>{value.code}</td>
              <td>{value.hsn}</td>
              <td>{value.cgst}</td>
              <td>{value.sgst}</td>
              <td>{value.igst}</td>
              
              <td>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(value.id)}><DeleteIcon color="secondary" /></IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton><Link to={`/categoryedit/${value.id}`}><EditIcon /></Link></IconButton>
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

export default Category