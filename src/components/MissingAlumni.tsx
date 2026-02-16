import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Select, { type StylesConfig } from "react-select";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { type SelectOption } from "../hooks/useLocationAPI";
import { useTheme } from "../context/ThemeContext";

interface Alumni {
  serialNo?: string;
  name: string;
  rollNumber: string;
  department?: string;
  yearOfEntry?: number;
  programName?: string;
  specialization?: string;
  lastOrganization?: string;
  currentLocationIndia?: string;
  currentOverseasLocation?: string;
  linkedIn?: string;
}

const rawUrl = import.meta.env.VITE_DATABASE_URL || "";
const DATABASE_URL = rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`;

const PROGRAM_NAME_OPTIONS = [
  "BCS",
  "BIT",
  "MBA",
  "MTECH",
  "IPG",
  "PGDIT",
  "PGDMIT",
  "PHD",
  "DSC",
];

const SPECIALIZATION_OPTIONS = [
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
];

const getSelectStyles = (theme: "light" | "dark"): StylesConfig<SelectOption, false> => {
  const isDark = theme === "dark";

  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderColor: state.isFocused
        ? isDark
          ? "#6b7280"
          : "#2563eb"
        : isDark
          ? "#374151"
          : "#d1d5db",
      minHeight: "48px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDark ? "#6b7280" : "#93c5fd",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#111827" : "#ffffff",
      border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
      zIndex: 60,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: isDark
        ? state.isFocused
          ? "#374151"
          : "#111827"
        : state.isFocused
          ? "#eff6ff"
          : "#ffffff",
      color: isDark ? "#f3f4f6" : "#111827",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#f3f4f6" : "#111827",
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? "#9ca3af" : "#6b7280",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "#f3f4f6" : "#111827",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": { color: isDark ? "#f3f4f6" : "#111827" },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: isDark ? "#9ca3af" : "#6b7280",
      "&:hover": { color: isDark ? "#f3f4f6" : "#111827" },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };
};

const MissingAlumni: React.FC = () => {
  const { theme } = useTheme();
  const selectPortalTarget =
    typeof document !== "undefined" ? document.body : null;
  const selectStyles = useMemo(() => getSelectStyles(theme), [theme]);

  const headerRef = useScrollAnimation({ yStart: 50, opacityStart: 0 });
  const searchRef = useScrollAnimation({
    yStart: 80,
    opacityStart: 0,
    delay: 0.2,
  });

  const [yearOfEntryQuery, setYearOfEntryQuery] = useState<SelectOption | null>(
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

  const yearOfEntryOptions = useMemo<SelectOption[]>(() => {
    const startYear = 1998;
    const endYear = 2026;
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: String(year), label: String(year) };
    });
  }, []);

  const programNameOptions = useMemo<SelectOption[]>(
    () =>
      PROGRAM_NAME_OPTIONS.map((option) => ({ value: option, label: option })),
    [],
  );

  const specializationOptions = useMemo<SelectOption[]>(
    () =>
      SPECIALIZATION_OPTIONS.map((option) => ({
        value: option,
        label: option,
      })),
    [],
  );

  const getLinkedInUrl = (url?: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleSearch = async (page: number = 1) => {
    const hasAtLeastOneFilter =
      Boolean(yearOfEntryQuery?.value) ||
      Boolean(programNameQuery?.value) ||
      Boolean(specializationQuery?.value);

    if (!hasAtLeastOneFilter) {
      setError("Please select at least one filter before searching.");
      setHasSearched(false);
      setResults([]);
      setCurrentPage(1);
      setTotalCount(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (yearOfEntryQuery?.value)
        params.append("yearOfEntry", yearOfEntryQuery.value);
      if (programNameQuery?.value)
        params.append("programName", programNameQuery.value);
      if (specializationQuery?.value)
        params.append("specialization", specializationQuery.value);
      params.append("page", page.toString());
      params.append("limit", pageSize.toString());

      const url = DATABASE_URL + `api/missing_alumni?${params.toString()}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Missing alumni API returned non-JSON response. Check backend URL configuration.",
        );
      }

      if (!res.ok) {
        throw new Error("Failed to fetch missing alumni");
      }

      const { data, totalCount: total, hasMore: more } = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setCurrentPage(page);
      setTotalCount(total || 0);
      setHasMore(more || false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching",
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

  return (
    <section id="missing-alumni" className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={headerRef}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Help us find alumni
          </h1>
          <p className="text-gray-300 text-lg">
            Showing alumni with unknown or deceased job status
          </p>
        </div>

        <div
          className="mb-12 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-700"
          ref={searchRef}
        >
          <div className="bg-gray-800 px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-8 h-8 text-white" />
              <h3 className="text-3xl font-bold text-white">
                Missing Alumni Search
              </h3>
            </div>
            <p className="text-gray-300">
              Filter by Year of Entry, Program Name, and Specialization
            </p>
          </div>

          <div className="p-8 bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-end">
              <div>
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
                  placeholder="Select year"
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
                  isSearchable
                  isClearable
                  menuPortalTarget={selectPortalTarget}
                  menuPosition="fixed"
                  placeholder="Select program"
                  styles={selectStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Specialization
                </label>
                <Select<SelectOption, false>
                  options={specializationOptions}
                  value={specializationQuery}
                  onChange={(option) => setSpecializationQuery(option)}
                  isSearchable
                  isClearable
                  menuPortalTarget={selectPortalTarget}
                  menuPosition="fixed"
                  placeholder="Select specialization"
                  styles={selectStyles}
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                onClick={() => handleSearch(1)}
                disabled={loading}
                className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-300 mt-4 text-lg">
              Searching missing alumni...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border-2 border-red-700 rounded-lg p-6 mb-8">
            <p className="text-red-200 font-semibold">Error: {error}</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && !error ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg border-2 border-gray-700">
            <p className="text-gray-400 text-lg">
              No missing alumni found for selected filters.
            </p>
          </div>
        ) : !loading && results.length > 0 ? (
          <>
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

            <div className="overflow-x-auto rounded-2xl shadow-lg border-2 border-gray-700">
              <table className="min-w-full bg-gray-900">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Roll Number
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Year of Entry
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Program
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Specialization
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
                      className={`${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition-colors border-b border-gray-700`}
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {alumni.linkedIn ? (
                          <a
                            href={getLinkedInUrl(alumni.linkedIn)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-300 underline underline-offset-2"
                          >
                            {alumni.name || "NA"}
                          </a>
                        ) : (
                          alumni.name || "NA"
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.rollNumber || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.yearOfEntry ?? "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.programName || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.specialization || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.lastOrganization || "NA"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {alumni.currentLocationIndia ||
                          alumni.currentOverseasLocation ||
                          "NA"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-700 text-gray-300 bg-gray-900 font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-600 disabled:border-gray-800 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>

                <div className="flex gap-1">
                  {Array.from(
                    { length: Math.ceil(totalCount / pageSize) },
                    (_, i) => i + 1,
                  )
                    .filter((page) => {
                      const offset = 2;
                      return (
                        page === 1 ||
                        page === Math.ceil(totalCount / pageSize) ||
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
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="px-4 py-2 border-2 border-gray-700 text-gray-300 bg-gray-900 font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-600 disabled:border-gray-800 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default MissingAlumni;
