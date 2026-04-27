const BASE = "https://api.jsonbin.io/v3";

interface CreateBinOptions {
  apiKey: string;
  name: string;
  data: unknown;
}

export async function createBin(opts: CreateBinOptions): Promise<string> {
  const res = await fetch(`${BASE}/b`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": opts.apiKey,
      "X-Bin-Name": opts.name,
      "X-Bin-Private": "true",
    },
    body: JSON.stringify(opts.data),
  });
  if (!res.ok) throw new Error(`Create bin failed: ${res.status}`);
  const json = (await res.json()) as { metadata?: { id?: string } };
  const id = json.metadata?.id;
  if (!id) throw new Error("Create bin returned no id");
  return id;
}

export async function updateBin(
  apiKey: string,
  binId: string,
  data: unknown
): Promise<void> {
  const res = await fetch(`${BASE}/b/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": apiKey,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update bin failed: ${res.status}`);
}

export async function readBin<T>(apiKey: string, binId: string): Promise<T> {
  const res = await fetch(`${BASE}/b/${binId}/latest`, {
    headers: { "X-Master-Key": apiKey },
  });
  if (!res.ok) throw new Error(`Read bin failed: ${res.status}`);
  const json = (await res.json()) as { record: T };
  return json.record;
}
