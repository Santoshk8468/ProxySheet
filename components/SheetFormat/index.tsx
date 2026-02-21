"use client";

import { useState, useMemo } from "react";
import { useProxyBuilder } from "@/hooks/useProxyBuilder";
import { useClipboard } from "@/hooks/useClipboard";
import Card from "../ui/Card";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function SheetFormat() {
    const {
        config,
        listConfig,
        countries,
        cities,
        proxyList,
        updateConfig,
        updateListConfig,
        generateList,
        refresh,
    } = useProxyBuilder();

    const [countrySearch, setCountrySearch] = useState("");
    const [citySearch, setCitySearch] = useState("");
    const { copied, copy } = useClipboard();

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

    const parsedRows = useMemo(() => {
        return proxyList.map((line) => {
            const parts = line.split(":");
            if (parts.length < 4) return null;
            return {
                host: parts[0],
                port: parts[1],
                user: parts[2],
                pass: parts.slice(3).join(":"),
            };
        }).filter(Boolean);
    }, [proxyList]);

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-xl font-semibold tracking-tight mb-2">
                    Sheet Format View
                </h2>
                <p className="text-text-soft max-w-md">
                    Select a country and city to generate proxies and view them in a separated table format.
                </p>
            </header>

            <Card hoverable={false} className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-text-main">Country</label>
                        <input
                            type="text"
                            placeholder="Search country..."
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

                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-text-main">City</label>
                        <input
                            type="text"
                            placeholder="Search city..."
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

                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-text-main">Quantity</label>
                        <input
                            type="number"
                            min={1}
                            max={5000}
                            value={listConfig.quantity}
                            onChange={(e) => updateListConfig({ quantity: parseInt(e.target.value) || 10 })}
                            className="w-full px-3 py-2 mb-1 rounded-md bg-transparent text-transparent text-sm border-none outline-none select-none pointer-events-none"
                        />
                        <input
                            type="number"
                            min={1}
                            max={5000}
                            value={listConfig.quantity}
                            onChange={(e) => updateListConfig({ quantity: parseInt(e.target.value) || 10 })}
                            className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none transition-all focus:border-accent focus:bg-white"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={() => {
                            if (!listConfig.skipIspStatic && !listConfig.highEndPool) {
                                updateListConfig({ skipIspStatic: true, highEndPool: false });
                            } else if (listConfig.skipIspStatic && !listConfig.highEndPool) {
                                updateListConfig({ skipIspStatic: false, highEndPool: true });
                            } else if (!listConfig.skipIspStatic && listConfig.highEndPool) {
                                updateListConfig({ skipIspStatic: true, highEndPool: true });
                            } else {
                                updateListConfig({ skipIspStatic: false, highEndPool: false });
                            }
                        }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${listConfig.skipIspStatic || listConfig.highEndPool
                                ? "border-accent bg-accent/5"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                        title="Click to cycle Advanced Proxy Modes"
                    >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-text-main">
                                    Advanced Mode: {
                                        listConfig.skipIspStatic && listConfig.highEndPool ? "Skip Static + High-End" :
                                            listConfig.skipIspStatic ? "Skip Static Proxies" :
                                                listConfig.highEndPool ? "High-End Pool" : "Standard Proxies"
                                    }
                                </span>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-200 rounded text-text-muted">
                                Click to change
                            </span>
                        </div>
                        <p className="text-xs text-text-muted">
                            {
                                listConfig.skipIspStatic && listConfig.highEndPool ? (
                                    <>Applies both <code className="text-accent font-semibold bg-white px-1 py-0.5 rounded border border-gray-100">_skipispstatic-1</code> and <code className="text-accent font-semibold bg-white px-1 py-0.5 rounded border border-gray-100">_streaming-1</code></>
                                ) :
                                    listConfig.skipIspStatic ? (
                                        <>Skip ISP static proxies. Adds <code className="text-accent font-semibold bg-white px-1 py-0.5 rounded border border-gray-100">_skipispstatic-1</code></>
                                    ) :
                                        listConfig.highEndPool ? (
                                            <>Access fastest & most reliable proxies. Adds <code className="text-accent font-semibold bg-white px-1 py-0.5 rounded border border-gray-100">_streaming-1</code></>
                                        ) : "Regular proxy pool without advanced filtering."
                            }
                        </p>
                    </button>
                </div>
            </Card>

            {/* Proxy Table */}
            {parsedRows.length > 0 ? (
                <Card hoverable={false} className="p-0 overflow-hidden border border-gray-200">
                    <div className="px-5 pt-4 pb-2 flex justify-between items-center rounded-t-xl bg-white">
                        <h3 className="text-sm font-medium text-text-main">
                            Separated view (Host / Port / User / Pass)
                        </h3>
                        <div className="flex gap-3">
                            <Button variant="secondary" onClick={refresh}>
                                Refresh proxies
                            </Button>
                            <Button variant="secondary" success={copied} onClick={() => copy(proxyList.join("\n"))}>
                                {copied ? "Copied!" : "Copy list"}
                            </Button>
                        </div>
                    </div>
                    <div className="bg-white max-h-[500px] overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-50/80 sticky top-0 z-10 border-y border-gray-200">
                                    <th className="px-5 py-3 font-semibold text-text-main w-[15%]">Host</th>
                                    <th className="px-5 py-3 font-semibold text-text-main w-[10%]">Port</th>
                                    <th className="px-5 py-3 font-semibold text-text-main w-[15%]">User</th>
                                    <th className="px-5 py-3 font-semibold text-text-main w-[60%]">Pass</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {parsedRows.map((row, i) => (
                                    <tr key={i} className="hover:bg-accent/5 transition-colors bg-white">
                                        <td className="px-5 py-3 text-text-main whitespace-nowrap">{row?.host}</td>
                                        <td className="px-5 py-3 text-text-main whitespace-nowrap">{row?.port}</td>
                                        <td className="px-5 py-3 text-text-main whitespace-nowrap">{row?.user}</td>
                                        <td className="px-5 py-3 text-text-muted font-mono text-[13px] break-all">{row?.pass}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <Card hoverable={false} className="py-12 text-center text-text-muted border-dashed">
                    Select a country to generate the proxy list.
                </Card>
            )}
        </section>
    );
}
