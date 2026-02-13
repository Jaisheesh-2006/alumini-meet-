import { useScrollAnimation } from "../hooks/useScrollAnimation";
import React, { useMemo, useState } from "react";
import { Search, Edit } from "lucide-react";
import Select, { type StylesConfig } from "react-select";
import UpdateDetailsDialog from "./UpdateDetailsDialog";
import { useLocationAPI, type SelectOption } from "../hooks/useLocationAPI";

interface Alumni {
  name: string;
  rollNumber: string;
  department?: string;
  yearOfGraduation?: number;
  lastOrganization?: string;
  currentLocationIndia?: string;
  currentOverseasLocation?: string;
  batch?: string;
  gender?: string;
  yearOfEntry?: number;
  programName?: string;
  specialization?: string;
  lastPosition?: string;
  natureOfJob?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  hostels?: string;
  higherStudies?: string;
  startup?: string;
  achievements?: string;
  photoLink?: string;
}

const rawUrl = import.meta.env.VITE_DATABASE_URL || "";
const DATABASE_URL = rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`;

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1f2937",
    borderColor: state.isFocused ? "#6b7280" : "#374151",
    minHeight: "48px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#6b7280",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#111827",
    border: "1px solid #374151",
    zIndex: 60,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#374151" : "#111827",
    color: "#f3f4f6",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#f3f4f6",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
  input: (base) => ({
    ...base,
    color: "#f3f4f6",
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": { color: "#f3f4f6" },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#9ca3af",
    "&:hover": { color: "#f3f4f6" },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const Network: React.FC = () => {
  const selectPortalTarget =
    typeof document !== "undefined" ? document.body : null;

  const headerRef = useScrollAnimation({ yStart: 50, opacityStart: 0 });
  const searchRef = useScrollAnimation({
    yStart: 80,
    opacityStart: 0,
    delay: 0.2,
  });
  const [nameQuery, setNameQuery] = useState("");
  const [rollQuery, setRollQuery] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [yearOfEntryQuery, setYearOfEntryQuery] = useState<SelectOption | null>(
    null,
  );
  const [countryQuery, setCountryQuery] = useState<SelectOption | null>(null);
  const [cityQuery, setCityQuery] = useState<SelectOption | null>(null);
  const [natureOfJobQuery, setNatureOfJobQuery] = useState<SelectOption | null>(
    null,
  );
  const [programNameQuery, setProgramNameQuery] = useState<SelectOption | null>(
    null,
  );
  const [specializationQuery, setSpecializationQuery] =
    useState<SelectOption | null>(null);
  const [results, setResults] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const { countries, cities, loadingCountries, loadingCities } =
    useLocationAPI(countryQuery);

  const yearOfEntryOptions = useMemo<SelectOption[]>(() => {
    const startYear = 1998;
    const endYear = 2026;
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: String(year), label: String(year) };
    });
  }, []);

  const natureOfJobOptions = useMemo<SelectOption[]>(
    () =>
      [
        "Academia",
        "Banking",
        "Career Break",
        "Corporate",
        "Deceased",
        "Entrepreneur",
        "Freelance",
        "Global",
        "Government",
      ].map((option) => ({ value: option, label: option })),
    [],
  );

  const programNameOptions = useMemo<SelectOption[]>(
    () =>
      [
        "BCS",
        "BIT",
        "MBA",
        "MTECH",
        "IPG",
        "PGDIT",
        "PGDMIT",
        "PHD",
        "DSC",
      ].map((option) => ({ value: option, label: option })),
    [],
  );

  const specializationOptions = useMemo<SelectOption[]>(
    () =>
      [
        "AN",
        "BA",
        "BI",
        "CN",
        "DC",
        "ICS",
        "IFS",
        "IMG",
        "IMT",
        "IS",
        "ISM",
        "IT+MBA",
        "ITES",
        "MBA",
        "MTECH",
        "NFSPAM",
        "PAMF",
        "PIT",
        "PMGF",
        "PSM",
        "SE",
        "VLSI",
        "WNC",
      ].map((option) => ({ value: option, label: option })),
    [],
  );

  const clearAllFilters = () => {
    setNameQuery("");
    setRollQuery("");
    setCompanyQuery("");
    setYearOfEntryQuery(null);
    setCountryQuery(null);
    setCityQuery(null);
    setNatureOfJobQuery(null);
    setProgramNameQuery(null);
    setSpecializationQuery(null);
  };

  const handleSearch = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (nameQuery) params.append("name", nameQuery);
      if (rollQuery) params.append("rollNumber", rollQuery);
      if (companyQuery) params.append("company", companyQuery);
      if (yearOfEntryQuery?.value)
        params.append("yearOfEntry", yearOfEntryQuery.value);
      if (natureOfJobQuery?.value)
        params.append("natureOfJob", natureOfJobQuery.value);
      if (programNameQuery?.value)
        params.append("programName", programNameQuery.value);
      if (specializationQuery?.value)
        params.append("specialization", specializationQuery.value);
      if (countryQuery?.label) params.append("country", countryQuery.label);
      if (cityQuery?.label) params.append("city", cityQuery.label);
      params.append("page", page.toString());
      params.append("limit", pageSize.toString());

      const url = DATABASE_URL + `api/search?${params.toString()}`;

      // Add timeout for slow network/cold starts
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout for cold starts

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      const contentType = res.headers.get("content-type") || "";
      const isJsonResponse = contentType.includes("application/json");

      if (!isJsonResponse) {
        throw new Error(
          "Search API returned non-JSON response. Check VITE_DATABASE_URL and ensure it points to backend (e.g., http://localhost:3001).",
        );
      }

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const { data, totalCount: total, hasMore: more } = await res.json();
      const sortedData = (Array.isArray(data) ? data : []).sort(
        (a: Alumni, b: Alumni) =>
          (a.yearOfEntry ?? Number.MAX_SAFE_INTEGER) -
          (b.yearOfEntry ?? Number.MAX_SAFE_INTEGER),
      );
      setResults(sortedData);
      setCurrentPage(page);
      setTotalCount(total || 0);
      setHasMore(more || false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError(
          "Request timed out. The server may be starting up, please try again.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred during search",
        );
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      handleSearch(currentPage + 1);
    }
  };

  const handleApplyAdvancedFilters = () => {
    setIsAdvancedFiltersOpen(false);
    handleSearch(1);
  };

  const handleClearAllFromAdvanced = () => {
    clearAllFilters();
    setIsAdvancedFiltersOpen(false);
    setHasSearched(false);
    setResults([]);
    setCurrentPage(1);
    setTotalCount(0);
    setHasMore(false);
    setError(null);
  };

  const handleUpdateClick = (alumni: Alumni) => {
    console.log("Update button clicked for alumni:", alumni);
    setSelectedAlumni(alumni);
    setIsDialogOpen(true);
    console.log("Dialog should now open with isDialogOpen=true");
  };

  const handleUpdateSubmit = async (updatedData: Partial<Alumni>) => {
    const url = DATABASE_URL + "api/update-request";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollNumber: selectedAlumni?.rollNumber,
        oldData: selectedAlumni,
        newData: updatedData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit update request");
    }
  };

  const handleCountryChange = (option: SelectOption | null) => {
    setCountryQuery(option);
    setCityQuery(null);
  };

  return (
    <section id="network" className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alumni Network
          </h2>
          <p className="text-gray-300 text-lg">
            Connect with thousands of IIITM alumni worldwide
          </p>
        </div>

        {/* Search Card - Prominent */}
        <div
          className="mb-12 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-700"
          ref={searchRef}
        >
          <div className="bg-gray-800 px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-8 h-8 text-white" />
              <h3 className="text-3xl font-bold text-white">Find Alumni</h3>
            </div>
            <p className="text-gray-300">
              Basic Search: Name, Year of Entry, and Company
            </p>
          </div>

          <div className="p-8 bg-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 items-end">
              <div className="relative lg:col-span-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full border-2 border-gray-700 bg-gray-800 text-gray-100 rounded-lg p-3 focus:border-gray-500 focus:outline-none focus:shadow-lg transition-all placeholder-gray-500"
                />
              </div>

              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Year of Entry
                </label>
                <Select<SelectOption, false>
                  options={yearOfEntryOptions}
                  value={yearOfEntryQuery}
                  onChange={(option) => setYearOfEntryQuery(option)}
                  isSearchable
                  isClearable
                  menuPortalTarget={selectPortalTarget}
                  menuPosition="fixed"
                  placeholder="Select or type year"
                  styles={selectStyles}
                />
              </div>

              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Enter company"
                  value={companyQuery}
                  onChange={(e) => setCompanyQuery(e.target.value)}
                  className="w-full border-2 border-gray-700 bg-gray-800 text-gray-100 rounded-lg p-3 focus:border-gray-500 focus:outline-none focus:shadow-lg transition-all placeholder-gray-500"
                />
              </div>

              <div className="lg:col-span-12 flex gap-3">
                <button
                  onClick={() => handleSearch(1)}
                  disabled={loading}
                  className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {loading ? "Searching..." : "Search"}
                </button>

                <button
                  onClick={() => setIsAdvancedFiltersOpen(true)}
                  className="px-4 py-3 border-2 border-gray-700 text-gray-100 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all whitespace-nowrap font-semibold"
                >
                  Advanced Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters Modal */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${isAdvancedFiltersOpen ? "bg-black/60 opacity-100 pointer-events-auto" : "bg-black/0 opacity-0 pointer-events-none"}`}
          onClick={() => setIsAdvancedFiltersOpen(false)}
        >
          <div
            className={`absolute right-0 top-0 h-full w-full max-w-xl bg-gray-900 border-l border-gray-700 shadow-2xl p-6 md:p-8 overflow-y-auto transition-transform duration-300 ${isAdvancedFiltersOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-white">
                Advanced Filters
              </h4>
              <button
                onClick={() => setIsAdvancedFiltersOpen(false)}
                className="text-gray-300 hover:text-white text-lg"
                aria-label="Close advanced filters"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Roll No.
                </label>
                <input
                  type="text"
                  placeholder="2023BCS-XXX"
                  value={rollQuery}
                  onChange={(e) => setRollQuery(e.target.value)}
                  className="w-full border-2 border-gray-700 bg-gray-800 text-gray-100 rounded-lg p-3 focus:border-gray-500 focus:outline-none focus:shadow-lg transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Country
                </label>
                <Select<SelectOption, false>
                  options={countries}
                  value={countryQuery}
                  onChange={handleCountryChange}
                  isClearable
                  isSearchable
                  isLoading={loadingCountries}
                  placeholder="Type to search country"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  City
                </label>
                <Select<SelectOption, false>
                  options={cities}
                  value={cityQuery}
                  onChange={(option) => setCityQuery(option)}
                  isClearable
                  isSearchable
                  isDisabled={!countryQuery}
                  isLoading={loadingCities}
                  placeholder={
                    countryQuery
                      ? "Type to search city"
                      : "Select country first"
                  }
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Nature of Job
                </label>
                <Select<SelectOption, false>
                  options={natureOfJobOptions}
                  value={natureOfJobQuery}
                  onChange={(option) => setNatureOfJobQuery(option)}
                  isClearable
                  isSearchable
                  placeholder="Select nature of job"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Program Name
                </label>
                <Select<SelectOption, false>
                  options={programNameOptions}
                  value={programNameQuery}
                  onChange={(option) => setProgramNameQuery(option)}
                  isClearable
                  isSearchable
                  placeholder="Select program name"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Specialisation
                </label>
                <Select<SelectOption, false>
                  options={specializationOptions}
                  value={specializationQuery}
                  onChange={(option) => setSpecializationQuery(option)}
                  isClearable
                  isSearchable
                  placeholder="Select specialisation"
                  styles={selectStyles}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleApplyAdvancedFilters}
                disabled={loading}
                className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearAllFromAdvanced}
                className="border-2 border-gray-700 text-gray-100 bg-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-300 mt-4 text-lg">Searching alumni...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-900/50 border-2 border-red-700 rounded-lg p-6 mb-8">
            <p className="text-red-200 font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && hasSearched && results.length === 0 && !error ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg border-2 border-gray-700">
            <p className="text-gray-400 text-lg">
              No alumni found matching your criteria.
            </p>
          </div>
        ) : !loading && results.length > 0 ? (
          <>
            {/* Results Summary */}
            <div className="mb-6 flex items-center justify-between">
              <div className="bg-gray-900 border-l-4 border-gray-600 rounded-lg p-4">
                <p className="text-gray-300">
                  <span className="font-bold text-lg text-white">
                    {totalCount}
                  </span>{" "}
                  results found •
                  <span className="font-bold text-lg text-gray-200">
                    {" "}
                    {results.length}
                  </span>{" "}
                  shown on page{" "}
                  <span className="font-bold text-lg text-white">
                    {currentPage}
                  </span>
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg border-2 border-gray-700">
              <table className="min-w-full bg-gray-900">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Roll Number
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Year of Entry
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((alumni, idx) => (
                    <tr
                      key={alumni.rollNumber}
                      className={`${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition-colors border-b border-gray-700 relative`}
                      onMouseEnter={() => setHoveredRow(alumni.rollNumber)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {alumni.name || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.rollNumber || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.department || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.yearOfEntry ?? "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.lastOrganization || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300 relative">
                        {alumni.currentLocationIndia ||
                          alumni.currentOverseasLocation ||
                          "NA"}
                        {hoveredRow === alumni.rollNumber && (
                          <button
                            onClick={() => handleUpdateClick(alumni)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
                          >
                            <Edit className="w-4 h-4" />
                            Update Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  onClick={() => handlePrevPage()}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-700 text-gray-300 bg-gray-900 font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-600 disabled:border-gray-800 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>

                {/* Page numbers */}
                <div className="flex gap-1">
                  {Array.from(
                    { length: Math.ceil(totalCount / 20) },
                    (_, i) => i + 1,
                  )
                    .filter((page) => {
                      const offset = 2;
                      return (
                        page === 1 ||
                        page === Math.ceil(totalCount / 20) ||
                        (page >= currentPage - offset &&
                          page <= currentPage + offset)
                      );
                    })
                    .map((page, idx, arr) => (
                      <React.Fragment key={`page-${page}`}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 py-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => handleSearch(page)}
                          className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? "bg-gray-700 text-white shadow-lg"
                              : "border-2 border-gray-700 text-gray-300 bg-gray-900 hover:border-gray-600 hover:bg-gray-800"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                <button
                  onClick={() => handleNextPage()}
                  disabled={!hasMore}
                  className="px-4 py-2 border-2 border-gray-700 text-gray-300 bg-gray-900 font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-600 disabled:border-gray-800 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        ) : null}

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 border-t-4 border-gray-700">
            <h4 className="text-xl font-bold text-white mb-3">
              Update Your Details
            </h4>
            <p className="text-gray-300 mb-4">
              Keep your profile information current
            </p>
            <a
              href="mailto:alumninet@iiitm.ac.in"
              className="text-gray-200 font-semibold hover:text-white"
            >
              Contact us →
            </a>
          </div>

          <div className="bg-gray-900 rounded-xl shadow-lg p-6 border-t-4 border-gray-600">
            <h4 className="text-xl font-bold text-white mb-3">Email Us</h4>
            <p className="text-gray-300 mb-4">For support and inquiries</p>
            <a
              href="mailto:alumninet@iiitm.ac.in"
              className="text-gray-200 font-semibold hover:text-white"
            >
              alumninet@iiitm.ac.in →
            </a>
          </div>

          <div className="bg-gray-900 rounded-xl shadow-lg p-6 border-t-4 border-gray-500">
            <h4 className="text-xl font-bold text-white mb-3">
              Connect Social
            </h4>
            <p className="text-gray-300 mb-4">
              Join alumni on social platforms
            </p>
            <a
              href="https://www.linkedin.com/groups/59379/"
              target="_blank"
              className="text-gray-200 font-semibold hover:text-white"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>

      {/* Update Details Dialog - Outside main content for proper z-index */}
      {selectedAlumni && (
        <UpdateDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => {
            console.log("Dialog closing...");
            setIsDialogOpen(false);
            setSelectedAlumni(null);
          }}
          alumni={selectedAlumni}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </section>
  );
};

export default Network;
