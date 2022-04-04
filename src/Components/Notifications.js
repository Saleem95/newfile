import React from 'react'
import { Snackbar } from "@mui/material"

// import Alert from "../Alert"
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notifications({ open, onClose, error, width="100%" }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={error ? "error" : "success"}
        sx={{ ...width }}
      >
        {error ? error : "Submitted successfully!"}
      </Alert>
    </Snackbar>
  )
}



