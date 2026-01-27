import type { TableHeader, User, UserStatus } from "../../types/type";
import Table, { TBody, Td, Th, THead, Tr } from "./table";
import { capitalizeFirst } from "../../utils/helpers";
import { IMgs } from "../../constants/constant";
import { useEffect, useRef, useState } from "react";
import FilterDropDown from "../ui/filterDrop";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { RowMenu } from "../ui/menu";
import { useNavigate } from "react-router-dom";

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

export const UsersTable = ({ users }: { users: User[] }) => {
  const [openFilter, setOpenFilter] = useState<string>("");
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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

  return (
    <div ref={tableRef}>
      <Table>
        <THead>
          <Tr>
            {columns.map((th) => (
              <Th
                key={th.id}
                onClick={(e) => {
                  e?.stopPropagation();
                  if (th.id === "actions") return;
                  setOpenFilter((prev) => (prev === th.id ? "" : th.id));
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{th.header}</span>
                  {th.id === "actions" ? null : (
                    <img src={IMgs.filterIcon} alt="Filter icon" />
                  )}
                </div>

                {openFilter === th.id ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <FilterDropDown />
                  </div>
                ) : null}
              </Th>
            ))}
          </Tr>
        </THead>

        <TBody>
          {users.map((usr) => (
            <Tr key={usr.id}>
              <Td>{capitalizeFirst(usr.organization)}</Td>
              <Td>{usr.fullName}</Td>
              <Td>{usr.emailAddress}</Td>
              <Td>{usr.phoneNumber}</Td>
              <Td>{usr.createdAt}</Td>
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
                      label: "Blacklist user",
                      onClick: () => {},
                      icon: <PersonOffOutlinedIcon />,
                    },
                    {
                      label: "Activate user",
                      onClick: () => {},
                      icon: <PersonAddAltOutlinedIcon />,
                    },
                  ]}
                />
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
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
