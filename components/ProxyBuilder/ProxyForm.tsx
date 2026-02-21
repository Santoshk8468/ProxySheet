"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { ProxyConfig } from "@/lib/types";

// Country and City types for location targeting
interface Country {
  code: string;
  name: string;
}

interface City {
  code: string;
  name: string;
}

interface ProxyFormProps {
  config: ProxyConfig;
  countries: Country[];
  cities: City[];
  passwordPreview: string;
  updateConfig: (updates: Partial<ProxyConfig>) => void;
}

const regionOptions = [
  { value: "geo.iproyal.com", label: "Auto (geo.iproyal.com) — chooses the optimal region based on your IP" },
  { value: "proxy.iproyal.com", label: "Germany (proxy.iproyal.com)" },
  { value: "us.proxy.iproyal.com", label: "United States (us.proxy.iproyal.com)" },
  { value: "sg.proxy.iproyal.com", label: "Singapore (sg.proxy.iproyal.com)" },
];

const protocolOptions = [
  { value: "http", label: "HTTP(S)" },
  { value: "socks5", label: "SOCKS5" },
];

const locRegionOptions = [
  { value: "", label: "None" },
  { value: "africa", label: "Africa" },
  { value: "arabstates", label: "Arab States" },
  { value: "asiapacific", label: "Asia Pacific" },
  { value: "europe", label: "Europe" },
  { value: "middleeast", label: "Middle East" },
  { value: "northamerica", label: "North America" },
  { value: "southlatinamerica", label: "South/Latin America" },
];

export default function ProxyForm({
  config,
  countries,
  cities,
  passwordPreview,
  updateConfig,
}: ProxyFormProps) {
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const filteredCountries = countries.filter((c) => {
    const search = countrySearch.toLowerCase();
    return c.code.toLowerCase().includes(search) || c.name.toLowerCase().includes(search);
  });

  const filteredCities = cities.filter((c) => {
    const search = citySearch.toLowerCase();
    return c.code.toLowerCase().includes(search) || c.name.toLowerCase().includes(search);
  });

  const countryOptions = [
    { value: "", label: filteredCountries.length ? "Select a country" : "Loading countries..." },
    ...filteredCountries.map((c) => ({ value: c.code, label: `${c.name} (${c.code.toUpperCase()})` })),
  ];

  const cityOptions = [
    { value: "", label: filteredCities.length ? "Any / no specific city" : "Select a country first" },
    ...filteredCities.map((c) => ({ value: c.code, label: `${c.name} (${c.code})` })),
  ];

  return (
    <Card hoverable={false} className="space-y-1">
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Proxy region (host)"
          options={regionOptions}
          value={config.region}
          onChange={(e) => updateConfig({ region: e.target.value })}
          help="Select the optimal region for your proxy connection."
        />
        <Select
          label="Protocol"
          options={protocolOptions}
          value={config.protocol}
          onChange={(e) => updateConfig({ protocol: e.target.value })}
          help="Protocol you will use in your app or tool."
        />
      </div>

      {/* Location Targeting */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-text-main mb-1">Location targeting (optional)</h3>
        <p className="text-sm text-text-muted mb-4">
          Append keys like <code className="text-accent font-semibold">_region-</code>,{" "}
          <code className="text-accent font-semibold">_country-</code>,{" "}
          <code className="text-accent font-semibold">_city-</code> to your base password.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            label="Location region (_region-)"
            options={locRegionOptions}
            value={config.locRegion}
            onChange={(e) => updateConfig({ locRegion: e.target.value })}
          />

          <div>
            <label className="block mb-1.5 text-sm font-medium text-text-main">Countries (_country-)</label>
            <input
              type="text"
              placeholder="Search country by name or code"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              className="w-full px-3 py-2 mb-1 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none transition-all focus:border-accent focus:bg-white placeholder:text-text-soft"
            />
            <select
              value={config.country}
              onChange={(e) => updateConfig({ country: e.target.value })}
              disabled={!countries.length}
              className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent"
            >
              {countryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-text-main">City (_city-)</label>
            <input
              type="text"
              placeholder="Search city by name or code"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full px-3 py-2 mb-1 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none transition-all focus:border-accent focus:bg-white placeholder:text-text-soft"
            />
            <select
              value={config.city}
              onChange={(e) => updateConfig({ city: e.target.value })}
              disabled={!cities.length}
              className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent"
            >
              {cityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <Input
            label="US state (_state-)"
            placeholder="e.g. iowa (requires country-us)"
            value={config.state}
            onChange={(e) => updateConfig({ state: e.target.value })}
          />
        </div>

        <Input
          label="ISP (_isp-)"
          placeholder="e.g. skyuklimited (requires city)"
          value={config.isp}
          onChange={(e) => updateConfig({ isp: e.target.value })}
        />

        {/* Password Preview */}
        <div className="mt-4">
          <p className="text-sm text-text-muted mb-2">
            Final password with location configuration (preview only):
          </p>
          <code className="inline-block px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 font-mono text-sm break-all text-text-main">
            {passwordPreview}
          </code>
        </div>
      </div>

      <Button variant="secondary" className="w-full mt-6">
        Generate proxy string
      </Button>
    </Card>
  );
}
