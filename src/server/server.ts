import type { ListUsersParams, User } from "../types/type";
import { HttpError } from "./error";

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, ""); // trim trailing "/"

async function parseBody(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

async function request<T>(
  path: string,
  opts: { method?: string; body?: unknown; headers?: HeadersInit } = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: opts.method ?? "GET",
    headers: {
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...opts.headers,
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const data = await parseBody(res).catch(() => undefined);
    const message =
      (typeof data === "object" &&
        data &&
        "error" in (data as any) &&
        (data as any).error) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`;

    throw new HttpError(String(message), res.status, data);
  }

  if (res.status === 204) return undefined as T;

  return (await parseBody(res)) as T;
}

function buildUsersQuery(params: ListUsersParams = {}) {
  const sp = new URLSearchParams();

  if (params.page) sp.set("page", String(params.page));
  if (params.pageSize) sp.set("pageSize", String(params.pageSize));
  if (params.search) sp.set("search", String(params.search));
  if (params.q) sp.set("q", String(params.q));
  if (params.sortBy) sp.set("sortBy", String(params.sortBy));
  if (params.sortDir) sp.set("sortDir", String(params.sortDir));

  const f = params.filters;
  if (f) {
    if (f.organization) sp.set("organization", f.organization);
    if (f.userName) sp.set("userName", f.userName);
    if (f.emailAddress) sp.set("emailAddress", f.emailAddress);
    if (f.phoneNumber) sp.set("phoneNumber", f.phoneNumber.toString());
    if (f.status) sp.set("status", f.status);
    if (f.date) sp.set("date", f.date); // YYYY-MM-DD
  }

  return sp.toString();
}

export const listUsers = (params: ListUsersParams = {}) => {
  const qs = buildUsersQuery(params);

  // console.log(params);
  return request<{
    data: User[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    search: string;
  }>(`/users${qs ? `?${qs}` : ""}`);
};

export const login = (email: string, password: string) => {
  return request(`/auth/login`, {
    method: "POST",
    body: {
      email,
      password,
    },
  });
};

export const getUserById = (id: string) => {
  return request<User>(`/users/${encodeURIComponent(id)}`);
};

export const getOrganizations = () => {
  return request<{ organizations: string[]; statuses: string[] }>(`/filters`);
};

export const getStats = () => {
  return request<{
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  }>(`/stats`);
};

export const updateUser = (id: string, patch: Partial<User>) => {
  return request<User>(`/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: patch,
  });
};

export const deleteUser = (id: string) => {
  return request<{ ok: true }>(`/users/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};

export const addUser = (user: User) => {
  return request<User>(`/users`, {
    method: "POST",
    body: user,
  });
};
