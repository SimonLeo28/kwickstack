import React from "react";

const Calendar = () =>  {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
    const events = [
      { date: "2025-01-28", time: "3:30", text: "Jan 28, 2025 3:30" },
      { date: "2025-02-03", time: "3:00", text: "Feb 3, 2025 3:00 pm" },
    ];
  
    const isCurrentDay = (date) => date === 12; // For demo purposes
  
    const hasEvent = (date) => {
      const dateStr = `2025-02-${date.toString().padStart(2, "0")}`;
      return events.some((event) => event.date === dateStr);
    };
  
    const renderCell = (date, isCurrentMonth = true) => {
      const cellClasses = `
        min-h-[80px] sm:min-h-[100px] p-1 sm:p-2 border border-gray-200 relative
        ${isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"}
        ${isCurrentDay(Number(date)) ? "bg-yellow-100" : ""}
      `.trim();
  
      return (
        <div key={date} className={cellClasses}>
          <span className="text-xs sm:text-sm">{date}</span>
          {hasEvent(Number(date)) && (
            <div className="mt-1">
              <span className="block bg-orange-500 text-white text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 rounded">
                {events.find((e) => e.date === `2025-02-${date.toString().padStart(2, "0")}`)?.text}
              </span>
            </div>
          )}
        </div>
      );
    };
  
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-7 sm:grid-cols-7 border-t border-l border-gray-200">
          {/* Header */}
          {days.map((day) => (
            <div key={day} className="p-1 sm:p-2 border-b border-r border-gray-200 font-medium text-center text-xs sm:text-sm">
              {day}
            </div>
          ))}
  
          {/* Previous month */}
          {[27, 28, 29, 30, 31].map((date) => renderCell(date, false))}
  
          {/* Current month */}
          {Array.from({ length: 28 }, (_, i) => renderCell(i + 1))}
  
          {/* Next month */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((date) => renderCell(date, false))}
        </div>
      </div>
    );
  }
  

export default Calendar;