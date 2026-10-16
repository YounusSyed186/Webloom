'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { useApp } from '@/lib/context/app-context';
import { Mail, Lock, User, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { validateUsername } from '@/lib/validation';
import { WebloomFlowerLogo } from '@/components/ui/webloom-logo';

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

  const { login, signup } = useApp();
  const { success, error } = useToast();

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    try {
      // Login with demo account or initialize
      await login('demo@webloom.site', 'demo123456');
      success('Logged in as Demo User!', 'Welcome to your Webloom dashboard.');
      onClose();
      router.push('/dashboard');
    } catch (err: any) {
      // If user doesn't exist, create demo account
      try {
        await signup('demo@webloom.site', 'demo123456', 'demo', 'Demo Creator');
        success('Demo account ready!', 'Welcome to your Webloom dashboard.');
        onClose();
        router.push('/dashboard');
      } catch (innerErr: any) {
        error(innerErr.message || 'Error creating demo session.');
      }
    } finally {
      setLoading(false);
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
        router.push('/dashboard');
      } else {
        await login(email, password);
        success('Signed in successfully!', 'Welcome back to your Webloom.');
        onClose();
        router.push('/dashboard');
      }
    } catch (err: any) {
      error(err.message || 'Authentication error. Please try again.');
    } finally {
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
      className="p-6 bg-[#0D0F12] border border-white/[0.1] text-[#F4F3F0]"
    >
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-xl border border-white/[0.12] mx-auto mb-3 shadow-lg shadow-[#9B6BFF]/15 flex items-center justify-center bg-[#12141A]">
          <WebloomFlowerLogo className="w-8 h-8" />
        </div>
        <h2 className="text-[20px] font-medium text-[#F4F3F0] tracking-tight">
          {mode === 'signup' ? 'Create your Webloom' : mode === 'forgot' ? 'Reset Password' : 'Sign in to Webloom'}
        </h2>
        <p className="text-[13px] text-[#A6A7AE] font-light mt-1">
          {mode === 'signup' 
            ? 'Claim your digital identity and build your personal space' 
            : mode === 'forgot' 
            ? 'Enter your email to receive recovery instructions' 
            : 'Access your links, projects, analytics, and theme studio'}
        </p>
      </div>

      {/* ⚡ Instant 1-Click Demo Login Button */}
      <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-[#161324] to-[#12141A] border border-[#A78BFA]/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#A78BFA] uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#A78BFA]" />
            TESTING CREDENTIALS
          </span>
          <button
            type="button"
            onClick={fillDemoCreds}
            className="text-[11px] font-mono text-[#E9E1D5] hover:underline"
          >
            Auto-fill form
          </button>
        </div>
        <div className="text-[12px] font-mono text-[#A6A7AE] space-y-0.5">
          <div>Email: <strong className="text-[#F4F3F0] font-normal">demo@webloom.site</strong></div>
          <div>Password: <strong className="text-[#F4F3F0] font-normal">demo123456</strong></div>
        </div>
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          disabled={loading}
          className="w-full mt-2 py-2 rounded-lg bg-[#A78BFA] text-[#08090B] hover:bg-[#b89eff] font-medium text-[13px] flex items-center justify-center gap-2 transition-colors"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>1-Click Instant Demo Login</span>
        </button>
      </div>

      <div className="relative flex py-2 items-center mb-4">
        <div className="flex-grow border-t border-white/[0.06]" />
        <span className="flex-shrink mx-3 text-[11px] font-mono text-[#6F7179] uppercase">Or continue with email</span>
        <div className="flex-grow border-t border-white/[0.06]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'signup' && (
          <>
            <Input
              label="Display Name"
              placeholder="e.g. Younus"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              leftIcon={<User className="w-4 h-4 text-[#A6A7AE]" />}
            />
            <Input
              label="Username (Public Link)"
              placeholder="younus"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              leftIcon={<span className="text-[#6F7179] font-mono text-[13px]">@</span>}
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
          leftIcon={<Mail className="w-4 h-4 text-[#A6A7AE]" />}
        />

        {mode !== 'forgot' && (
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4 text-[#A6A7AE]" />}
          />
        )}

        {mode === 'signin' && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-[12px] font-mono text-[#A78BFA] hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-2 bg-[#F4F3F0] text-[#08090B] hover:bg-white text-[14px] font-medium"
          isLoading={loading}
        >
          {mode === 'signup' ? 'Create Account' : mode === 'forgot' ? 'Send Reset Link' : 'Sign In to Webloom'}
        </Button>
      </form>

      <div className="text-center pt-4 mt-4 border-t border-white/[0.06] text-[13px] text-[#A6A7AE]">
        {mode === 'signup' ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signin')}
              className="text-[#A78BFA] hover:underline font-medium ml-1"
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
              className="text-[#A78BFA] hover:underline font-medium ml-1"
            >
              Create one for free
            </button>
          </p>
        )}
      </div>
    </Dialog>
  );
}
