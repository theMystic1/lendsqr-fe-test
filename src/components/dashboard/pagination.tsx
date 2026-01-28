import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useMemo } from "react";
import { useCustomParams } from "../../hooks/useCustomParam";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type PageToken = number | "…";

const getPageTokens = (current: number, totalPages: number): PageToken[] => {
  const clamp = (n: number) => Math.max(1, Math.min(n, totalPages));
  const cur = clamp(current);

  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const head = [1, 2, 3];
  const tail = [totalPages - 2, totalPages - 1, totalPages];

  let midStart = cur - 1;
  let midEnd = cur + 1;

  if (midStart < 4) {
    midStart = 4;
    midEnd = 6;
  }
  if (midEnd > totalPages - 3) {
    midEnd = totalPages - 3;
    midStart = totalPages - 5;
  }

  const middle: number[] = [];
  for (let p = midStart; p <= midEnd; p++) middle.push(p);

  const tokens: PageToken[] = [...head];

  if (middle[0] > head[head.length - 1] + 1) tokens.push("…");

  for (const p of middle) {
    if (!tokens.includes(p)) tokens.push(p);
  }

  if (tail[0] > (tokens[tokens.length - 1] as number) + 1) tokens.push("…");

  for (const p of tail) {
    if (!tokens.includes(p)) tokens.push(p);
  }

  return tokens;
};

const Pagination = ({ page, pageSize, total, totalPages }: Props) => {
  const { getParam, updateMany } = useCustomParams();

  const currentPage = Number(getParam("page") ?? page ?? 1);
  const curPageSize = Number(getParam("pageSize") ?? pageSize ?? 10);

  const safeTotalPages = Math.max(1, totalPages || 1);
  const safePage = Math.max(1, Math.min(currentPage || 1, safeTotalPages));

  const goToPage = (next: number) => {
    const p = Math.max(1, Math.min(next, safeTotalPages));
    updateMany({ page: String(p) });
  };

  const pageTokens = useMemo(
    () => getPageTokens(safePage, safeTotalPages),
    [safePage, safeTotalPages],
  );

  const onChangePageSize = (value: string) => {
    updateMany({
      pageSize: value,
      page: "1", // ✅ reset to page 1 in the same update
    });
  };

  return (
    <div className=" w-full pagination">
      <div className="flex items-center gap-2">
        <p>Showing</p>

        <select
          name="perPage"
          className="select"
          onChange={(e) => onChangePageSize(e.target.value)}
          value={curPageSize}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <p>out of {total} </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="pagiBtn"
          disabled={safePage === 1}
          onClick={() => goToPage(safePage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {pageTokens.map((t, idx) =>
          t === "…" ? (
            <span key={`dots-${idx}`} className="pagiTxt">
              …
            </span>
          ) : (
            <button
              key={t}
              type="button"
              onClick={() => goToPage(t)}
              className={`pagiTxt ${t === safePage ? "pagiTxt__active" : ""}`}
              aria-current={t === safePage ? "page" : undefined}
            >
              {t}
            </button>
          ),
        )}

        <button
          className="pagiBtn"
          disabled={safePage === safeTotalPages}
          onClick={() => goToPage(safePage + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
