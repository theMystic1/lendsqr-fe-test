import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MenuItem = {
  label: string;
  onClick: () => void | Promise<void>;
  icon: ReactNode;
};

export const RowMenu = ({ items }: { items: MenuItem[] }) => {
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const wrapEl = wrapRef.current;
      const panelEl = panelRef.current;

      const path = (e.composedPath?.() ?? []) as EventTarget[];

      const clickedInside =
        (wrapEl &&
          (wrapEl.contains(e.target as Node) || path.includes(wrapEl))) ||
        (panelEl &&
          (panelEl.contains(e.target as Node) || path.includes(panelEl)));

      if (!clickedInside) setOpen(false);
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

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    setOpen((v) => !v);
  };

  const handleItemClick =
    (it: MenuItem) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        await it.onClick();
      } finally {
        setOpen(false);
      }
    };

  return (
    <div ref={wrapRef} className="menu">
      <button
        ref={buttonRef}
        type="button"
        className="menu__trigger"
        onClick={handleMenuOpen}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreVertIcon fontSize="small" />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            className="menu__panel"
            role="menu"
            style={{
              position: "fixed",
              top: `${position.top}px`,
              right: `${position.right}px`,
              zIndex: 9999,
            }}
          >
            {items.map((it) => (
              <button
                key={it.label}
                type="button"
                className="menu__item flex items-center gap-2"
                role="menuitem"
                onClick={handleItemClick(it)}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
