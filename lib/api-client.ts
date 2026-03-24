const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export async function apiClient<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...DEFAULT_HEADERS,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = "Error inesperado de API";

    try {
      const body = (await response.json()) as { error?: string };
      message = body.error ?? message;
    } catch {
      // Ignora parse errors y usa mensaje por defecto.
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}
