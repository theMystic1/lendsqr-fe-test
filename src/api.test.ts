import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const makeRes = (init: {
  ok: boolean;
  status: number;
  contentType?: string;
  json?: any;
  text?: string;
}) => {
  const headers = new Headers();
  if (init.contentType) headers.set("content-type", init.contentType);

  return {
    ok: init.ok,
    status: init.status,
    headers,
    json: vi.fn(async () => init.json),
    text: vi.fn(async () => init.text ?? ""),
  } as unknown as Response;
};

describe("API client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.resetModules();

    vi.stubEnv("VITE_API_URL", "https://lendsqr-be-rq0x.onrender.com");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("buildUsersQuery: includes page/pageSize/search/sort and filters", async () => {
    const mod = await import("./server/server");
    const { buildUsersQuery } = mod;

    const qs = buildUsersQuery({
      page: 2,
      pageSize: 20,
      search: "Hopper Bolton",
      sortBy: "createdAt" as any,
      sortDir: "desc",
      filters: {
        organization: "Lendsqr",
        userName: "hopper",
        emailAddress: "lendsqr.com",
        phoneNumber: "0706",
        status: "active",
        date: "2026-01-24",
      },
    });

    expect(qs).toContain("page=2");
    expect(qs).toContain("pageSize=20");
    expect(qs).toContain("search=Hopper+Bolton");
    expect(qs).toContain("sortBy=createdAt");
    expect(qs).toContain("sortDir=desc");

    expect(qs).toContain("organization=Lendsqr");
    expect(qs).toContain("userName=hopper");
    expect(qs).toContain("emailAddress=lendsqr.com");
    expect(qs).toContain("phoneNumber=0706");
    expect(qs).toContain("status=active");
    expect(qs).toContain("date=2026-01-24");
  });

  it("buildUsersQuery: does NOT include empty/undefined values", async () => {
    const mod = await import("./server/server");
    const { buildUsersQuery } = mod;

    const qs = buildUsersQuery({
      page: 1,
      filters: {
        organization: "",
        userName: undefined,
        emailAddress: "",
      },
    } as any);

    expect(qs).toContain("page=1");
    expect(qs).not.toContain("organization=");
    expect(qs).not.toContain("userName=");
    expect(qs).not.toContain("emailAddress=");
  });

  it("listUsers: calls fetch with correct URL and returns json", async () => {
    const fake = {
      data: [],
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 1,
      search: "",
    };

    const fetchMock = vi.fn<
      (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
    >(async () =>
      makeRes({
        ok: true,
        status: 200,
        contentType: "application/json",
        json: fake,
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    const { listUsers } = await import("./server/server");

    const res = await listUsers({ page: 1, pageSize: 10, search: "Hopper" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = String(fetchMock.mock.calls[0][0]);

    expect(calledUrl).toContain("https://lendsqr-be-rq0x.onrender.com/users");
    expect(calledUrl).toContain("page=1");
    expect(calledUrl).toContain("pageSize=10");
    expect(calledUrl).toContain("search=Hopper");

    expect(res).toEqual(fake);
  });

  it("request: sends JSON body and Content-Type on POST/PATCH", async () => {
    const fetchMock = vi.fn(async () =>
      makeRes({
        ok: true,
        status: 200,
        contentType: "application/json",
        json: { ok: true },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const { login, updateUser } = await import("./server/server");

    await login("a@b.com", "pass");
    expect(fetchMock).toHaveBeenCalled();
    const [, loginOpts] = fetchMock.mock.calls[0] as any[];
    expect(loginOpts.method).toBe("POST");
    expect(loginOpts.headers["Content-Type"]).toBe("application/json");
    expect(loginOpts.body).toContain("a@b.com");

    await updateUser("123", { status: "active" } as any);
    const [, patchOpts] = fetchMock.mock.calls[1] as any[];
    expect(patchOpts.method).toBe("PATCH");
    expect(patchOpts.headers["Content-Type"]).toBe("application/json");
    expect(patchOpts.body).toContain("active");
  });

  it("request: throws HttpError with backend JSON error message", async () => {
    const fetchMock = vi.fn(async () =>
      makeRes({
        ok: false,
        status: 401,
        contentType: "application/json",
        json: { error: "Invalid credentials" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const serverMod = await import("./server/server");
    const { login } = serverMod;

    const { HttpError } = await import("./server/error");

    await expect(login("x@y.com", "bad")).rejects.toBeInstanceOf(HttpError);

    try {
      await login("x@y.com", "bad");
    } catch (e: any) {
      expect(e.message).toBe("Invalid credentials");
      expect(e.status).toBe(401);
      expect(e.data).toEqual({ error: "Invalid credentials" });
    }
  });

  it("request: throws HttpError with text error if backend returns text/plain", async () => {
    const fetchMock = vi.fn(async () =>
      makeRes({
        ok: false,
        status: 500,
        contentType: "text/plain",
        text: "Server blew up",
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const serverMod = await import("./server/server");
    const { listUsers } = serverMod;

    const { HttpError } = await import("./server/error");

    await expect(listUsers()).rejects.toBeInstanceOf(HttpError);

    try {
      await listUsers();
    } catch (e: any) {
      expect(e.message).toBe("Server blew up");
      expect(e.status).toBe(500);
    }
  });
});
