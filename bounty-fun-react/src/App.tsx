import React, { useState } from 'react';
import './App.css';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { BountyData, CreateBountyData } from './types';
import { BountyCreation } from './BountyCreation';

// Landing Page Component
const LandingPage: React.FC = () => {
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

          <div style={{ marginTop: 24 }}>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
};

function computeTimeLeft(deadline: string): string {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  return days > 0 ? `${days}d left` : `${hours}h left`;
}

// Main Bounty Platform Component
const BountyPlatform: React.FC = () => {
  const { publicKey, disconnect } = useWallet();
  const walletAddress = publicKey ? publicKey.toBase58() : '';
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'submissions'>('all');

  
  const [bounties, setBounties] = useState<BountyData[]>([]);
  const [creating, setCreating] = useState(false);


  const totalBounties = bounties.length;
  const totalRewards = bounties.reduce((sum, bounty) => sum + bounty.reward, 0);
  const activeBounties = bounties.filter(bounty => bounty.status === 'open').length;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏆</span>
            <span className="logo-text">bounty.fun</span>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Profile</button>
            <button className="btn-primary" onClick={() => setCreating(true)}>
              <span>+</span>
              Create Bounty
            </button>
            <div className="user-id" onClick={disconnect}>
              <span className="wallet-icon">💎</span>
              {walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4)}
              <span className="disconnect-hint">Click to disconnect</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {creating ? (
          <BountyCreation
          open={creating}
          onClose={() => setCreating(false)}
          onCreate={(data: CreateBountyData) => {
            const newBounty = {
              ...data,
              id: Date.now().toString(),
              status: 'open' as const,
              author: walletAddress,
              timeLeft: computeTimeLeft(data.deadline),
            };
            setBounties([...bounties, newBounty]);
            setCreating(false);
          }}
          />
        ) : (
          <>
            <div className="stats-section">
              <div className="stats-card">
                <div className="stats-icon">🏆</div>
                <div className="stats-content">
                  <div className="stats-label">Total Bounties</div>
                  <div className="stats-value">{totalBounties}</div>
                </div>
              </div>
              <div className="stats-card">
                <div className="stats-icon">💰</div>
                <div className="stats-content">
                  <div className="stats-label">Total Rewards</div>
                  <div className="stats-value">{totalRewards.toFixed(2)} SOL</div>
                </div>
              </div>
              <div className="stats-card">
                <div className="stats-icon">👥</div>
                <div className="stats-content">
                  <div className="stats-label">Active Bounties</div>
                  <div className="stats-value">{activeBounties}</div>
                </div>
              </div>
            </div>

            <div className="tabs-section">
              <div className="tabs">
                <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                  All Bounties
                </button>
                <button className={`tab ${activeTab === 'my' ? 'active' : ''}`} onClick={() => setActiveTab('my')}>
                  My Bounties
                </button>
                <button className={`tab ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>
                  My Submissions
                </button>
              </div>

              <div className="bounties-grid">
                {bounties.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <h3 className="empty-title">No Bounties Available</h3>
                    <p className="empty-description">
                      Be the first to create a bounty or check back later for new opportunities.
                    </p>
                    <button className="btn-primary" onClick={() => setCreating(true)}>Create First Bounty</button>
                  </div>
                ) : (
                  bounties.map((bounty) => (
                    <div key={bounty.id} className="bounty-card">
                      <div className="bounty-header">
                        <h3 className="bounty-title">{bounty.title}</h3>
                        <span className={`status-badge ${bounty.status}`}>{bounty.status}</span>
                      </div>
                      <p className="bounty-description">{bounty.description}</p>

                      <div className="bounty-meta">
                        <div className="bounty-reward">
                          <span className="reward-icon">💰</span>
                          <span className="reward-amount">{bounty.reward} SOL</span>
                        </div>
                        <div className="bounty-time">
                          <span className="time-icon">⏰</span>
                          <span className="time-text">{bounty.timeLeft}</span>
                        </div>
                      </div>

                      <div className="bounty-footer">
                        <div className="bounty-tags">
                          <span className="tag">{bounty.category}</span>
                        </div>
                        <div className="bounty-author">
                          <span className="author-icon">👤</span>
                          <span className="author-text">by {bounty.author}</span>
                        </div>
                      </div>

                      {bounty.submissions && (
                        <div className="submissions-count">
                          <span className="submissions-icon">📄</span>
                          <span className="submissions-text">{bounty.submissions} submission</span>
                        </div>
                      )}

                      <button className="submit-btn">Submit Solution</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};


// Main App Component
function App() {
  const endpoint = 'https://api.mainnet-beta.solana.com';
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletGate />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function WalletGate() {
  const { publicKey } = useWallet();
  return publicKey ? <BountyPlatform /> : <LandingPage />;
}

export default App;