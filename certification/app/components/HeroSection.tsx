// app/components/HeroSection.tsx
'use client'
// app/components/HeroSection.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
const HeroSection = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/on-chain-certification');
  };
  return (
    <div className="hero-container">
      <div className="hero-banner">
        <h1 className="hero-title">Welcome to the SBT Certification System</h1>
        <p className="hero-subtitle">A decentralized platform for verifying and managing on-chain certifications.</p>
        <button className="hero-button" onClick={handleButtonClick}>Connect Wallet and Verify Your Token</button>
      </div>

      <div className="section-title">
      </div>

      <div className="feature-section">
        <div className="image-container">
          <img
            src="https://ghost.zelta.io/content/images/2023/03/image-65.png"
            alt="Soulbound Token Image"
            className="feature-image"
          />
        </div>
        <div className="text-container">
          <div className="sbt-info-container">
            <h3 className="sbt-title">What are Soulbound Tokens?</h3>
            <p className="sbt-description">
              Soulbound tokens (SBTs) are a new type of non-transferable token. These tokens are unique to an individual, representing their identity, achievements, or specific verifiable records on the blockchain.
            </p>
          </div>
          <div className="sbt-info-container">
            <h3 className="sbt-title">Why SBTs Matter?</h3>
            <p className="sbt-description">
              SBTs allow individuals to prove their identity or accomplishments in a secure, decentralized way. They are non-transferable, ensuring that only the rightful owner can hold and showcase them.
            </p>
          </div>
        </div>
      </div>

      <div className="restriction-notice">
        <h3>Transfer Restrictions</h3>
        <p>Soulbound Tokens (SBTs) are non-transferable by design. Any attempt to transfer an SBT will fail. These tokens are permanently bound to the address they were minted to, ensuring the authenticity and non-transferability of the certification they represent.</p>
      </div>

      <style jsx>{`
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .hero-banner {
          background: linear-gradient(135deg, #258054, #1a1a1a);
          text-align: center;
          padding: 80px 20px;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          color: white;
        }
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #258054, #00b894);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-family: 'Audiowide', sans-serif;
        }
        .hero-subtitle {
          font-size: 1.5rem;
          font-family: 'Gameplay', sans-serif;
          margin-bottom: 30px;
          color: #b0b0b0;
        }
        .hero-button {
        font-family: 'Sp', sans-serif;
          background: linear-gradient(45deg, #258054, #00b894);
          color: white;
          padding: 12px 40px;
          font-size: 1.25rem;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .hero-button:hover {
          transform: scale(1.05);
          background: linear-gradient(45deg, #1d6e47, #00a074);
        }
        .section-title {
          text-align: center;
          margin-top: 60px;
          margin-bottom: 40px;
        }
        .section-title h2 {
        font-family: 'Gameplay', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .feature-section {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-top: 60px;
        }

        .image-container {
          flex: 1;
        }

        .feature-image {
          width: 100%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .text-container {
          flex: 1;
        }

        .sbt-info-container {
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .sbt-title {
        font-family: 'Gameplay', sans-serif;
          font-size: 1.5rem;
          color: #258054;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .sbt-description {
        font-family: 'Sp', sans-serif;
          font-size: 1.125rem;
          color: #d1d1d1;
        }

        .restriction-notice {
        font-family: 'Gameplay', sans-serif;
          background-color: #121212;
          padding: 40px;
          border-radius: 15px;
          margin-top: 60px;
          text-align: center;
        }

        .restriction-notice h3 {
        font-family: 'Gameplay', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #ff4757;
        }

        .restriction-notice p {
        font-family: 'Sp', sans-serif;
          font-size: 1.125rem;
          color: #d1d1d1;
        }
          @media (max-width: 768px) {
  .hero-banner {
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-button {
    font-size: 1rem;
    padding: 10px 30px;
  }

  .feature-section {
    flex-direction: column;
    text-align: center;
  }

  .image-container, .text-container {
    width: 100%;
  }

  .feature-image {
    width: 90%;
    margin: 0 auto;
  }

  .sbt-info-container {
    padding: 15px;
  }

  .sbt-title {
    font-size: 1.25rem;
  }

  .sbt-description {
    font-size: 1rem;
  }

  .restriction-notice {
    padding: 20px;
  }

  .restriction-notice h3 {
    font-size: 1.5rem;
  }

  .restriction-notice p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-button {
    font-size: 0.875rem;
    padding: 8px 20px;
  }

  .sbt-description {
    font-size: 0.875rem;
  }

  .restriction-notice p {
    font-size: 0.875rem;
  }
}

      `}</style>
    </div>
  );
};

export default HeroSection;
