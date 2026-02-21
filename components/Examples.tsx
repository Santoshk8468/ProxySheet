import Card from "./ui/Card";

const curlExample = `curl -x http://HOST:PORT -U USERNAME:PASSWORD https://api.iproyal.com/`;

const pythonExample = `import requests

proxy = "HOST:PORT"
auth  = "USERNAME:PASSWORD"

proxies = {
    "http":  f"http://{auth}@{proxy}",
    "https": f"http://{auth}@{proxy}",
}

resp = requests.get("https://api.iproyal.com/", proxies=proxies)
print(resp.status_code, resp.text[:200])`;

export default function Examples() {
  return (
    <section id="examples" className="py-12 section-alt">
      <div className="max-w-container mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Using your proxy string
          </h2>
          <p className="text-text-soft max-w-md">
            Once you generate the proxy string, plug it into your tools as shown
            below.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-semibold mb-3">cURL example (HTTP)</h3>
            <pre className="p-3 bg-card-alt rounded-lg border border-card-alt/95 text-xs overflow-x-auto">
              <code className="font-mono text-text-main">{curlExample}</code>
            </pre>
            <p className="mt-3 text-xs text-text-soft">
              Replace <code className="text-accent">HOST:PORT:USERNAME:PASSWORD</code> with
              the values generated above.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">
              Python <code className="text-accent">requests</code> example
            </h3>
            <pre className="p-3 bg-card-alt rounded-lg border border-card-alt/95 text-xs overflow-x-auto whitespace-pre">
              <code className="font-mono text-text-main">{pythonExample}</code>
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}
