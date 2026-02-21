"use client";

import Button from "./ui/Button";
import Card from "./ui/Card";

interface HeroProps {
  proxyPreview: string;
}

export default function Hero({ proxyPreview }: HeroProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
          {/* Copy */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight mb-4">
              Build your IPRoyal residential proxy string in seconds.
            </h1>
            <p className="text-text-muted mb-5 max-w-lg">
              Use this helper to understand and compose the{" "}
              <strong className="text-text-main">HOST:PORT:USERNAME:PASSWORD</strong> string
              required for IPRoyal residential proxies, including region selection
              and connection details.
            </p>
            <ul className="space-y-2 mb-6 text-text-soft text-sm">
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span>
                Understand each part of the proxy string.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span>
                Pick the optimal proxy region (Geo, DE, US, SG).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">•</span>
                Copy-ready string for your tools and code.
              </li>
            </ul>
            <Button variant="primary" onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}>
              Open Proxy Builder
            </Button>
          </div>

          {/* Preview Card */}
          <Card variant="hero" hoverable className="animate-fade-in-up md:order-none order-first">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-card-alt to-bg-alt border-b border-card-alt/90">
              <span className="w-2.5 h-2.5 rounded-full bg-danger" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              <span className="ml-auto text-[0.7rem] uppercase tracking-widest text-text-soft">
                Proxy Preview
              </span>
            </div>
            <div className="p-5">
              <code className="inline-block px-3 py-2 rounded-lg bg-card-alt/95 border border-border-subtle/50 text-sm font-mono break-all">
                {proxyPreview}
              </code>
              <p className="mt-3 text-xs text-text-soft">
                Full proxy string format used by IPRoyal residential proxies.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
