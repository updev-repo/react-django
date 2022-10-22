import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../reducers/auth';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/auth';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../reducers/userSlice';
const UserProfile = () => {
    const handleLogout = () => {
        dispatch(unsetUserInfo({ name: "", email: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phonenumber: "",
    })

    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                name: data.name,
                phonenumber: data.phoneNumber
            })
        }
    }, [data, isSuccess])

    // Store User Data in Redux Store
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setUserInfo({
                email: data.email,
                name: data.name
            }))
        }
    }, [data, isSuccess, dispatch])

    return <>
        <Grid mt={10} container sx={{ height: '45vh' }}>
            <Grid item lg={3} sm={3} sx={{

                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: { xs: 'none', sm: 'block' }
            }}>
            </Grid>
            <CssBaseline />
            <Grid item lg={5} sm={7} xs={12} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>

                <h1>User profile</h1>
                <br />
                <Typography variant='h6'>Name: {userData.name}</Typography>
                <Typography variant='h5'>Phone Number: {userData.phonenumber}</Typography>
                <Typography variant='h6'>Email: {userData.email}</Typography>
                <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>


            </Grid>
        </Grid>





    </>;
};

export default UserProfile;