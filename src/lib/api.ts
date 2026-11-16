const BASE = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.statusText || "Request failed",
    );
  }

  return response;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await request(path, init);

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function apiPage<T>(
  path: string,
): Promise<{ data: T; total: number }> {
  const response = await request(path);

  return {
    data: (await response.json()) as T,
    total: Number(response.headers.get("X-Total-Count") ?? 0),
  };
}
