import Card from "./ui/Card";

const features = [
  {
    title: "Statistics",
    description: "Interactive graphs for monitoring traffic usage over time, filtering by website and units (MB / GB), and downloading reports.",
  },
  {
    title: "Configuration",
    description: "Central place for proxy access, automatic top-ups, IP whitelisting, IP skipping, and domain filtering to fine-tune behavior.",
  },
  {
    title: "Proxy access",
    description: "Visual panel where you choose country, state/region, ISP, type, rotation, and more, then export formatted proxy lists.",
  },
  {
    title: "IP whitelisting",
    description: "Create entries that bind configuration presets to specific IPs so you can authenticate by IP instead of username/password.",
  },
  {
    title: "IP skipping",
    description: "Maintain skip-lists of IP ranges you do not want to receive; managed from the IP skipping panel in the Residential section.",
  },
  {
    title: "Domain filtering",
    description: "Configure which domains are allowed or blocked; when any allowed domains exist, all others are automatically blocked.",
  },
  {
    title: "Orders & subscription",
    description: "Track purchases, invoices, and manage pay-as-you-go or subscription plans (with optional quick top-ups and discounts).",
  },
  {
    title: "Sub-users",
    description: "Create sub-users with their own usernames, passwords, and allocated traffic, plus dedicated whitelists and proxy configs.",
  },
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-12">
      <div className="max-w-container mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Dashboard & configuration overview
          </h2>
          <p className="text-text-soft max-w-md">
            Summary of the main Residential dashboard sections described in the PDF documentation.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} variant="mini">
              <h3 className="font-medium text-text-main mb-1.5">{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
