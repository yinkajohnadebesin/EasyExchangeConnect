import React from "react";

const FilterBar = ({ filters, setFilters, universities }) => {
  const handleReset = () => {
    setFilters({
      university: "",
      status: "",
      date: "",
      sort: "desc",
    });
  };

  return (
    <div className="w-full px-4 md:px-10 mt-8">
      <div className="bg-white rounded-xl shadow-lg py-4 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block font-medium mb-1">Filter by University:</label>
            <select
              value={filters.university}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, university: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded h-[42px] appearance-none"
            >
              <option value="">All Universities</option>
              {universities.map((uni) => (
                <option key={uni.University_ID} value={uni.University_Name}>
                  {uni.University_Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Filter by Status:</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded h-[42px] appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Submitted On or Before:</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded h-[42px] mt-[2px]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Sort by:</label>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sort: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded h-[42px] appearance-none"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <div className="flex justify-start md:justify-end">
            <button
              onClick={handleReset}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              style={{ height: "42px" }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
