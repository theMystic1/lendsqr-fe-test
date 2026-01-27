import type { ListUsersParams, User } from "../types/type";
import users from "./data/users.json";

const DB = users as User[];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type SortDir = "asc" | "desc";

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const applySearch = (data: User[], q?: string): User[] => {
  const query = normalize(q);
  if (!query) return data;

  const tokens = query.split(/\s+/).filter(Boolean);

  return data.filter((u) => {
    const bag = normalize(
      [
        u.id,
        u.fullName,
        u.emailAddress,
        u.officeEmail,
        u.phoneNumber,
        u.bvn,
        u.gender,
        u.status,
        u.maritalStatus,
        u.employmentStatus,
        u.sectorOfEmployment,
        u.typeOfResidence,
        u.levelOfEducation,
        u.createdAt,
      ].join(" "),
    );

    return tokens.every((t) => bag.includes(t));
  });
};

const compare = (a: unknown, b: unknown) => {
  if (typeof a === "number" && typeof b === "number") return a - b;

  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;

  // string compare
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

export const applySort = (
  data: User[],
  sortBy?: keyof User,
  sortDir: SortDir = "asc",
): User[] => {
  if (!sortBy) return data;

  const dir = sortDir === "desc" ? -1 : 1;

  return [...data].sort((x, y) => dir * compare(x[sortBy], y[sortBy]));
};

export const applyPagination = <T>(
  data: T[],
  page = 1,
  pageSize = 10,
): Paginated<T> => {
  const safePageSize = Math.max(1, Math.min(pageSize, 100));
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const safePage = Math.max(1, Math.min(page, totalPages));

  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    data: data.slice(start, end),
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages,
  };
};

const normalize = (v: unknown) => {
  return String(v ?? "")
    .trim()
    .toLowerCase();
};

const includesCI = (field: unknown, input?: unknown) => {
  const a = normalize(field);
  const b = normalize(input);
  if (!b) return true;
  return a.includes(b);
};

const equalsCI = (field: unknown, input?: unknown) => {
  const a = normalize(field);
  const b = normalize(input);
  if (!b) return true;
  return a === b;
};

const isSameDay = (isoDate: string, ymd?: string) => {
  if (!ymd) return true;
  if (!isoDate) return false;
  return isoDate.slice(0, 10) === ymd;
};

const applyUiFilters = (data: User[], filters?: ListUsersParams["filters"]) => {
  if (!filters) return data;

  const { organization, userName, emailAddress, phoneNumber, status, date } =
    filters;

  return data.filter((u) => {
    const okOrg = equalsCI(u.organization, organization);
    const okUser = includesCI(u.userName, userName);
    const okEmail = includesCI(u.emailAddress, emailAddress);
    const okPhone = includesCI(String(u.phoneNumber), phoneNumber);
    const okStatus = equalsCI(u.status, status);
    const okDate = isSameDay(u.createdAt, date);

    return okOrg && okUser && okEmail && okPhone && okStatus && okDate;
  });
};

export const listUsers = async (params: ListUsersParams = {}) => {
  await delay(300);

  const {
    page = 1,
    pageSize = 10,
    q,
    filters,
    sortBy,
    sortDir = "asc",
  } = params;

  let result = DB;

  result = applySearch(result, q);

  result = applyUiFilters(result, filters);

  result = applySort(result, sortBy, sortDir);

  // console.log(result);

  return applyPagination(result, page, pageSize);
};

export const getOrganizations = async () => {
  await delay(200);

  return Array.from(
    new Set(DB.map((u) => (u.organization ?? "").trim()).filter(Boolean)),
  );
};

export const getUserById = async (id: string) => {
  await delay(250);
  return DB.find((u) => u.id === id) ?? null;
};
