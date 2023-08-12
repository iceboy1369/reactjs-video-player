import * as React from 'react';
import {useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from "axios";

export default function AddInsertNewVideoDialog(props) {
  const [address, setAdderss] = useState('');
  const [error, setError] = useState(true);

  const onChangeAddress = (event) => {
    setAdderss(event.target.value);
    if(address.length<20) {
        setError(true);
    }else{
        setError(false);
    }
  } 

  const handleCheckAddress = async() => {
     if(error || address.length<20) {
        props.handleCallback('');
        props.setShowAddCameraBox(true);
     }else{
        if (address.endsWith(".mpd") && address.startsWith("http")) {
          await axios
              .get(address)
              .then((response) => {
                  console.log(response);
                  props.handleCallback(address);
                  props.setShowAddCameraBox(false);
                  setAdderss('');
                  setError(true);
              })
              .catch((err) => {
                props.handleCallback('');
                props.setShowAddCameraBox(true);
              });
        } else {
          props.handleCallback('');
          props.setShowAddCameraBox(true);
        }
     }
  };

  const handleClose = () => {
    setAdderss('');
    setError(true);
    props.setShowAddCameraBox(false);
  };
  
  return (
    <Dialog
        open = {props.showAddCameraBox}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add New Camera"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please insert new web camera address into bellow box ! 
          </DialogContentText>

          <TextField 
            error = {error}
            style={{ width: '100%', marginTop:20 }} 
            id="address" 
            label="Address"
            onChange={event => onChangeAddress(event)}
            defaultValue= {address} />

          <DialogContentText style={{fontSize:11, color:"A8A196", marginTop:5, marginLeft:10 }}>
               Example: http://youraddress/videoname.mpd
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCheckAddress} autoFocus>
            Add
          </Button>
        </DialogActions>

      </Dialog>
  );
}