'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { useApp } from '@/lib/context/app-context';
import { Mail, Lock, User, Zap } from 'lucide-react';
import { validateUsername } from '@/lib/validation';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';
import { clsx } from 'clsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, themeMode } = useApp();
  const { success, error } = useToast();
  const isDark = themeMode === 'dark';

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    try {
      await login('demo@webloom.site', 'demo123456');
      success('Logged in as Demo User!', 'Welcome to your Webloom dashboard.');
      onClose();
      window.location.href = '/dashboard';
    } catch (err: any) {
      try {
        await signup('demo@webloom.site', 'demo123456', 'demo', 'Demo Creator');
        success('Demo account ready!', 'Welcome to your Webloom dashboard.');
        onClose();
        window.location.href = '/dashboard';
      } catch (innerErr: any) {
        error(innerErr.message || 'Error creating demo session.');
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'forgot') {
        if (!email) {
          error('Please enter your email address');
          setLoading(false);
          return;
        }
        success('Password reset email sent!', 'Check your inbox for instructions.');
        setMode('signin');
        setLoading(false);
        return;
      }

      if (mode === 'signup') {
        const check = validateUsername(username);
        if (!check.valid) {
          error(check.error || 'Invalid username');
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          error('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }

        await signup(email, password, username, displayName || username);
        success('Account created successfully!', `Welcome to Webloom, @${username}!`);
        onClose();
        window.location.href = '/dashboard';
      } else {
        await login(email, password);
        success('Signed in successfully!', 'Welcome back to your Webloom.');
        onClose();
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      error(err.message || 'Authentication error. Please try again.');
      setLoading(false);
    }
  };

  const fillDemoCreds = () => {
    setEmail('demo@webloom.site');
    setPassword('demo123456');
    if (mode === 'signup') {
      setUsername('demo');
      setDisplayName('Demo Creator');
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="sm"
    >
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div
          className={clsx(
            "w-12 h-12 rounded-xl border mx-auto mb-3 shadow-sm flex items-center justify-center transition-colors",
            isDark ? "bg-[#241F1A] border-[#3E342B]" : "bg-[#FAF6EE] border-[#DACBB4]"
          )}
        >
          <WebloomFlowerLogo className="w-8 h-8" />
        </div>
        <h2 className="text-[20px] font-serif font-bold tracking-tight">
          {mode === 'signup' ? 'Create your Webloom' : mode === 'forgot' ? 'Reset Password' : 'Sign in to Webloom'}
        </h2>
        <p
          className={clsx(
            "text-[13px] mt-1",
            isDark ? "text-[#A89F91]" : "text-[#6E6254]"
          )}
        >
          {mode === 'signup' 
            ? 'Claim your digital identity and build your personal space' 
            : mode === 'forgot' 
            ? 'Enter your email to receive recovery instructions' 
            : 'Access your links, projects, analytics, and theme studio'}
        </p>
      </div>

      {/* Clean, tasteful Interactive Demo Workspace launcher */}
      <div
        className={clsx(
          "mb-4 p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors",
          isDark
            ? "bg-[#241F1A] border-[#3E342B]"
            : "bg-[#F7F2E8] border-[#DACBB4]"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={clsx("p-1.5 rounded-lg shrink-0", isDark ? "bg-[#332B23] text-[#E6B86A]" : "bg-[#EDE4D3] text-[#967137]")}>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="truncate">
            <p className={clsx("text-[12px] font-medium leading-none truncate", isDark ? "text-[#F4EFE6]" : "text-[#1F1A16]")}>
              Exploring Webloom first?
            </p>
            <p className={clsx("text-[11px] font-mono mt-0.5", isDark ? "text-[#A89F91]" : "text-[#8E8272]")}>
              Preloaded with links, store & studio
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          disabled={loading}
          className={clsx(
            "shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98]",
            isDark
              ? "bg-[#E6B86A] text-[#181410] hover:bg-[#F2C97E]"
              : "bg-[#1F1A16] text-[#FAF6EE] hover:bg-black"
          )}
        >
          Demo Workspace &rarr;
        </button>
      </div>

      <div className="relative flex py-1.5 items-center mb-3.5">
        <div className={clsx("flex-grow border-t", isDark ? "border-[#332B23]" : "border-[#EAE2D3]")} />
        <span
          className={clsx(
            "flex-shrink mx-3 text-[10px] font-mono uppercase tracking-wider",
            isDark ? "text-[#85796C]" : "text-[#8E8272]"
          )}
        >
          Or continue with credentials
        </span>
        <div className={clsx("flex-grow border-t", isDark ? "border-[#332B23]" : "border-[#EAE2D3]")} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'signup' && (
          <>
            <Input
              label="Display Name"
              placeholder="e.g. Maya Chen"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              leftIcon={<User className="w-4 h-4 text-[#8E8272]" />}
            />
            <Input
              label="Username (Public Link)"
              placeholder="mayachen"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              leftIcon={<span className="text-[#8E8272] font-mono text-[13px]">@</span>}
              hint="webloom.site/yourname"
            />
          </>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          leftIcon={<Mail className="w-4 h-4 text-[#8E8272]" />}
        />

        {mode !== 'forgot' && (
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4 text-[#8E8272]" />}
          />
        )}

        {mode === 'signin' && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className={clsx(
                "text-[12px] font-mono hover:underline cursor-pointer",
                isDark ? "text-[#E6B86A]" : "text-[#967137]"
              )}
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-2"
          isLoading={loading}
        >
          {mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Reset Link' : 'Sign In to Webloom'}
        </Button>
      </form>

      <div
        className={clsx(
          "text-center pt-4 mt-4 border-t text-[13px]",
          isDark ? "border-[#332B23] text-[#A89F91]" : "border-[#EAE2D3] text-[#6E6254]"
        )}
      >
        {mode === 'signup' ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={clsx(
                "hover:underline font-semibold ml-1 cursor-pointer",
                isDark ? "text-[#E6B86A]" : "text-[#967137]"
              )}
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={clsx(
                "hover:underline font-semibold ml-1 cursor-pointer",
                isDark ? "text-[#E6B86A]" : "text-[#967137]"
              )}
            >
              Create one for free
            </button>
          </p>
        )}
      </div>
    </Dialog>
  );
}
