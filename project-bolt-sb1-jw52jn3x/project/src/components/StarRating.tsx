import { Star } from 'lucide-react';
import { useState, useCallback, memo } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export const StarRating = memo(function StarRating({ value, onChange }: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleStarClick = useCallback((star: number) => {
    onChange(star);
  }, [onChange]);

  return (
    <div className="flex gap-1 select-none">
      {[1, 2, 3, 4].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          className="focus:outline-none select-none touch-none bg-transparent"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <Star
            className={`w-6 h-6 pointer-events-none transition-colors duration-200 ease-in-out ${
              star <= (hoveredStar || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>

  );
});
