import { useId, useMemo } from "react";

type StarRatingProps = {
  value: number;
  max?: number;
  size?: number;
  readOnly?: boolean;
  onChange?: (next: number) => void;
  className?: string;
  showValue?: boolean;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const StarRating = ({
  value,
  max = 5,
  size = 18,
  readOnly = true,
  onChange,
  className = "",
  showValue = false,
}: StarRatingProps) => {
  const uid = useId();
  const safeValue = clamp(value, 0, max);

  const stars = useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max],
  );

  return (
    <div
      className={`star-rating ${readOnly ? "star-rating--readonly" : ""} ${className}`.trim()}
      aria-label={`Rating: ${safeValue} out of ${max}`}
    >
      <div
        className="star-rating__stars"
        style={{ ["--star-size" as any]: `${size}px` }}
      >
        {stars.map((i) => {
          const fill =
            safeValue >= i ? 1 : safeValue > i - 1 ? safeValue - (i - 1) : 0; // 0..1

          const gradId = `star-grad-${uid}-${i}`;

          return (
            <button
              key={i}
              type="button"
              className="star-rating__starBtn"
              disabled={readOnly}
              onClick={() => onChange?.(i)}
              onMouseMove={(e) => {
                if (readOnly) return;
                // half-star based on mouse position (optional)
                const rect = (
                  e.currentTarget as HTMLButtonElement
                ).getBoundingClientRect();
                const isHalf = e.clientX - rect.left < rect.width / 2;
                onChange?.(isHalf ? i - 0.5 : i);
              }}
              aria-label={`Set rating to ${i}`}
            >
              <svg
                className="star-rating__star"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradId} x1="0" x2="1">
                    <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                    <stop offset={`${fill * 100}%`} stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* outline */}
                <path
                  className="star-rating__outline"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
                {/* fill */}
                <path
                  className="star-rating__fill"
                  fill={`url(#${gradId})`}
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {showValue ? (
        <span className="star-rating__value">{safeValue.toFixed(1)}</span>
      ) : null}
    </div>
  );
};

export default StarRating;
