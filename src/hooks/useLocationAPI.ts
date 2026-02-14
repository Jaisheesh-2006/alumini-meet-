import { useEffect, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CountriesNowResponse {
  error: boolean;
  msg: string;
  data: string[];
}

export const useLocationAPI = (selectedCountry?: SelectOption | null) => {
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2",
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = (await res.json()) as Array<{
          cca2?: string;
          name?: { common?: string };
        }>;

        const mapped = data
          .filter((entry) => entry?.name?.common)
          .map((entry) => ({
            label: entry.name!.common!,
            value: entry.cca2 || entry.name!.common!,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(mapped);
      } catch {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCities = async () => {
      if (!selectedCountry?.label) {
        setCities([]);
        return;
      }

      setLoadingCities(true);
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: selectedCountry.label }),
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }

        const payload = (await res.json()) as CountriesNowResponse;

        const mapped = Array.isArray(payload.data)
          ? payload.data
              .filter((city) => Boolean(city))
              .map((city) => ({ value: city, label: city }))
              .sort((a, b) => a.label.localeCompare(b.label))
          : [];

        setCities(mapped);
      } catch {
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();

    return () => controller.abort();
  }, [selectedCountry?.label]);

  return {
    countries,
    cities,
    loadingCountries,
    loadingCities,
  };
};
