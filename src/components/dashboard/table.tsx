import type { ReactNode } from "react";
import type { Childrentype } from "../../types/type";

const TableOverflow = ({ children }: Childrentype) => {
  return <div className="overflow">{children}</div>;
};
const Table = ({ children }: Childrentype) => {
  return <table className="table">{children}</table>;
};

const THead = ({ children }: Childrentype) => {
  return <thead>{children}</thead>;
};
const TBody = ({ children }: Childrentype) => {
  return <tbody>{children}</tbody>;
};

const Tr = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <tr className="table__tr" onClick={onClick}>
      {children}
    </tr>
  );
};
const Td = ({ children, className }: Childrentype) => {
  return <td className={`table__td ${className}`}>{children}</td>;
};
const Th = ({ children, onClick, className }: Childrentype) => {
  return (
    <th className={`table__th ${className}`} onClick={onClick}>
      {children}
    </th>
  );
};

export { THead, TBody, Tr, Td, Th, TableOverflow };

export default Table;
