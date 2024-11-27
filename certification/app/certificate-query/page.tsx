// app/certificate-query/page.tsx
import React from 'react';
import CertificateQuery from '../components/CertificateQuery';

const CertificateQueryPage = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CertificateQuery />
          </div>
        </div>
      );
};

export default CertificateQueryPage;
