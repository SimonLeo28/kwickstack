import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

function normalizeDate(raw) {
  // raw example: "Thursday 31 July 2025"
  return parse(raw, "EEEE dd MMMM yyyy", new Date());
}

export default function Calendar() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [reminderDates, setReminderDates] = useState(new Set());

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const intervalStart = startOfWeek(startOfMonth(firstDayCurrentMonth));
  const intervalEnd = endOfWeek(endOfMonth(firstDayCurrentMonth));
  const days = eachDayOfInterval({ start: intervalStart, end: intervalEnd });

  function previousMonth() {
    setCurrentMonth(format(add(firstDayCurrentMonth, { months: -1 }), "MMM-yyyy"));
  }
  function nextMonth() {
    setCurrentMonth(format(add(firstDayCurrentMonth, { months: 1 }), "MMM-yyyy"));
  }

  useEffect(() => {
    setLoadingSlots(true);
    fetch("https://kwikstack-admin-backend.onrender.com/slotCalendar")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event) => {
          const parts = event.date.split(" and ");
          const datePart = parts[0]; // e.g., "Thursday 31 July 2025"
          const timePart = parts[1];

          let dateObj = normalizeDate(datePart); // parse without time first

          if (timePart) {
            const dateTimeString = `${datePart} ${timePart}`;
            const parsedWithTime = new Date(dateTimeString);
            if (!isNaN(parsedWithTime.getTime())) {
              dateObj = parsedWithTime;
            }
          }

          if (isNaN(dateObj.getTime())) {
            console.warn("Invalid date for event:", event);
            return null;
          }

          return {
            id: event._id,
            date: dateObj,
            time: timePart || "N/A",
            subject: event.subject || "No Title",
            dateKey: format(dateObj, "yyyy-MM-dd")
          };
        }).filter(Boolean);

        setSlots(formatted);

        // 🔑 Extract reminder dates into a Set for fast lookup
        const reminderKeys = new Set(formatted.map((f) => f.dateKey));
        setReminderDates(reminderKeys);

        setLoadingSlots(false);
      })
      .catch((error) => {
        console.error("Error fetching slot data:", error);
        setSlotsError("Failed to load slots.");
        setLoadingSlots(false);
      });
  }, []);

  const slotsByDate = useMemo(() => {
    const map = {};
    for (const s of slots) {
      if (s.dateKey) {
        if (!map[s.dateKey]) map[s.dateKey] = [];
        map[s.dateKey].push(s);
      }
    }
    return map;
  }, [slots]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      {/* header + controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <Button onClick={previousMonth}><ChevronLeft /></Button>
          <Button onClick={nextMonth}><ChevronRight /></Button>
          <Button onClick={() => setCurrentMonth(format(today, "MMM-yyyy"))}>Today</Button>
        </div>
        <h2 className="text-lg font-bold">{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
      </div>

      {loadingSlots && <p>Loading slots...</p>}
      {slotsError && <p className="text-red-600">{slotsError}</p>}

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="font-medium text-gray-600">{d}</div>
        ))}
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const daySlots = slotsByDate[dateKey] || [];

          // 🎨 Apply highlight classes
          const isTodayDate = isSameDay(day, today);
          const isReminderDate = reminderDates.has(dateKey);

          const highlightClass = isTodayDate
            ? "bg-green-500 text-white font-bold"
            : isReminderDate
              ? "bg-yellow-300 font-semibold"
              : "bg-gray-100";

          return (
            <div
              key={day.toString()}
              className={`min-h-[90px] p-1 rounded ${highlightClass}`}
            >
              <div className="text-xs">{format(day, "d")}</div>
              {daySlots.map((slot) => (
                <div
                  key={slot.id}
                  className="text-[10px] bg-blue-500 text-white px-1 py-0.5 mt-1 rounded"
                >
                   {slot.subject}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
