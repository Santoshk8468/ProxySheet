"use client";

import { useProxyBuilder } from "@/hooks/useProxyBuilder";
import ProxyForm from "./ProxyForm";
import ProxyOutput from "./ProxyOutput";
import ProxyList from "./ProxyList";

export default function ProxyBuilder() {
  const {
    config,
    listConfig,
    countries,
    cities,
    proxyString,
    passwordPreview,
    isComplete,
    updateConfig,
    updateListConfig,
    proxyList,
    refresh,
  } = useProxyBuilder();

  return (
    <section id="builder" className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Proxy string builder
        </h2>
        <p className="text-text-soft max-w-md">
          Configure your proxy settings and location targeting to generate a
          ready-to-use proxy string.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
        <ProxyForm
          config={config}
          countries={countries}
          cities={cities}
          passwordPreview={passwordPreview}
          updateConfig={updateConfig}
        />

        <ProxyOutput proxyString={proxyString} isComplete={isComplete} />
      </div>

      <ProxyList
        listConfig={listConfig}
        updateListConfig={updateListConfig}
        proxyList={proxyList}
        refresh={refresh}
      />
    </section>
  );
}
