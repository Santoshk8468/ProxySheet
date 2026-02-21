"use client";

import { useClipboard } from "@/hooks/useClipboard";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

interface ProxyOutputProps {
  proxyString: string;
  isComplete: boolean;
}

export default function ProxyOutput({ proxyString, isComplete }: ProxyOutputProps) {
  const { copied, error, copy } = useClipboard();

  const handleCopy = async () => {
    if (!isComplete) {
      return;
    }
    await copy(proxyString);
  };

  return (
    <Card hoverable={false}>
      <h3 className="font-semibold mb-2">Resulting proxy string</h3>
      <p className="text-xs text-text-soft mb-4">
        This is the final string in the{" "}
        <strong className="text-text-main">HOST:PORT:USERNAME:PASSWORD</strong>{" "}
        format that you can paste into your tools.
      </p>

      <div className="flex gap-3 items-start">
        <code
          className={cn(
            "flex-1 px-3 py-2.5 rounded-md border font-mono text-sm break-all transition-all duration-200",
            "bg-card-alt/95",
            copied
              ? "border-success shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"
              : "border-border-subtle/50"
          )}
        >
          {proxyString}
        </code>
        <Button
          variant="secondary"
          success={copied}
          onClick={handleCopy}
          disabled={!isComplete}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {(error || (!isComplete && !copied)) && (
        <p className={cn("mt-2 text-xs animate-fade-in-up", error ? "text-danger" : "text-text-soft")}>
          {error || (isComplete ? "" : "Fill in all fields before copying.")}
        </p>
      )}
      {copied && (
        <p className="mt-2 text-xs text-success animate-fade-in-up">
          Proxy string copied to clipboard.
        </p>
      )}
    </Card>
  );
}
