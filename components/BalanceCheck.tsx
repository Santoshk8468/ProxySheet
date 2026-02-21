"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface UserInfo {
  available_traffic: number;
}

export default function BalanceCheck() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchBalance = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await fetch("/api/balance");

      if (!resp.ok) {
        throw new Error(`Request failed with status ${resp.status}`);
      }

      const data = await resp.json();
      setUserInfo(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setError("Failed to fetch balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchBalance();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchBalance]);

  const formatTraffic = (gb: number) => {
    return gb.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* User Information Card */}
      <Card hoverable={false}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent-strong flex items-center justify-center text-2xl">
            👤
          </div>
          <h3 className="text-lg font-semibold">User Information</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card-alt/50 border border-border-subtle/30 text-center">
            <p className="text-sm text-text-soft mb-1">Available Traffic</p>
            <p className="text-3xl font-bold text-accent">
              {userInfo ? formatTraffic(userInfo.available_traffic) : "—"}
              <span className="text-lg font-normal text-text-muted ml-1">GB</span>
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card-alt/50 border border-border-subtle/30 text-center">
            <p className="text-sm text-text-soft mb-1">API Status</p>
            <p className="text-xl font-semibold flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${error ? "bg-danger" : "bg-success"} animate-pulse`} />
              {error ? "Error" : "Connected"}
            </p>
          </div>
        </div>
      </Card>

      {/* Actions Card */}
      <Card hoverable={false}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={fetchBalance}
            loading={isLoading}
            className="w-full py-3"
          >
            🔄 Refresh Data
          </Button>

          <Button
            variant={autoRefresh ? "secondary" : "secondary"}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="w-full py-3"
          >
            ⏱️ Auto Refresh {autoRefresh ? "ON" : "OFF"} (30s)
          </Button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-danger text-center">{error}</p>
        )}
      </Card>

      {/* Status Footer */}
      <div className="text-center text-xs text-text-soft space-y-1">
        {lastUpdated && <p>Last updated: {lastUpdated}</p>}
      </div>
    </div>
  );
}
