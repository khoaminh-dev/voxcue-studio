import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import { useUserStore } from '../../store/userStore';
import './Auth.css';

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Call backend to sync user (Login automatically creates user if not exists)
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
      
      setUser({
        ...data.user,
        token: idToken
      });
      
      navigate('/app/projects');
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="logo-placeholder"></div>
          <h2>Create an account</h2>
          <p>Join VoxCue Studio today</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <div className="auth-body">
          <button 
            className="btn-google" 
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            {loading ? 'Signing up...' : 'Sign up with Google'}
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="John Doe" disabled />
            </div>
            <div className="input-group">
              <label>Email address</label>
              <input type="email" placeholder="you@example.com" disabled />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" disabled />
            </div>
            <button className="btn-primary" disabled>
              Sign Up with Email
            </button>
          </form>
        </div>
        
        <div className="auth-footer">
          <p>Already have an account? <span className="link" onClick={() => navigate('/auth/sign-in')}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
}
