"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLoginModalProps {
  show: boolean;
  onClose: () => void;
  adminMode: boolean;
  onLogin: (password: string) => void;
  onLogout: () => void;
}

export function AdminLoginModal({
  show,
  onClose,
  adminMode,
  onLogin,
  onLogout,
}: AdminLoginModalProps) {
  const [adminPassword, setAdminPassword] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(adminPassword);
    setAdminPassword("");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-canvas/90 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            className="w-full max-w-[360px] bg-canvas border border-charcoal p-6 rounded-none flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-ash uppercase tracking-widest">SYSTEM SECURITY</span>
              <h3 className="font-sans font-extrabold text-2xl uppercase tracking-tight">
                {adminMode ? "DISCONNECT ADMIN" : "ADMIN GATEWAY"}
              </h3>
            </div>

            {adminMode ? (
              <div className="flex flex-col gap-4">
                <p className="font-sans text-xs text-ash leading-relaxed">
                  You are authenticated. Deactivating will lock writing permissions to JSON config files.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={onClose}
                    className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                  >
                    CLOSE
                  </button>
                  <button 
                    onClick={onLogout}
                    className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-ash uppercase tracking-widest">ACCESS KEY</label>
                  <input 
                    type="password"
                    placeholder="ENTER KEY..."
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="w-full bg-canvas border border-charcoal p-3 text-base md:text-sm text-purewhite rounded-none focus:outline-none focus:border-accent font-mono uppercase tracking-widest placeholder:text-ash/30 min-h-[48px]"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border border-charcoal font-mono text-xs text-ash hover:text-accent transition-colors rounded-none min-h-[48px]"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-purewhite text-canvas font-mono font-bold text-xs hover:bg-ash hover:text-canvas transition-colors rounded-none min-h-[48px]"
                  >
                    AUTHORIZE
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
