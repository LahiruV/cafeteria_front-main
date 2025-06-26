import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Button,
    Avatar,
    Modal,
    TextField,
    Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        paddingBottom: theme.spacing(4),
    },
    header: {
        textAlign: 'center',
        padding: theme.spacing(4, 0, 2),
    },
    paper: {
        padding: theme.spacing(4),
        margin: 'auto',
        maxWidth: 600,
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[4],
    },
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        backgroundColor: theme.palette.primary.main,
    },
    label: {
        fontWeight: 600,
        color: '#555',
    },
    value: {
        marginBottom: theme.spacing(2),
    },
    buttonsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(4),
    },
    loyaltyBtn: {
        backgroundColor: '#009688',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#00796b',
        },
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[6],
        padding: theme.spacing(4),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    modalHeader: {
        marginBottom: theme.spacing(2),
    }
}));

function Profile() {
    const classes = useStyles();
    const email = sessionStorage.getItem("cusmail");
    const [profile, setProfile] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const profileDetails = profile[0] || {};
    const [edtname, setEdtname] = useState('');
    const [edtphone, setEdtphone] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profile.length) {
            setEdtname(profileDetails.name || '');
            setEdtphone(profileDetails.phone || '');
        }
    }, [profile]);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(global.APIUrl + `/user/profile/${email}`);
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await axios.delete(global.APIUrl + `/user/delete/${email}`);
            sessionStorage.setItem('cusmail', 'empty');
            window.location.href = "/";
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    }

    const handleLoyalProfile = async () => {
        try {
            const updatedData = {
                ...profileDetails,
                isLoyal: true
            };
            await axios.put(global.APIUrl + `/user/update`, updatedData);
            Swal.fire("Success", "Loyalty Activated", "success").then(() => window.location.reload());
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const updatedData = {
                ...profileDetails,
                name: edtname,
                phone: edtphone,
            };
            await axios.put(global.APIUrl + `/user/update`, updatedData).then(
                setEditModalOpen(false)
            );
            Swal.fire("Success", "Profile Updated", "success").then(() => window.location.reload());
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <div style={{ height: '100vh' }}>
                <div className={classes.header}>
                    <Typography variant="h4">My Profile</Typography>
                    <Divider variant="middle" style={{ margin: '16px auto', width: '60px' }} />
                </div>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.avatarWrapper}>
                                <Avatar className={classes.avatar}>
                                    <AccountCircleIcon fontSize="large" />
                                </Avatar>
                            </div>
                            <Typography className={classes.label}>Name:</Typography>
                            <Typography className={classes.value}>{profileDetails.name}</Typography>
                            <Typography className={classes.label}>Email:</Typography>
                            <Typography className={classes.value}>{profileDetails.email}</Typography>
                            <Typography className={classes.label}>Phone:</Typography>
                            <Typography className={classes.value}>{profileDetails.phone}</Typography>
                            <Typography className={classes.label}>Loyalty Status:</Typography>
                            <Typography className={classes.value}>
                                {profileDetails.isLoyal === 'true' ? 'Loyal Customer' : 'Not Loyal'}
                            </Typography>
                            {profileDetails.isLoyal === 'true' && (
                                <>
                                    <Typography className={classes.label}>Points:</Typography>
                                    <Typography className={classes.value}>{profileDetails.points}</Typography>
                                </>
                            )}

                            <div className={classes.buttonsRow}>
                                {profileDetails.isLoyal !== 'true' && (
                                    <Button className={classes.loyaltyBtn} onClick={handleLoyalProfile}>Activate Loyalty</Button>
                                )}
                                <Button variant="outlined" color="secondary" onClick={handleDeleteProfile}>Delete Profile</Button>
                                <Button variant="contained" color="primary" onClick={() => setEditModalOpen(true)}>Edit Profile</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                    <div className={classes.modalPaper}>
                        <Typography variant="h6" className={classes.modalHeader}>Edit Profile</Typography>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={edtname}
                            onChange={(e) => setEdtname(e.target.value)}
                        />
                        <TextField
                            label="Phone"
                            fullWidth
                            margin="normal"
                            type="tel"
                            value={edtphone}
                            onChange={(e) => setEdtphone(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSaveChanges}
                            style={{ marginTop: '16px' }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Modal>
            </div>
            <div style={{ marginBottom: '-100px' }}>
                <Footer />
            </div>
        </div>
    );
}

export default Profile;
