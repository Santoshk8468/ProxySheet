import Card from "./ui/Card";

const regions = [
  {
    title: "Automatic (recommended)",
    host: "geo.iproyal.com",
    description: "Lets IPRoyal automatically choose the most optimal region based on the IP address making the request.",
    accent: true,
  },
  {
    title: "Germany region",
    host: "proxy.iproyal.com",
    description: "Routes your traffic through the Germany residential proxy pool.",
    accent: false,
  },
  {
    title: "US region",
    host: "us.proxy.iproyal.com",
    description: "Routes your traffic through the United States residential proxy pool.",
    accent: false,
  },
  {
    title: "Singapore region",
    host: "sg.proxy.iproyal.com",
    description: "Routes your traffic through the Singapore residential proxy pool.",
    accent: false,
  },
];

export default function Regions() {
  return (
    <section id="regions" className="py-12 section-alt">
      <div className="max-w-container mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Proxy regions (hosts)
          </h2>
          <p className="text-text-soft max-w-md">
            The host part of the proxy string selects which IPRoyal region you
            connect through.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region) => (
            <Card key={region.host}>
              <h3 className="font-semibold mb-2">{region.title}</h3>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-pill text-xs border mb-3 ${
                  region.accent
                    ? "border-accent/80 bg-accent/10 text-accent"
                    : "border-border-subtle/60 bg-card-alt/90"
                }`}
              >
                <code>{region.host}</code>
              </span>
              <p className="text-sm text-text-soft">{region.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
