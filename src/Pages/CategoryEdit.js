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

})

const CategoryEdit = () => {

    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        categoryName: '',
        code: '',
        hsn: '',
        cgst: '',
        sgst: '',
        igst: '',
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
                const item = await axios.get(`http://104.211.240.205/API/api/Category/${id}`)
                setData(item.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getdata(id);
    }, [id])

    async function onFormSubmit(e) {
        e.preventDefault();
        if (data.code === '' || data.name === '' || data.address === '' || data.city === '' || data.pincode === '' || data.stateCode === '' ||
            data.contactName === '' || data.contactNumber === '' || data.mobileNumber === '' || data.gstIn === '') {
            alert("all fields are mandatory")
        }
        else {
            try {
                await axios.patch(`http://104.211.240.205/API/api/Category`, {
                    ...data,
                    cgst: parseInt(data.cgst), sgst: parseInt(data.sgst), igst: parseInt(data.igst)
                })
                navigate("/category")
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
    }
    function handleClick() {
        navigate("/category")
    }

    return (
        <>
            <Grid container >
                <Grid item >
                    <Box textAlign="center" p={2} className={classes.addColor} mb={2}>
                        <Typography variant="h4">Edit Category Data</Typography>
                    </Box>
                    <form noValidate>
                        <Grid ml={1} container spacing={2}>
                            <Grid item >
                                <TextField autoComplete="categoryName" name="categoryName" variant="outlined" required fullWidth id="categoryName" value={data.categoryName} color="error" label="CategoryName" onChange={e => textChange(e)} />
                            </Grid>
                            <Grid item >
                                <TextField autoComplete="code" name="code" variant="outlined" required fullWidth id="code" value={data.code} color="error" label="Code" onChange={e => textChange(e)} />
                            </Grid>
                            <Grid item >
                                <TextField autoComplete="hsn" name="hsn" variant="outlined" required fullWidth id="hsn" value={data.hsn} color="error" label="Hsn" onChange={e => textChange(e)} />
                            </Grid>
                            <Grid item >
                                <TextField autoComplete="cgst" name="cgst" variant="outlined" required fullWidth id="cgst" value={data.cgst} color="error" label="Cgst" onChange={e => textChange(e)} />
                            </Grid>
                            <Grid item >
                                <TextField autoComplete="sgst" name="sgst" variant="outlined" required fullWidth id="sgst" value={data.sgst} color="error" label="Sgst" onChange={e => textChange(e)} />
                            </Grid>
                            <Grid item >
                                <TextField autoComplete="igst" name="igst" variant="outlined" required fullWidth id="igst" value={data.igst} color="error" label="Igst" onChange={e => textChange(e)} />
                            </Grid>
                        </Grid>
                        <Box textAlign="end" m={3}>
                            <Button type="submit" variant="contained" color="error" onClick={e => onFormSubmit(e)}>Save</Button>
                        </Box>
                    </form>
                    <Box m={3} textAlign="end">
                        <Button variant="contained" color="primary" onClick={handleClick}>Back to Category</Button>
                    </Box>
                </Grid>

            </Grid>

        </>
    )
}

export default CategoryEdit