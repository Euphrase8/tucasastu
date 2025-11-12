// src/components/SessionTimeoutProvider.tsx
import { useEffect, useState } from "react";
import { SessionTimeoutModal } from "@/components/admin/SessionTimeoutModal";

export const SessionTimeoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("sessionExpired", handler);
    return () => window.removeEventListener("sessionExpired", handler);
  }, []);

  return (
    <>
      {children}
      <SessionTimeoutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};