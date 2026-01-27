import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import CustomBtn from "./button";
import { getOrganizations } from "../../server/server";
import { useCustomParams } from "../../hooks/useCustomParam";
import Card from "./card";

const FilterDropDown = () => {
  const [orgs, setOrgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState({
    organization: "",
    userName: "",
    emailAddress: "",
    phoneNumber: "",
    status: "",
    date: "",
  });
  const { updateMany } = useCustomParams();

  const hasValue = (v: unknown) => v !== "" && v !== null && v !== undefined;

  const handleChange = (
    name:
      | "organization"
      | "userName"
      | "emailAddress"
      | "phoneNumber"
      | "status"
      | "date",
    value: string,
  ) => {
    setFilterState((fil) => ({
      ...fil,
      [name]: value,
    }));
  };

  const handleFilter = (type: "clear" | "update") => {
    const updates: Record<string, string> =
      type === "clear"
        ? Object.fromEntries(Object.keys(filterState).map((k) => [k, ""]))
        : Object.fromEntries(
            Object.entries(filterState).map(([k, v]) => [k, String(v)]),
          );

    Object.entries(filterState).forEach(([k, v]) => {
      if (hasValue(v)) updates[k] = String(v);
      else updates[k] = "";
    });

    updateMany(updates);

    // single setSearchParams update (requires hook support)
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const res = await getOrganizations();

        setOrgs(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="absolute w-64 stackHigh">
      <Card className="card__border stackHigh">
        <Column className="gap-6">
          <Input
            label="Organization"
            placeholder="Select"
            type="text"
            isSelect
            values={loading ? orgs : orgs}
            value={filterState.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
          />
          <Input
            label="Username"
            placeholder="User"
            type="text"
            value={filterState.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
          />
          <Input
            label="Email"
            placeholder="Email"
            type="email"
            onChange={(e) => handleChange("emailAddress", e.target.value)}
            value={filterState.emailAddress}
          />
          <Input
            label="Date"
            placeholder="Date"
            type="date"
            onChange={(e) => handleChange("date", e.target.value)}
            value={filterState.date}
          />
          <Input
            label="Phone Number"
            placeholder="Phone Number"
            type="number"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            value={filterState.phoneNumber}
          />
          <Input
            label="Status"
            placeholder="Select"
            type="text"
            isSelect
            values={["inactive", "blacklisted", "pending", "active"]}
            onChange={(e) => handleChange("status", e.target.value)}
            value={filterState.status}
          />

          <Row className="gap-4">
            <CustomBtn
              variant="secondary"
              onClick={() => handleFilter("clear")}
            >
              Reset
            </CustomBtn>
            <CustomBtn variant="primary" onClick={() => handleFilter("update")}>
              Filter
            </CustomBtn>
          </Row>
        </Column>
      </Card>
    </div>
  );
};

export default FilterDropDown;

export const Column = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex flex-col `}>{children}</div>;
};
export const Row = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex  items-center `}>{children}</div>;
};

const Label = ({ label, className }: { label: string; className?: string }) => {
  return (
    <label htmlFor={label} className={`${className}`}>
      {label}
    </label>
  );
};

export const Input = ({
  label,
  className,
  type,
  placeholder,
  labelClass,
  isSelect,
  values,
  onChange,
  value,
}: {
  label: string;
  className?: string;
  type?: "text" | "email" | "date" | "number" | "password";
  placeholder?: string;
  labelClass?: string;
  isSelect?: boolean;
  values?: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) => {
  return (
    <Column>
      <Label className={`gap-2 ${labelClass}`} label={label} />
      {isSelect ? (
        <select
          name={label}
          id={label}
          className="input"
          onChange={onChange}
          value={value}
        >
          <option value="">select</option>
          {values?.map((vl) => (
            <option key={vl} value={vl}>
              {vl}
            </option>
          ))}
        </select>
      ) : (
        <div className={`input ${className}`}>
          <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />

          {type === "password" ? <button className="__btn">SHOW</button> : null}
        </div>
      )}
    </Column>
  );
};
