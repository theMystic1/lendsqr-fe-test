import { useEffect, useMemo, useState } from "react";
import type { User } from "../../types/type";
import { useCustomParams } from "../../hooks/useCustomParam";
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

const UserPage = () => {
  const [userData, setUserData] = useState<{
    data: User[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>();
  const [statts, setStats] = useState<{
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  }>();
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  const { getParam, getMany } = useCustomParams();

  const currentPage = Number(getParam("page") || 1);
  const curPageSize = Number(getParam("pageSize") || 10);
  const search = getParam("search") || "";

  const params = useMemo(
    () =>
      getMany<{
        organization: string;
        userName: string;
        emailAddress: string;
        phoneNumber: string;
        status: string;
        date: string;
      }>(
        [
          "organization",
          "userName",
          "emailAddress",
          "phoneNumber",
          "status",
          "date",
        ],
        { status: "" },
      ),

    [getMany],
  );

  // console.log(params);

  const pickActiveFilters = (p: Record<string, string>) =>
    Object.fromEntries(
      Object.entries(p).filter(
        ([, v]) => v !== "" && v !== null && v !== undefined,
      ),
    ) as Filters;

  const filters = useMemo(() => pickActiveFilters(params), [params]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await listUsers({
          page: currentPage,
          pageSize: curPageSize,
          ...(Object.keys(filters).length ? { filters } : {}),
          ...(search ? { search } : {}),
          // search,
        });

        const stts = await getStats();

        setUserData(res);
        setStats(stts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [curPageSize, currentPage, refetchKey, search]);

  // console.log(statts);

  return (
    <div className="flex flex-col items-start gap-12 mt-12">
      <h2>Users</h2>
      <div className="grid grid-4 gap-4 w-full">
        {stats.map((st, i) => (
          <Card key={i}>
            <div className="card__header">
              <div className={`card__icon card__icon--${st.variant}`}>
                {/* <AddAPhotoTwoToneIcon /> */}
                <img src={st.icon} />
              </div>

              <p>{st.title}</p>
              <h3>{formatNumber(statts?.[st.variant as "activeUsers"])}</h3>
            </div>
          </Card>
        ))}
      </div>

      {userData ? (
        <>
          <Card className=" card__tall relative">
            {loading ? (
              <Skeleton lines={curPageSize ?? 20} />
            ) : (
              <UsersTable
                users={userData.data!}
                setRefetchKey={setRefetchKey}
              />
            )}
          </Card>

          <Pagination
            page={userData.page!}
            pageSize={userData.pageSize!}
            total={userData.total!}
            totalPages={userData.totalPages!}
          />
        </>
      ) : null}
    </div>
  );
};

export default UserPage;
