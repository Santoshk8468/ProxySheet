"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Country, City, ProxyConfig, ProxyListConfig } from "@/lib/types";
import { buildProxyString, buildPassword, generateProxyList } from "@/lib/utils";

// Fixed credentials (hidden from users)
const FIXED_CREDENTIALS = {
  username: "2uKBzjY2DetgdCEv",
  password: "YqkKFSHSyKqElVgw",
  port: "11200",
  apiToken: "c4c741c49f069eff3bc6aabd2d1912f19b7524e46d53b0ac62ec0acfee0d",
};

interface UseProxyBuilderReturn {
  config: ProxyConfig;
  listConfig: ProxyListConfig;
  countries: Country[];
  cities: City[];
  isLoading: boolean;
  proxyString: string;
  passwordPreview: string;
  proxyList: string[];
  updateConfig: (updates: Partial<ProxyConfig>) => void;
  updateListConfig: (updates: Partial<ProxyListConfig>) => void;
  generateList: () => string[];
  refresh: () => void;
  isComplete: boolean;
}

const initialConfig: ProxyConfig = {
  region: "geo.iproyal.com",
  port: FIXED_CREDENTIALS.port,
  username: FIXED_CREDENTIALS.username,
  password: FIXED_CREDENTIALS.password,
  protocol: "http",
  locRegion: "",
  country: "",
  city: "",
  state: "",
  isp: "",
};

const initialListConfig: ProxyListConfig = {
  quantity: 10,
  addSession: true,
  sessionLifetime: "1h",
  highEndPool: false,
  skipIspStatic: false,
};

export function useProxyBuilder(): UseProxyBuilderReturn {
  const [config, setConfig] = useState<ProxyConfig>(initialConfig);
  const [listConfig, setListConfig] = useState<ProxyListConfig>(initialListConfig);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Auto-load locations on mount
  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch("https://resi-api.iproyal.com/v1/access/countries", {
          headers: {
            Authorization: `Bearer ${FIXED_CREDENTIALS.apiToken}`,
          },
        });

        if (!resp.ok) {
          throw new Error(`Request failed with status ${resp.status}`);
        }

        const data = await resp.json();
        const countriesList = data?.countries || [];
        setCountries(countriesList);
      } catch (err) {
        console.error("Failed to load locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  const updateConfig = useCallback((updates: Partial<ProxyConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };

      // When country changes, update cities
      if (updates.country !== undefined && updates.country !== prev.country) {
        const country = countries.find(
          (c) => c.code.toLowerCase() === updates.country?.toLowerCase()
        );
        setCities(country?.cities?.options || []);
        next.city = ""; // Reset city when country changes
      }

      return next;
    });
  }, [countries]);

  const updateListConfig = useCallback((updates: Partial<ProxyListConfig>) => {
    setListConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const proxyString = useMemo(() => buildProxyString(config), [config]);
  const passwordPreview = useMemo(() => buildPassword(config), [config]);

  const isComplete = useMemo(() => {
    return !!(
      config.region &&
      config.port &&
      config.username &&
      config.password
    );
  }, [config]);

  const generateList = useCallback(() => {
    return generateProxyList(config, listConfig);
  }, [config, listConfig]);

  // Regenerate when config, listConfig, or refreshTrigger changes
  const proxyList = useMemo(() => generateList(), [generateList, refreshTrigger]);

  return {
    config,
    listConfig,
    countries,
    cities,
    isLoading,
    proxyString,
    passwordPreview,
    proxyList,
    updateConfig,
    updateListConfig,
    generateList,
    refresh,
    isComplete,
  };
}
