import * as React from 'react';
import {useRef} from "react";
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './App.css';


export default function AddOpenVideoDialog(props) {

  const playerRef = useRef(null);

  const liveURL = props.url;

  const onReady = () => {
    const dash = playerRef.current.getInternalPlayer("dash");
    console.log(dash.getXHRWithCredentialsForType("GET"));
  };
  
  return (
    <Dialog
        maxWidth = 'xl'
        open = {props.showVideoBox}
        onClose={props.handleCallback}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Camera is opened !"}
        </DialogTitle>
        <DialogContent>

          <ReactPlayer
            ref={playerRef}
            onReady={onReady}
            url={liveURL}
            playing
            controls
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCallback} >Close</Button>
        </DialogActions>

      </Dialog>
  );
}