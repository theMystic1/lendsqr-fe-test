import { useEffect, useRef, useState, type ReactNode } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MenuItem = {
  label: string;
  onClick: () => void;
  icon: ReactNode;
};

export const RowMenu = ({ items }: { items: MenuItem[] }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="menu">
      <button
        type="button"
        className="menu__trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreVertIcon fontSize="small" />
      </button>

      {open ? (
        <div className="menu__panel" role="menu">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              className="menu__item flex items-center gap-2"
              role="menuitem"
              onClick={() => {
                it.onClick();
                setOpen(false);
              }}
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
