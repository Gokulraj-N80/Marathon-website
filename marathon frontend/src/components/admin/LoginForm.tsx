import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, ShieldAlert, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_dark_mode");
      return saved ? saved === "true" : true;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    
    let valid = true;
    if (!username) { setErrors(prev => ({ ...prev, username: "Username is required" })); valid = false; }
    if (!password) { setErrors(prev => ({ ...prev, password: "Password is required" })); valid = false; }
    if (!valid) return;

    setIsLoading(true);
    try {
      await onLogin(username, password);
    } catch (err: any) {
      setErrors({ password: err.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/5"
          onClick={() => {
            const nextVal = !darkMode;
            setDarkMode(nextVal);
            localStorage.setItem("admin_dark_mode", nextVal.toString());
          }}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl animate-float-gentle" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl animate-float-gentle" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl p-8 sm:p-10 overflow-hidden"
        >

          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary"
            >
              <ShieldAlert className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-3xl font-black text-slate-800 dark:text-white tracking-tight"
            >
              Admin Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-500 dark:text-white/60 mt-2"
            >
              Sign in to manage your marathon event
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-xs font-bold text-slate-400 dark:text-white/50 uppercase tracking-wider">Username</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: undefined })); }}
                  className="h-12 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 outline-none transition-all focus:bg-white dark:focus:bg-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  autoComplete="username"
                  autoFocus
                />
                {errors.username && (
                  <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-destructive">
                    {errors.username}
                  </motion.span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label className="text-xs font-bold text-slate-400 dark:text-white/50 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  className="h-12 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 pr-12 outline-none transition-all focus:bg-white dark:focus:bg-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
                {errors.password && (
                  <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-destructive">
                    {errors.password}
                  </motion.span>
                )}
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading || !username || !password}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full h-12 rounded-xl text-sm font-bold transition-all bg-primary hover:bg-primary-dark text-white",
                isLoading || !username || !password ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" /> Sign In
                </span>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10"
          >
            <p className="text-xs text-slate-400 dark:text-white/40 text-center">
              Demo credentials: <span className="font-mono text-slate-500 dark:text-white/60">admin</span> / <span className="font-mono text-slate-500 dark:text-white/60">password123</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}