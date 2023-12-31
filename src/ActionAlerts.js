import React, {useState, forwardRef} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = (props) =>  {
    
        const [open, setOpen] = useState(true); 
    
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
            props.setShowAlert(false);
          };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} color= {props.success ?"success" : "error"}>{props.message}</Alert>
        </Snackbar>
    )
}

export default InstantMessage