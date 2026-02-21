import Card from "./ui/Card";

const components = [
  {
    title: "Host",
    description: "The proxy entry point, such as geo.iproyal.com or us.proxy.iproyal.com, which determines the region.",
  },
  {
    title: "Port",
    description: "The port from your IPRoyal residential proxy configuration. This usually comes from the dashboard or API.",
  },
  {
    title: "Username",
    description: "Your account or sub-user username used to authenticate with the proxy.",
  },
  {
    title: "Password",
    description: "Contains your password and, for residential proxies, additional options (like location/rotation) encoded as part of the string.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="max-w-container mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            How the proxy string works
          </h2>
          <p className="text-text-soft max-w-md">
            According to the IPRoyal documentation, the residential proxy string
            is built from four elements.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((component) => (
            <Card key={component.title} variant="mini">
              <h3 className="font-medium text-text-main mb-1.5">{component.title}</h3>
              <p>{component.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
