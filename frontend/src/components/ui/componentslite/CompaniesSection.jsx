// CompaniesSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// companies array
const companies = [
  { name: "Google", logo: "/logo.jpg", link: "https://careers.google.com" },
  { name: "Microsoft", logo: "/OIP.jpg", link: "https://careers.microsoft.com" },
  { name: "TCS", logo: "/logos/tcs.png", link: "https://www.tcs.com/careers" },
  { name: "Infosys", logo: "/logos/infosys.png", link: "https://www.infosys.com/careers" },
  { name: "Amazon", logo: "/logos/amazon.png", link: "https://www.amazon.jobs" },
  { name: "IBM", logo: "/logos/ibm.png", link: "https://www.ibm.com/careers" },
  { name: "Capgemini", logo: "/logos/capgemini.png", link: "https://www.capgemini.com/careers" },
];

const CompaniesSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
          Our Partner Companies
        </h2>

        {/* Unified Responsive View using Swiper across all screen sizes (with Autoplay for smooth infinite loop feel, falling back gracefully) */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
              1280: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="w-full py-2"
          >
            {companies.map((company) => (
              <SwiperSlide key={company.name} className="h-auto">
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 sm:p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-xl transition-all duration-300 transform hover:-translate-y-1 h-24 sm:h-28"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="max-h-10 sm:max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition duration-300" 
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;