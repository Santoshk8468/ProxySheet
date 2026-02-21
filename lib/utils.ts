import { ProxyConfig } from "./types";

export const normalizeToken = (value: string): string =>
  (value || "").trim().toLowerCase().replace(/\s+/g, "");

// Session ID must be exactly 8 alphanumeric characters per IPRoyal docs
export const randomSessionId = (): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 8; i += 1) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
};

export const buildPassword = (config: ProxyConfig): string => {
  const base = (config.password || "").trim();
  const result = base || "PASSWORD";

  let suffix = "";

  if (config.locRegion) {
    suffix += `_region-${normalizeToken(config.locRegion)}`;
  }

  if (config.country) {
    suffix += `_country-${config.country.trim().toLowerCase()}`;
  }

  if (config.city) {
    suffix += `_city-${normalizeToken(config.city)}`;
  }

  if (config.state) {
    suffix += `_state-${normalizeToken(config.state)}`;
  }

  if (config.isp) {
    suffix += `_isp-${normalizeToken(config.isp)}`;
  }

  return suffix ? `${result}${suffix}` : result;
};

export const buildProxyString = (config: ProxyConfig): string => {
  const host = (config.region || "").trim();
  const port = (config.port || "").trim();
  const username = (config.username || "").trim();
  const password = buildPassword(config);
  const hasBasePassword = !!(config.password || "").trim();

  if (!host || !port || !username || !hasBasePassword) {
    return `${host || "HOST"}:${port || "PORT"}:${username || "USERNAME"}:${password || "PASSWORD"
      }`;
  }

  return `${host}:${port}:${username}:${password}`;
};

export const generateProxyList = (
  config: ProxyConfig,
  listConfig: {
    quantity: number;
    addSession: boolean;
    sessionLifetime: string;
    highEndPool?: boolean;
    skipIspStatic?: boolean;
  }
): string[] => {
  const host = (config.region || "").trim();
  const port = (config.port || "").trim();
  const username = (config.username || "").trim();
  const basePassword = (config.password || "").trim();

  if (!host || !port || !username || !basePassword) {
    return [];
  }

  const qty = Math.max(1, Math.min(5000, listConfig.quantity || 10));
  const baseWithLocation = buildPassword(config);
  const lifetime = (listConfig.sessionLifetime || "").trim() || "1h";

  const lines: string[] = [];
  for (let i = 0; i < qty; i += 1) {
    let password = baseWithLocation;

    // Add session for sticky IP
    if (listConfig.addSession) {
      // Session ID must be exactly 8 alphanumeric characters
      const sid = randomSessionId();
      // Lifetime format: number + unit (s/m/h/d) - e.g., 30m, 1h, 7d
      password += `_session-${sid}_lifetime-${lifetime}`;
    }

    // High-End Pool: fastest and most reliable proxies
    if (listConfig.highEndPool) {
      password += `_streaming-1`;
    }

    // Skip ISP Static: skip static proxies
    if (listConfig.skipIspStatic) {
      password += `_skipispstatic-1`;
    }

    lines.push(`${host}:${port}:${username}:${password}`);
  }

  return lines;
};

export const generateCsv = (lines: string[]): string => {
  const rows = [["Host", "Port", "User", "Pass"]];

  lines.forEach((line) => {
    const parts = line.split(":");
    if (parts.length < 4) return;
    const host = parts[0];
    const port = parts[1];
    const user = parts[2];
    const pass = parts.slice(3).join(":");
    rows.push([host, port, user, pass]);
  });

  return rows
    .map((cols) =>
      cols.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
};

export const downloadCsv = (content: string, filename: string = "proxies.csv"): void => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};


/**
 * Download text content as .txt file
 */
export const downloadTxt = (content: string, filename: string = "proxies.txt"): void => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
