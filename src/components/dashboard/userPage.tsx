import { useEffect, useMemo, useState } from "react";
import type { User } from "../../types/type";
import { useCustomParams } from "../../hooks/useCustomParam";
import { listUsers } from "../../server/server";
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
  const [loading, setLoading] = useState(false);

  const { getParam, getMany } = useCustomParams();

  const currentPage = Number(getParam("page") || 1);
  const curPageSize = Number(getParam("pageSize") || 10);

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
          ...(Object.keys(filters).length ? { filters } : {}), // only include if any exists
        });

        setUserData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [curPageSize, currentPage]);

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
              <h3>{formatNumber(st.value)}</h3>
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
              <UsersTable users={userData.data!} />
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
