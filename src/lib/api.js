const apiBase = import.meta.env.VITE_API_URL || "";

export async function apiRequest(path, options = {}) {
  const { timeout = 30000, headers = {}, ...requestOptions } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);
  const token = path.startsWith("/admin/") ? window.localStorage.getItem("wedding_admin_token") : "";
  let response;

  try {
    response = await fetch(`${apiBase}/api${path}`, {
      ...requestOptions,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(requestOptions.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      }
    });
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutError = new Error("REQUEST_TIMEOUT");
      timeoutError.code = "REQUEST_TIMEOUT";
      throw timeoutError;
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === "string" ? payload : payload.message;
    throw new Error(message || "Request failed");
  }

  return payload;
}

export async function downloadCsv() {
  const token = window.localStorage.getItem("wedding_admin_token");
  const response = await fetch(`${apiBase}/api/admin/export`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  if (!response.ok) {
    throw new Error("Export failed");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rsvp-export.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
