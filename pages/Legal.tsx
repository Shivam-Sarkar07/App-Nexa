import React from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  view: 'PRIVACY' | 'TERMS' | 'DISCLAIMER';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ view, onBack }) => {
  const content = {
    PRIVACY: {
      title: 'Privacy Policy',
      icon: <Shield size={24} className="text-green-400" />,
      text: (
        <>
          <p>Last updated: October 2023</p>
          <br />
          <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, update your profile, or request customer support.</p>
          <br />
          <h3 className="text-white font-bold mb-2">2. How We Use Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, such as to personalize your experience and provide relevant app recommendations.</p>
          <br />
          <h3 className="text-white font-bold mb-2">3. Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
          <br />
          <h3 className="text-white font-bold mb-2">4. Third-Party Services</h3>
          <p>Our service may contain links to third-party web apps. We are not responsible for the privacy practices or content of such third parties.</p>
        </>
      )
    },
    TERMS: {
      title: 'Terms of Service',
      icon: <FileText size={24} className="text-blue-400" />,
      text: (
        <>
          <p>Last updated: October 2023</p>
          <br />
          <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
          <p>By accessing or using AppVault, you agree to be bound by these Terms of Service.</p>
          <br />
          <h3 className="text-white font-bold mb-2">2. Use of Service</h3>
          <p>You may use our service only for lawful purposes and in accordance with these Terms.</p>
          <br />
          <h3 className="text-white font-bold mb-2">3. User Accounts</h3>
          <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>
          <br />
          <h3 className="text-white font-bold mb-2">4. Termination</h3>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.</p>
        </>
      )
    },
    DISCLAIMER: {
      title: 'Disclaimer',
      icon: <AlertCircle size={24} className="text-yellow-400" />,
      text: (
        <>
          <p>The information provided by AppVault is for general guidance on matters of interest only.</p>
          <br />
          <h3 className="text-white font-bold mb-2">1. No Warranties</h3>
          <p>This service is provided "as is," with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information.</p>
          <br />
          <h3 className="text-white font-bold mb-2">2. Third-Party Apps</h3>
          <p>AppVault acts as a discovery platform. We do not own, develop, or directly control the third-party web applications listed on our platform.</p>
          <br />
          <h3 className="text-white font-bold mb-2">3. Limitation of Liability</h3>
          <p>In no event will AppVault, or its partners, agents or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in this service.</p>
        </>
      )
    }
  };

  const currentContent = content[view];

  return (
    <div className="flex flex-col min-h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-[#030014]/90 backdrop-blur-md z-20 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">{currentContent.title}</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-white/5 border border-white/10">
            {currentContent.icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{currentContent.title}</h2>
        </div>

        <div className="text-slate-300 text-sm leading-relaxed space-y-2">
          {currentContent.text}
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-slate-500">
            &copy; 2023 AppVault Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};