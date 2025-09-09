import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";

const DayPicker = ({ onChange, setToggle }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateState, setSelectedDateState] = useState(null);

  const today = useMemo(() => new Date(), []);
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Handle month navigation
  const handleMonthChange = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  // Handle year navigation
  const handleYearChange = (offset) => {
    setCurrentDate(new Date(year + offset, month, 1));
  };

  // Handle month selection from the month view
  const handleMonthSelect = (selectedMonth) => {
    setCurrentDate(new Date(year, selectedMonth, 1));
  };

  // Handle day selection
  const handleDayClick = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDateState(newDate);
  };

  const getDayClasses = (day) => {
    const isToday =
      todayDate === day && todayMonth === month && todayYear === year;

    const isSelected =
      selectedDateState &&
      selectedDateState.getDate() === day &&
      selectedDateState.getMonth() === month &&
      selectedDateState.getFullYear() === year;

    let classes =
      "w-7 h-7 flex items-center justify-center rounded-[4px] cursor-pointer transition-colors duration-200";

    if (isToday && !isSelected) {
      classes += " font-bold text-blue-600";
    } else if (isSelected) {
      classes += " bg-black text-white font-bold";
    } else {
      classes += " text-gray-800 hover:bg-gray-200";
    }
    return classes;
  };

  const clearSelection = () => {
    setSelectedDateState(null);
    setCurrentDate(new Date());
  };

  const getMonthName = (monthIndex) => {
    return new Date(year, monthIndex, 1).toLocaleString("default", {
      month: "long",
    });
  };

  const handleOkayClick = () => {
    setToggle(false);
    if (onChange) {
      onChange(selectedDateState);
    }
  };

  // Render the calendar header with navigation controls
  const renderCalendarHeader = () => (
    <div className="flex justify-between items-center p-4 border border-[#F2F2F3] rounded-[8px]">
      <div className="flex items-center gap-6">
        <div className="flex gap-1.5">
          <button
            onClick={() => handleYearChange(-1)}
            className=""
            aria-label="Previous year"
          >
            <ChevronsLeft className="w-5 h-5 text-[#B2B5B8] border border-[#B2B5B8] rounded-[4px] " />
          </button>
          <button
            onClick={() => handleMonthChange(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-[#B2B5B8] border border-[#B2B5B8] rounded-[4px] " />
          </button>
        </div>
        <div className="text-nowrap font-semibold text-gray-800 flex-grow text-center">
          <button className="text-[#5F6368]">
            {getMonthName(month)}, {year}
          </button>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => handleMonthChange(1)} aria-label="Next month">
            <ChevronRight className="w-5 h-5 text-[#B2B5B8] border border-[#B2B5B8] rounded-[4px] " />
          </button>
          <button onClick={() => handleYearChange(1)} aria-label="Next year">
            <ChevronsRight className="w-5 h-5 text-[#B2B5B8] border border-[#B2B5B8] rounded-[4px] " />
          </button>
        </div>
      </div>
      <button
        onClick={clearSelection}
        className="bg-[#F2F2F3] text-xs text-[#4A4C56] rounded-[4px] px-1 py-0.5 font-medium ml-4 cursor-pointer"
      >
        Clear
      </button>
    </div>
  );

  // Render the calendar grid
  const renderCalendar = () => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const days = [];

    // Fill in leading blank days for the first week
    const numBlanks = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < numBlanks; i++) {
      days.push(
        <div
          key={`blank-${i}`}
          className="w-10 h-10 flex items-center justify-center text-gray-400"
        >
          {new Date(year, month, -(numBlanks - i - 1)).getDate()}
        </div>
      );
    }

    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={`day-${i}`}
          className={getDayClasses(i)}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    // Fill in trailing blank days
    const totalSlots = numBlanks + daysInMonth;
    const trailingBlanks = 42 - totalSlots; // 6 weeks * 7 days
    for (let i = 1; i <= trailingBlanks; i++) {
      days.push(
        <div
          key={`blank-after-${i}`}
          className="w-10 h-10 flex items-center justify-center text-gray-400"
        >
          {new Date(year, month + 1, i).getDate()}
        </div>
      );
    }

    return (
      <div className="p-4 border border-[#F2F2F3] rounded-[8px]">
        <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm text-gray-500 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="w-10 text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2.5 text-center text-sm">
          {days}
        </div>
      </div>
    );
  };

  // Render the month selection grid
  const renderMonthView = () => {
    const months = Array.from({ length: 12 }, (_, i) => getMonthName(i));
    return (
      <div className="p-4 grid my-2 grid-cols-3 gap-2 border border-[#F2F2F3] rounded-[8px]">
        {months.map((monthName, index) => (
          <button
            key={monthName}
            onClick={() => handleMonthSelect(index)}
            className={`py-0.5 px-2 text-[#171819] text-start rounded-[4px] hover:bg-[#F2F2F3] cursor-pointer text-sm transition-colors ${
              monthName === getMonthName(month) ? "bg-[#F2F2F3]" : ""
            }`}
          >
            {monthName}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-sm font-[Inter] text-sm">
      {renderCalendarHeader()}
      {renderMonthView()}
      {renderCalendar()}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleOkayClick}
          className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default DayPicker;
