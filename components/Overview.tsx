import Card from "./ui/Card";

export default function Overview() {
  return (
    <section id="overview" className="py-12 section-alt">
      <div className="max-w-container mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Why IPRoyal Residential Proxies
          </h2>
          <p className="text-text-soft max-w-md">
            A quick overview of the key advantages and technical features
            highlighted in the official documentation.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-semibold mb-3">Key advantages</h3>
            <ul className="space-y-1.5 text-sm text-text-soft pl-5 list-disc">
              <li>Over 32M ethically sourced residential IPs in 195+ countries.</li>
              <li>Highly competitive pricing with pay-as-you-go and no data expiration.</li>
              <li>Precise targeting down to country, state, city, and ISP.</li>
              <li>24/7 support with fast response times.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">Technical features</h3>
            <ul className="space-y-1.5 text-sm text-text-soft pl-5 list-disc">
              <li>Advanced session control: rotating or sticky sessions up to 7 days.</li>
              <li>Unlimited simultaneous sessions for large-scale operations.</li>
              <li>Dual authentication: username/password and IP whitelisting.</li>
              <li>HTTP(S) and SOCKS5 support, plus API access for automation.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
