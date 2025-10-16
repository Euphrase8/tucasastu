import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionExpiredModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const SessionExpiredModal = ({ open, onClose, onLogin }: SessionExpiredModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-sm p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Session Expired</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Your session has expired. Please log in again to continue.</p>
          <div className="flex justify-center gap-2">
            <Button onClick={onLogin}>Login Again</Button>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
