import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Users from "./users";
import * as usersApi from "../server/server";

vi.mock("../server/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../server/server")>();
  return {
    ...actual,
    listUsers: vi.fn(),
    getStats: vi.fn(),
  };
});

const listUsersMock = vi.mocked(usersApi.listUsers);
const getStatsMock = vi.mocked(usersApi.getStats);

const makeApiUsers = () => [
  {
    id: "1",
    organization: "Lendsqr",
    userName: "Hopper Bolton",
    phoneNumber: "0900000000",
    createdAt: "2026-01-01T00:00:00.000Z",
    status: "Active",

    orgName: "Lendsqr",
    fullName: "Hopper Bolton",

    email: "hopper@lendsqr.com",
    emailAddress: "hopper@lendsqr.com",
    email_address: "hopper@lendsqr.com",
  },
];

const renderUsers = (initialEntries: string[] = ["/users"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Users />
    </MemoryRouter>,
  );

const expectLastListUsersCall = (expected: {
  page: number;
  pageSize: number;
}) => {
  const call = listUsersMock.mock.calls.at(-1) ?? [];
  const [arg1] = call;

  if (typeof arg1 === "object" && arg1) {
    expect(arg1).toMatchObject(expected);
    return;
  }

  if (typeof arg1 === "number") expect(arg1).toBe(expected.page);
};

async function getTbody() {
  const table = await screen.findByRole("table");
  const rowgroups = within(table).getAllByRole("rowgroup");
  return rowgroups[1];
}

describe("Users page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads users on mount (positive)", async () => {
    getStatsMock.mockResolvedValueOnce({
      totalUsers: 1,
      activeUsers: 1,
      usersWithLoans: 0,
      usersWithSavings: 0,
    } as any);

    listUsersMock.mockResolvedValueOnce({
      data: makeApiUsers(),
      users: makeApiUsers(),
      total: 1,
      totalPages: 1,
    } as any);

    renderUsers(["/users?page=1&pageSize=10"]);

    expect(
      await screen.findByRole("heading", { name: "Users" }),
    ).toBeInTheDocument();

    const tbody = await getTbody();
    expect(await within(tbody).findByText("Hopper Bolton")).toBeInTheDocument();
    expect(await within(tbody).findByText("Lendsqr")).toBeInTheDocument();
    expect(await within(tbody).findByText("0900000000")).toBeInTheDocument();
    expect(
      await within(tbody).findByRole("button", { name: /active/i }),
    ).toBeInTheDocument();

    await waitFor(() => expectLastListUsersCall({ page: 1, pageSize: 10 }));
  });

  it("handles API failure and does not crash (negative)", async () => {
    getStatsMock.mockResolvedValueOnce({
      totalUsers: 0,
      activeUsers: 0,
      usersWithLoans: 0,
      usersWithSavings: 0,
    } as any);

    listUsersMock.mockRejectedValueOnce(new Error("Network down"));

    renderUsers(["/users?page=1&pageSize=10"]);

    expect(
      await screen.findByRole("heading", { name: "Users" }),
    ).toBeInTheDocument();

    await waitFor(() => expect(listUsersMock).toHaveBeenCalled());
  });

  it("pagination: clicking next updates query param and refetches (positive)", async () => {
    getStatsMock.mockResolvedValueOnce({
      totalUsers: 50,
      activeUsers: 10,
      usersWithLoans: 0,
      usersWithSavings: 0,
    } as any);

    listUsersMock
      .mockResolvedValueOnce({
        data: makeApiUsers(),
        users: makeApiUsers(),
        total: 50,
        totalPages: 5,
      } as any)
      .mockResolvedValueOnce({
        data: makeApiUsers(),
        users: makeApiUsers(),
        total: 50,
        totalPages: 5,
      } as any);

    renderUsers(["/users?page=1&pageSize=10"]);

    const tbody = await getTbody();
    expect(await within(tbody).findByText("Hopper Bolton")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /next page/i }));

    await waitFor(() => expectLastListUsersCall({ page: 2, pageSize: 10 }));
  });

  it("pageSize change resets page to 1 and refetches (positive)", async () => {
    getStatsMock.mockResolvedValueOnce({
      totalUsers: 100,
      activeUsers: 20,
      usersWithLoans: 0,
      usersWithSavings: 0,
    } as any);

    listUsersMock
      .mockResolvedValueOnce({
        data: makeApiUsers(),
        users: makeApiUsers(),
        total: 100,
        totalPages: 10,
      } as any)
      .mockResolvedValueOnce({
        data: makeApiUsers(),
        users: makeApiUsers(),
        total: 100,
        totalPages: 5,
      } as any);

    renderUsers(["/users?page=3&pageSize=10"]);

    const tbody = await getTbody();
    expect(await within(tbody).findByText("Hopper Bolton")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole("combobox"), "20");

    await waitFor(() => expectLastListUsersCall({ page: 1, pageSize: 20 }));
  });
});
