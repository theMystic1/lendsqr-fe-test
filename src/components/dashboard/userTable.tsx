import type { TableHeader, User, UserStatus } from "../../types/type";
import Table, { TableOverflow, TBody, Td, Th, THead, Tr } from "./table";
import { capitalizeFirst, formatDate } from "../../utils/helpers";
import { IMgs } from "../../constants/constant";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import FilterDropDown from "../ui/filterDrop";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { RowMenu } from "../ui/menu";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../server/server";
import toast from "react-hot-toast";
import { useCustomParams } from "../../hooks/useCustomParam";

const columns: TableHeader[] = [
  { id: "org", header: "ORGANIZATION", accessor: "organization" },
  { id: "user", header: "USERNAME", accessor: "userName" },
  { id: "email", header: "EMAIL", accessor: "emailAddress" },
  { id: "phone", header: "PHONE NUMBER", accessor: "phoneNumber" },
  { id: "date", header: "DATE JOINED", accessor: "createdAt" },
  { id: "status", header: "STATUS", accessor: "status" },
  {
    id: "actions",
    header: "",
    accessor: "action",
  },
];

// phone, date, email

export const UsersTable = ({
  users = [],
  setRefetchKey,
}: {
  users: User[];
  setRefetchKey?: Dispatch<SetStateAction<number>>;
}) => {
  const [openFilter, setOpenFilter] = useState<string>("");
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { updateQuery, getParam } = useCustomParams();

  const pageSize = getParam("pageSize") || 10;

  useEffect(() => {
    if (!openFilter) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = tableRef.current;
      if (!el) return;

      // If click is outside the table wrapper, close
      if (!el.contains(e.target as Node)) {
        setOpenFilter("");
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      } as any);
    };
  }, [openFilter]);

  const handleActivation = async (
    status: UserStatus,
    type: "activation" | "blacklist",
    id: string,
  ) => {
    try {
      const newPage = +pageSize;

      toast.loading("updating user....");
      if (type === "activation") {
        await updateUser(id, {
          status: status === "active" ? "inactive" : "active",
        });
      } else {
        await updateUser(id, {
          status: status === "blacklisted" ? "active" : "blacklisted",
        });
      }

      toast.remove();
      toast.success("User update successful......");
      updateQuery("pageSize", "");
      updateQuery("pageSize", newPage.toString());
      setRefetchKey?.((num: number) => num + 1);
    } catch (error: any) {
      const err = error.message || "Operation failed";

      toast.remove();
      toast.error(err);
    }
  };

  return (
    <div ref={tableRef}>
      <TableOverflow>
        <Table>
          <THead>
            <Tr>
              {columns.map((th) => (
                <Th
                  key={th.id}
                  onClick={(e) => {
                    e?.stopPropagation();
                    if (th.id === "actions") return;
                    setOpenFilter((prev) => (prev === "" ? th.id : ""));
                  }}
                  className={th.id}
                >
                  <div className="flex items-center gap-2">
                    <span>{th.header}</span>
                    {th.id === "actions" ? null : (
                      <img src={IMgs.filterIcon} alt="Filter icon" />
                    )}
                  </div>
                </Th>
              ))}
            </Tr>

            {openFilter ? <FilterDropDown /> : null}
          </THead>

          <TBody>
            {users.map((usr) => (
              <Tr key={usr.id}>
                <Td>{capitalizeFirst(usr.organization)}</Td>
                <Td>{usr.fullName}</Td>
                <Td className="email">{usr.emailAddress}</Td>
                <Td className="phone">{usr.phoneNumber}</Td>
                <Td className="date">{formatDate(usr.createdAt)}</Td>
                <Td>
                  <TableStatus variant={usr.status} />
                </Td>
                <Td>
                  <RowMenu
                    items={[
                      {
                        label: "View Details",
                        onClick: () => navigate(usr.id),
                        icon: <VisibilityOutlinedIcon />,
                      },
                      {
                        label:
                          usr.status === "blacklisted"
                            ? "Remove blacklist"
                            : "Blacklist user",
                        onClick: async () =>
                          handleActivation(usr.status, "blacklist", usr.id),
                        icon: <PersonOffOutlinedIcon />,
                        // isAsync: true,
                      },
                      {
                        label:
                          usr.status === "active"
                            ? "De-activate user"
                            : "Activate user",
                        onClick: async () =>
                          handleActivation(usr.status, "activation", usr.id),
                        icon: <PersonAddAltOutlinedIcon />,
                        // isAsync: true,
                      },
                    ]}
                  />
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableOverflow>
    </div>
  );
};

const TableStatus = ({ variant }: { variant: UserStatus }) => {
  const variantClass =
    variant === "inactive"
      ? "outline"
      : variant === "blacklisted"
        ? "danger"
        : variant;
  return (
    <button className={`btn--${variantClass}`}>
      {capitalizeFirst(variant)}
    </button>
  );
};
