"use client";

import { useState, useMemo } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { ProxyConfig, ProxyListConfig } from "@/lib/types";
import { generateCsv, downloadCsv } from "@/lib/utils";

interface ProxyListProps {
  config: ProxyConfig;
  listConfig: ProxyListConfig;
  updateListConfig: (updates: Partial<ProxyListConfig>) => void;
  generateList: () => string[];
  isComplete: boolean;
  refresh?: () => void;
}

export default function ProxyList({
  config,
  listConfig,
  updateListConfig,
  generateList,
  isComplete,
  proxyList = [],
  refresh,
}: ProxyListProps & { proxyList?: string[] }) {
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { copied, copy } = useClipboard();

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
  const handleCopy = async () => {
    if (!proxyList.length) {
      setStatus({ message: "Generate a list first.", type: "error" });
      return;
    }

    const success = await copy(proxyList.join("\n"));
    if (success) {
      setStatus({ message: "Proxy list copied to clipboard.", type: "success" });
    }
  };

  const handleDownload = () => {
    if (!proxyList.length) {
      setStatus({ message: "Generate a list first.", type: "error" });
      return;
    }

    const csv = generateCsv(proxyList);
    downloadCsv(csv);
    setStatus({ message: "CSV download started.", type: "success" });
  };

  return (
    <Card hoverable={false}>
      <h3 className="font-bold text-lg text-text-main mb-2">Proxy list generator</h3>
      <p className="text-sm text-text-muted mb-5">
        Create multiple proxy lines from the current configuration and view them
        separated as Host / Port / User / Pass.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1.5 text-sm font-medium text-text-main">Quantity</label>
          <input
            type="number"
            min={1}
            max={5000}
            value={listConfig.quantity}
            onChange={(e) => updateListConfig({ quantity: parseInt(e.target.value) || 10 })}
            className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none transition-all focus:border-accent focus:bg-white"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-sm font-medium text-text-main">Session Lifetime (Sticky IP)</label>
          <select
            value={listConfig.sessionLifetime}
            onChange={(e) => updateListConfig({ sessionLifetime: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm border-2 border-gray-200 outline-none cursor-pointer focus:border-accent focus:bg-white"
          >
            <option value="1m">1 minute</option>
            <option value="5m">5 minutes</option>
            <option value="10m">10 minutes</option>
            <option value="30m">30 minutes</option>
            <option value="1h">1 hour</option>
            <option value="3h">3 hours</option>
            <option value="6h">6 hours</option>
            <option value="12h">12 hours</option>
            <option value="24h">24 hours</option>
            <option value="3d">3 days</option>
            <option value="7d">7 days (max)</option>
          </select>
          <p className="mt-1.5 text-xs text-text-muted">
            Each proxy gets a unique 8-char <code className="text-accent font-semibold">_session-*</code> ID for sticky IP.
          </p>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="mb-4">
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

      <div className="mb-4">
        <label className="block mb-1.5 text-sm font-medium text-text-main">Formatted proxy list</label>
        <textarea
          readOnly
          rows={6}
          value={proxyList.join("\n")}
          className="w-full px-3 py-2.5 rounded-md bg-gray-50 text-text-main text-sm font-mono border-2 border-gray-200 outline-none resize-y focus:border-accent"
        />

        <div className="flex flex-wrap gap-3 mt-4">
          {refresh && (
            <Button variant="secondary" onClick={refresh}>
              Refresh proxies
            </Button>
          )}
          <Button variant="secondary" success={copied} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy list"}
          </Button>
          <Button variant="secondary" onClick={handleDownload}>
            Download CSV
          </Button>
        </div>

        {status && (
          <p className={`mt-3 text-sm font-medium animate-fade-in-up ${status.type === "error" ? "text-danger" : "text-success"}`}>
            {status.message}
          </p>
        )}
      </div>

      {/* Proxy Table */}
      {parsedRows.length > 0 && (
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-text-main">
            Separated view (Host / Port / User / Pass)
          </label>
          <div className="rounded-lg border border-gray-200 bg-white max-h-64 overflow-auto shadow-subtle">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 sticky top-0 z-10">
                  <th className="px-4 py-2.5 text-left border-b border-gray-200 font-semibold text-text-main">Host</th>
                  <th className="px-4 py-2.5 text-left border-b border-gray-200 font-semibold text-text-main">Port</th>
                  <th className="px-4 py-2.5 text-left border-b border-gray-200 font-semibold text-text-main">User</th>
                  <th className="px-4 py-2.5 text-left border-b border-gray-200 font-semibold text-text-main">Pass</th>
                </tr>
              </thead>
              <tbody>
                {parsedRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors hover:bg-accent/10 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                  >
                    <td className="px-4 py-2 border-b border-gray-100 whitespace-nowrap text-text-main">{row?.host}</td>
                    <td className="px-4 py-2 border-b border-gray-100 whitespace-nowrap text-text-main">{row?.port}</td>
                    <td className="px-4 py-2 border-b border-gray-100 whitespace-nowrap text-text-main">{row?.user}</td>
                    <td className="px-4 py-2 border-b border-gray-100 whitespace-nowrap text-text-muted font-mono text-xs">{row?.pass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
