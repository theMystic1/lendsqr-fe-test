import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCustomParams } from "../../hooks/useCustomParam";

const Pagination = ({
  page,
  pageSize,
  total,
  totalPages,
}: {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { getParam, updateQuery } = useCustomParams();

  const currentPage = Number(getParam("page") ?? page ?? 1);
  const curPageSize = Number(getParam("pageSize") ?? pageSize ?? 10);

  const handlePage = (act: "inc" | "dec") => {
    const next =
      act === "inc"
        ? Math.min(currentPage + 1, totalPages)
        : Math.max(currentPage - 1, 1);

    updateQuery("page", String(next));
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <p>showing</p>
        <select
          name="perPage"
          id=""
          className="select"
          onChange={(e) => updateQuery("pageSize", e.target.value)}
          value={curPageSize}
        >
          {/* <option value="5">5</option> */}
          <option value="10">10 </option>
          <option value="20">20 </option>
          <option value="50">50 </option>
        </select>
        <p>out of {total}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="pagiBtn"
          disabled={currentPage === 1}
          onClick={() => handlePage("dec")}
        >
          <ChevronLeft />
        </button>
        {pages.map((pg, i) => (
          <p
            key={i}
            className={`pagiTxt ${pg === currentPage ? "pagiTxt__active" : ""}`}
          >
            {pg}
          </p>
        ))}
        <button
          className="pagiBtn"
          disabled={currentPage === pages.length}
          onClick={() => handlePage("inc")}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
