import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import { useUserStore } from '../../store/userStore';
import './Auth.css';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Call backend to sync user
      const response = await fetch('https://apivoxcue.bkuteam.site/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync with backend');
      }
      
      const data = await response.json();
      
      // Save to Zustand store
      setUser({
        ...data.user,
        token: idToken
      });
      
      navigate('/app/projects');
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="logo-placeholder"></div>
          <h2>Welcome back</h2>
          <p>Sign in to continue to VoxCue Studio</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <div className="auth-body">
          <button 
            className="btn-google" 
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Email address</label>
              <input type="email" placeholder="you@example.com" disabled />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" disabled />
            </div>
            <button className="btn-primary" disabled>
              Sign In with Email
            </button>
          </form>
        </div>
        
        <div className="auth-footer">
          <p>Don't have an account? <span className="link" onClick={() => navigate('/auth/sign-up')}>Sign up</span></p>
        </div>
      </div>
    </div>
  );
}
