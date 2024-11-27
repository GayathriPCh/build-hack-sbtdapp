// app/certificate-query/page.tsx
import React from 'react';
import TransferRestriction from '../components/TransferRestriction';

const TransferRestrictionPage = () => {
  return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TransferRestriction />
        </div>
      </div>
  );
};

export default TransferRestrictionPage;
