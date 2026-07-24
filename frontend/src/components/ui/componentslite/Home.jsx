import React, { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import LatestsJob from "./LatestsJob";
import Footer from "./Footer";
import CompaniesSection from "./CompaniesSection";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden">
      {/* Header with Search */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 py-8 sm:py-12">
        <Categories />
        <CompaniesSection />
        <LatestsJob searchTerm={searchTerm} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;