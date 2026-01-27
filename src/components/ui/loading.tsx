type SkeletonProps = {
  lines?: number;
  className?: string;
};

export const Skeleton = ({ lines = 5, className = "" }: SkeletonProps) => {
  return (
    <div
      className={`sk ${className}`.trim()}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="sk__bar sk__bar--title" />
      <div className="sk__bar sk__bar--sub" />

      <div className="sk__block">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="sk__row">
            <div className="sk__bar sk__bar--cell" />
            <div className="sk__bar sk__bar--cell" />
            <div className="sk__bar sk__bar--cell" />
            <div className="sk__bar sk__bar--cell" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
};
