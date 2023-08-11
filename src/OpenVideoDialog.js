import * as React from 'react';
import {useRef, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import './App.css';
import videojs from "./video.js";


export default function AddOpenVideoDialog(props) {

  const liveURL = props.url;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: liveURL,
        type: 'application/dash+xml',
      },
    ],
  };

  const handleClose = () => {
    props.setShowVideoBox(false);
  };
  
  return (
    
    <Dialog
        open = {props.showVideoBox}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Camera is opened !"}
        </DialogTitle>
        <DialogContent>

          {/* <TextField 
            error = {error}
            style={{ width: '100%', marginTop:20 }} 
            id="address" 
            label="Address"
            onChange={event => onChangeAddress(event)}
            defaultValue= {address} />. */}

          <videojs {...videoJsOptions} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>
  );
}