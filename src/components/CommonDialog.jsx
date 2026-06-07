import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function CommonDialog({ open, title, children, onClose, onSubmit, loading }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1560 40%, #24243e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
          {title}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: "rgba(255,255,255,0.7)",
            "&:hover": {
              color: "#fff",
              background: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3, mt: 1 }}>{children}</DialogContent>

      <DialogActions sx={{ borderTop: "1px solid #eee", p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#7c6af7",
            color: "#7c6af7",
            "&:hover": {
              borderColor: "#5b4fcf",
              background: "rgba(124,106,247,0.06)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            background:
              "linear-gradient(135deg, #1a1560 0%, #7c6af7 100%)",
            boxShadow: "0 4px 12px rgba(124,106,247,0.4)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #0f0c29 0%, #5b4fcf 100%)",
              boxShadow: "0 6px 16px rgba(124,106,247,0.5)",
            },
            "&.Mui-disabled": {
              background: "rgba(124,106,247,0.3)",
              color: "rgba(255,255,255,0.5)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommonDialog;