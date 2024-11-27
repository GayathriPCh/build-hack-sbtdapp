// app/ownership-checker/page.tsx
import React from 'react';
import OnChainCertification from '../components/OnChainCertification';

const OnChainCertificationPage = () => {
  return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <OnChainCertification />
        </div>
      </div>
  );
};

export default OnChainCertificationPage;
