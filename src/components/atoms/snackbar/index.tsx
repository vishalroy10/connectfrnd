import * as React from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface SnackbarProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  severity?: AlertProps['severity'];
  variant?: AlertProps['variant'];
  message: string
}

 function Snackbar({open=false, setOpen, severity="success", variant="filled", message }: SnackbarProps) {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <MUISnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          sx={{ width: '100%' }}
        >
            {message}
        </Alert>
      </MUISnackbar>
  );
}

export default Snackbar;