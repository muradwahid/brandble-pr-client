import { useState, useRef, useCallback } from 'react';

export default function PriceRangeSlider({
  min = 0,
  max = 10000,
  step = 100,
  valueMin,      // controlled min value
  valueMax,      // controlled max value
  defaultMin = 1000,
  defaultMax = 8000,
  onChange,
}) {
  // Controlled vs Uncontrolled logic
  const isControlledMin = valueMin !== undefined;
  const isControlledMax = valueMax !== undefined;

  const [internalMin, setInternalMin] = useState(
    isControlledMin ? valueMin : defaultMin
  );
  const [internalMax, setInternalMax] = useState(
    isControlledMax ? valueMax : defaultMax
  );

  const currentMin = isControlledMin ? valueMin : internalMin;
  const currentMax = isControlledMax ? valueMax : internalMax;

  // Refs to avoid stale closures during dragging
  const minRef = useRef(currentMin);
  const maxRef = useRef(currentMax);
  const draggingRef = useRef(null); // 'min' | 'max' | null

  minRef.current = currentMin;
  maxRef.current = currentMax;

  const trackRef = useRef(null);

  const getValueFromX = useCallback((x) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    return Math.round((min + percent * (max - min)) / step) * step;
  }, [min, max, step]);

  const emit = useCallback((newMin, newMax) => {
    if (!isControlledMin) setInternalMin(newMin);
    if (!isControlledMax) setInternalMax(newMax);
    onChange && onChange({ min: newMin, max: newMax });
  }, [isControlledMin, isControlledMax, onChange]);

  // Unified move handler (mouse + touch)
  const handleMove = useCallback((clientX) => {
    if (!draggingRef.current) return;

    const newVal = getValueFromX(clientX);

    if (draggingRef.current === 'min') {
      const val = Math.min(newVal, maxRef.current - step);
      emit(val, maxRef.current);
    } else {
      const val = Math.max(newVal, minRef.current + step);
      emit(minRef.current, val);
    }
  }, [getValueFromX, step, emit]);

  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleEnd = useCallback(() => {
    draggingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleEnd);
  }, []);

  const startDrag = (type) => (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    e.preventDefault();
    e.stopPropagation();

    draggingRef.current = type;

    const newVal = getValueFromX(clientX);
    if (type === 'min') {
      emit(Math.min(newVal, maxRef.current - step), maxRef.current);
    } else {
      emit(minRef.current, Math.max(newVal, minRef.current + step));
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  };

  // Click on track → move closest thumb
  const handleTrackClick = (e) => {
    if (draggingRef.current) return;
    if (e.target.closest('[data-thumb]')) return;

    const clicked = getValueFromX(e.clientX);
    const moveMin = Math.abs(clicked - currentMin) <= Math.abs(clicked - currentMax);

    if (moveMin) {
      emit(Math.min(clicked, currentMax - step), currentMax);
    } else {
      emit(currentMin, Math.max(clicked, currentMin + step));
    }
  };

  const minPercent = ((currentMin - min) / (max - min)) * 100;
  const maxPercent = ((currentMax - min) / (max - min)) * 100;

  return (
    <div className="w-full select-none">

      <div className="relative">
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="absolute inset-x-0 top-1/2 -translate-y-1 h-1 bg-[#B2B5B8] rounded-full cursor-pointer"
        >
          {/* Filled range */}
          {/* <div
            className="absolute h-full bg-[#002747] rounded-full transition-all duration-100"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          /> */}

          {/* Min Thumb */}
          <div
            data-thumb
            onMouseDown={startDrag('min')}
            onTouchStart={startDrag('min')}
            className="absolute top-1/2 -translate-x-1 -translate-y-1/2 w-4 h-4 bg-[#878C91] rounded-full shadow-xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
            style={{ left: `${minPercent}%` }}
          />

          {/* Max Thumb */}
          <div
            data-thumb
            onMouseDown={startDrag('max')}
            onTouchStart={startDrag('max')}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#002747] rounded-full shadow-xl cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
            style={{ left: `${maxPercent}%` }}
          />
        </div>
      </div>
      <div className="pt-3 flex justify-between text-[16px] text-[#002747]">
        <span>${currentMin.toLocaleString()}</span>
        <span>${currentMax.toLocaleString()}</span>
      </div>
    </div>
  );
}