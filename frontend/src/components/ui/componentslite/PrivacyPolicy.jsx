import React from 'react';

const PrivacyPolicy = () => {
  // 🌟 CampusBridge Brand Colors (Consistent Blue & Orange Theme)
  const primaryBlue = "#2563EB";
  const accentOrange = "#FA4F09";

  return (
    <div className="bg-gray-50/70 min-h-screen text-gray-800 pt-20">
      
      {/* Header - Consistent with CampusBridge Branding */}
      <header className="bg-[#2563EB] text-white p-6 sm:p-8 shadow-md">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            CAMPUS <span className="text-[#FA4F09]">BRIDGE</span>
          </h1>
        </div>
      </header>

      {/* Privacy Policy Content Container */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 bg-white mt-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">Privacy Policy</h2>
        <p className="mb-8 text-xs sm:text-sm text-gray-500 font-medium">Effective Date: January 1, 2025</p>

        {/* 1. Information We Collect */}
        <section className="mb-8 p-4 sm:p-5 border-l-4 border-[#2563EB] bg-blue-50/40 rounded-r-xl">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#2563EB]">1. Information We Collect</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We may collect personal details such as your name, email, phone number, resume, job history, and browsing data.
          </p>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">2. How We Use Your Information</h3>
          <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>To provide job search and recruitment services</li>
            <li>To communicate with employers and job seekers</li>
            <li>To personalize job recommendations</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        {/* 3. Sharing of Information */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">3. Sharing of Information</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We may share your information with employers, service providers, or as required by law. We do not sell your data to third parties.
          </p>
        </section>

        {/* 4. Cookies & Tracking */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">4. Cookies & Tracking</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We use cookies to improve functionality, analyze traffic, and personalize your experience. You may disable cookies in your browser settings.
          </p>
        </section>

        {/* 5. Data Retention & Security */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">5. Data Retention & Security</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Your data is retained while your account is active. We implement security measures but cannot guarantee absolute protection.
          </p>
        </section>

        {/* 6. Your Rights */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">6. Your Rights</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            You may request access, update, or deletion of your personal data by contacting us at 
            <a href="mailto:support@campusbridge.com" className="text-[#2563EB] hover:text-[#1D4ED8] underline ml-1 font-medium">support@campusbridge.com</a>.
          </p>
        </section>

        {/* 7. Changes to This Policy */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">7. Changes to This Policy</h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We may update this Privacy Policy occasionally. Updates will be posted on this page.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">8. Contact Us</h3>
          <p className="text-sm sm:text-base text-gray-700 mb-2">If you have questions, reach us at:</p>
          <div className="space-y-1 text-sm sm:text-base text-gray-700">
            <p>Email: <a href="mailto:support@campusbridge.com" className="text-[#2563EB] hover:text-[#1D4ED8] underline font-medium">support@campusbridge.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business St, New York, NY, USA</p>
          </div>
        </section>
      </main>
      
      {/* Footer - Consistent Branding */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12 text-sm">
        <p>© 2026 Campus Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;