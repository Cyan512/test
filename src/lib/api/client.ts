import { ApiResponse } from "@/src/types/api-response"
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.criseral.com/api/v1"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  })

  let json: ApiResponse<T>
  try {
    json = await res.json()
  } catch {
    throw new ApiError(res.status, "Respuesta inválida del servidor")
  }

  if (!res.ok) {
    throw new ApiError(res.status, json.message, json.data)
  }

  return json.data
}
