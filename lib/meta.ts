/** Read Meta (Facebook) tracking parameters from cookies and URL */
export function getMetaParams(): {
  fbp: string | null;
  fbc: string | null;
  fbclid: string | null;
} {
  const cookies = document.cookie.split("; ").reduce<Record<string, string>>((acc, c) => {
    const [key, ...val] = c.split("=");
    acc[key] = val.join("=");
    return acc;
  }, {});

  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get("fbclid");

  // If _fbc cookie is missing but fbclid exists, construct it
  // Format: fb.1.{timestamp}.{fbclid}
  let fbc = cookies["_fbc"] || null;
  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  return {
    fbp: cookies["_fbp"] || null,
    fbc,
    fbclid,
  };
}

/** Generate a unique event ID for Meta CAPI deduplication */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
