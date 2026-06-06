import {
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Button
}
from "@mui/material";

function CommonDialog({
 open,
 title,
 children,
 onClose,
 onSubmit
}) {

 return (

  <Dialog
   open={open}
   onClose={onClose}
   fullWidth
   maxWidth="sm"
  >

   <DialogTitle>

    {title}

   </DialogTitle>

   <DialogContent>

    {children}

   </DialogContent>

   <DialogActions>

    <Button onClick={onClose}>

      Cancel

    </Button>

    <Button
      variant="contained"
      onClick={onSubmit}
    >

      Save

    </Button>

   </DialogActions>

  </Dialog>

 )

}

export default CommonDialog;