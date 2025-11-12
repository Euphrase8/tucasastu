// src/components/admin/SessionTimeoutModal.tsx
import { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from "@mui/material";
import { Lock, Refresh, Logout } from "@mui/icons-material";
import axios from "axios";
import { getRefreshToken } from "@/services/login";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SessionTimeoutModal: React.FC<Props> = ({ open, onClose }) => {
  const [seconds, setSeconds] = useState(60);

  // ---- countdown -------------------------------------------------
  useEffect(() => {
    if (!open) {
      setSeconds(60);
      return;
    }
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          handleLogout();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  // ---- extend ----------------------------------------------------
  const handleExtend = async () => {
    try {
      const refresh = getRefreshToken();
      if (!refresh) throw new Error("no refresh token");

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
        { refresh_token: refresh }
      );

      localStorage.setItem("token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
      onClose();
    } catch {
      handleLogout();
    }
  };

  // ---- logout ----------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Lock sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />

        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 600, p: 0 }}>
          Session Expired
        </DialogTitle>

        <DialogContent sx={{ p: 0, mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            For security, your session has timed out.
          </Typography>

          <Typography variant="h3" sx={{ mt: 3, fontWeight: 700, color: "#d32f2f" }}>
            {seconds}s
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Auto logout in {seconds} seconds
          </Typography>
        </DialogContent>

        <DialogActions sx={{ mt: 4, justifyContent: "center", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleExtend}
            sx={{ minWidth: 180, py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            Extend Session
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              minWidth: 180,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              bgcolor: "#d32f2f",
              "&:hover": { bgcolor: "#b71c1c" },
            }}
          >
            Re-Login Now
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};