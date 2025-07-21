import React from 'react';
import './App.css';


// Landing Page Component
const LandingPage: React.FC<{ onConnectWallet: () => void }> = ({ onConnectWallet }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero-section">
          <div className="hero-icon">🏆</div>
          <h1 className="hero-title">bounty.fun</h1>
          <p className="hero-subtitle">Find, solve, and earn on Solana.</p>
          <p className="hero-description">
            Browse real bounties, show off your skills, and get paid in SOL. Connect your wallet to get started.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Fast Payouts</h3>
              <p className="feature-description">Complete tasks and receive SOL instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Grow Your Reputation</h3>
              <p className="feature-description">Build a public profile and earn trust in the Solana community.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Open & Transparent</h3>
              <p className="feature-description">All bounties and payments are on-chain.</p>
            </div>
          </div>

          <button className="connect-wallet-btn" onClick={onConnectWallet}>
            <span className="wallet-icon">🔗</span>
            Connect Wallet & Start Earning
          </button>
        </div>
      </div>
    </div>
  );
};

// App Component
const App: React.FC = () => {
  const handleConnectWallet = () => {
    // Placeholder for wallet connection logic
    alert('Connect wallet clicked!');
  };
  return <LandingPage onConnectWallet={handleConnectWallet} />;
};

export default App;