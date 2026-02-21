"use client";

import { useState, useCallback } from "react";

interface UseClipboardReturn {
  copied: boolean;
  error: string | null;
  copy: (text: string) => Promise<boolean>;
}

export function useClipboard(timeout: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) {
        setError("Nothing to copy");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);

        setTimeout(() => {
          setCopied(false);
        }, timeout);

        return true;
      } catch (err) {
        console.error("Clipboard error:", err);
        setError("Unable to copy automatically. Please copy manually.");
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copied, error, copy };
}
