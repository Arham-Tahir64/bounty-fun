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
          <p className="hero-subtitle">Solana Bounty Platform</p>
          <p className="hero-description">
            Discover exciting bounties, showcase your skills, and earn SOL rewards.
            Connect your wallet to get started and join the decentralized workforce.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Earn SOL Rewards</h3>
              <p className="feature-description">Complete bounties and get paid in SOL directly to your wallet</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Build Your Portfolio</h3>
              <p className="feature-description">Showcase your work and build credibility in the Solana ecosystem</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Decentralized Platform</h3>
              <p className="feature-description">Transparent, trustless bounty system powered by Solana blockchain</p>
            </div>
          </div>

          <button className="connect-wallet-btn" onClick={onConnectWallet}>
            <span className="wallet-icon">🔗</span>
            Connect Wallet to Continue
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