"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProxyBuilder from "@/components/ProxyBuilder";
import SheetFormat from "@/components/SheetFormat";
import BalanceCheck from "@/components/BalanceCheck";
import Footer from "@/components/Footer";

type Tab = "proxy-builder" | "sheet-format" | "balance-check";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("proxy-builder");

  return (
    <>
      <Header />
      <main className="pt-8 pb-12">
        {/* Tab Navigation */}
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-xl border border-gray-200 shadow-card">
            <button
              onClick={() => setActiveTab("proxy-builder")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "proxy-builder"
                  ? "bg-accent text-black shadow-btn-primary"
                  : "text-text-muted hover:text-text-main hover:bg-gray-100"
                }`}
            >
              Proxy Builder
            </button>

            <button
              onClick={() => setActiveTab("sheet-format")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "sheet-format"
                  ? "bg-accent text-black shadow-btn-primary"
                  : "text-text-muted hover:text-text-main hover:bg-gray-100"
                }`}
            >
              Sheet format
            </button>

            <button
              onClick={() => setActiveTab("balance-check")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "balance-check"
                  ? "bg-accent text-black shadow-btn-primary"
                  : "text-text-muted hover:text-text-main hover:bg-gray-100"
                }`}
            >
              Balance Check
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto px-4">
          {activeTab === "proxy-builder" && <ProxyBuilder />}
          {activeTab === "sheet-format" && <SheetFormat />}
          {activeTab === "balance-check" && <BalanceCheck />}
        </div>
      </main>
      <Footer />
    </>
  );
}
