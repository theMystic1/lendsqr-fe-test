import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "../../types/type";
import { getStats, listUsers } from "../../server/server";
import { stats } from "../../constants/constant";
import { formatNumber } from "../../utils/helpers";
import { Skeleton } from "../ui/loading";
import { UsersTable } from "./userTable";
import Pagination from "./pagination";
import Card from "../ui/card";

type Filters = {
  organization?: string;
  userName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  status?: string;
  date?: string;
};

type UserResponse = {
  data: User[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type StatsResponse = {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
};

const pickActiveFilters = (p: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(p).filter(([, v]) => v !== "" && v != null),
  ) as Filters;

const UserPage = () => {
  const location = useLocation();

  const [userData, setUserData] = useState<UserResponse>();
  const [statts, setStats] = useState<StatsResponse>();
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  // ✅ Single source of truth: URL
  const query = useMemo(() => {
    const sp = new URLSearchParams(location.search);

    const page = Number(sp.get("page") || 1);
    const pageSize = Number(sp.get("pageSize") || 10);
    const search = sp.get("search") || "";

    const rawFilters: Record<string, string> = {
      organization: sp.get("organization") || "",
      userName: sp.get("userName") || "",
      emailAddress: sp.get("emailAddress") || "",
      phoneNumber: sp.get("phoneNumber") || "",
      status: sp.get("status") || "",
      date: sp.get("date") || "",
    };

    const filters = pickActiveFilters(rawFilters);

    return { page, pageSize, search, filters };
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);

      // ✅ 1) fetch users FIRST and set immediately (so UI renders)
      try {
        const res = await listUsers({
          page: query.page,
          pageSize: query.pageSize,
          ...(Object.keys(query.filters).length
            ? { filters: query.filters }
            : {}),
          ...(query.search ? { search: query.search } : {}),
        });

        if (!cancelled) setUserData(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }

      // ✅ 2) fetch stats separately (failure shouldn't block table render)
      try {
        const stts = await getStats();
        if (!cancelled) setStats(stts);
      } catch (err) {
        console.error(err);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [query, refetchKey]);

  return (
    <div className="flex flex-col items-start gap-12 mt-12">
      <h2>Users</h2>

      <div className="grid grid-4 gap-4 w-full">
        {stats.map((st, i) => (
          <Card key={i}>
            <div className="card__header">
              <div className={`card__icon card__icon--${st.variant}`}>
                <img src={st.icon} alt="" />
              </div>
              <p>{st.title}</p>

              {/* ✅ correct dynamic key lookup */}
              <h3>{formatNumber(statts ? (statts as any)[st.variant] : 0)}</h3>
            </div>
          </Card>
        ))}
      </div>

      {userData ? (
        <>
          <Card className="card__tall relative">
            {loading ? (
              <Skeleton lines={userData.pageSize ?? 20} />
            ) : (
              <UsersTable users={userData.data} setRefetchKey={setRefetchKey} />
            )}
          </Card>

          <Pagination
            page={userData.page}
            pageSize={userData.pageSize}
            total={userData.total}
            totalPages={userData.totalPages}
          />
        </>
      ) : null}
    </div>
  );
};

export default UserPage;
