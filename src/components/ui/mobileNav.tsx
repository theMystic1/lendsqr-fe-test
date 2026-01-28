import { useState } from "react";
import { useEffect } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { NavItems } from "../dashboard/sideBar";
import { Logo } from "../dashboard/navBar";

type NavItem = { label: string; to: string };

type Props = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  title?: string;
};

export function MobileSidebarNav({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={`mnav ${open ? "mnav--open" : ""}`} aria-hidden={!open}>
      <button
        className="mnav__overlay"
        onClick={onClose}
        aria-label="Close menu"
        type="button"
      />

      <aside className="mnav__panel side-nav" role="dialog" aria-modal="true">
        <div className="mnav__header">
          <p className="mnav__title"></p>
          <Logo />
          <button className="mnav__close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <NavItems />
      </aside>
    </div>
  );
}

const items = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Users", to: "/users" },
  { label: "Loans", to: "/loans" },
];

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(true)} type="button">
        <MenuOutlinedIcon />
      </button>

      <MobileSidebarNav
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        title="Navigation"
      />
    </>
  );
}
