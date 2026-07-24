import React, { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Pune", "Jaipur", "Ahmedabad", "Lucknow", "Chandigarh", "Surat", "Remote"]
  },
  {
    filterType: "Industry",
    array: ["IT", "Finance", "Marketing", "Healthcare", "Education", "Manufacturing"]
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"]
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50-100k", "100-200k", "200k+"]
  }
];

const FilterCards = ({ selectedFilters = {}, setSelectedFilters }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (filterType) => {
    setCollapsedSections(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  const activeFiltersCount = Object.values(selectedFilters).filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" /> Filter Jobs
        </h2>
        {activeFiltersCount > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 scrollbar-thin">
        {filterData.map((data) => {
          const keyName = data.filterType.toLowerCase();
          const isCollapsed = collapsedSections[data.filterType];

          return (
            <div key={data.filterType} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div 
                onClick={() => toggleSection(data.filterType)}
                className="flex items-center justify-between cursor-pointer py-1 select-none"
              >
                <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
                  {data.filterType}
                  {selectedFilters[keyName] && (
                    <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </h3>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`} />
              </div>

              {!isCollapsed && (
                <div className="mt-3 space-y-2.5">
                  {data.array.map((item) => {
                    const isChecked = selectedFilters[keyName] === item;
                    return (
                      <label 
                        key={item} 
                        className={`flex items-center space-x-3 text-sm cursor-pointer p-1.5 rounded-lg transition-colors ${isChecked ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <input
                          type="radio"
                          name={data.filterType}
                          value={item}
                          checked={isChecked}
                          onChange={() =>
                            setSelectedFilters({
                              ...selectedFilters,
                              [keyName]: item,
                            })
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="truncate">{item}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </span>
          <span className="text-xs text-blue-600 font-semibold">Open Filters</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button 
                onClick={() => setIsOpenMobile(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <FilterContent />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsOpenMobile(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Card */}
      <div className="hidden lg:block w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
        <FilterContent />
      </div>
    </>
  );
};

export default FilterCards;