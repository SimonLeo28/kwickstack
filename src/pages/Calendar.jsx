import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

function normalizeDate(raw) {
  const cleaned = raw.replace(" and", "");
  return parse(cleaned, "EEEE dd MMMM yyyy HH:mm", new Date());
}

export default function Calendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [view, setView] = useState("month");
  const [reminders, setReminders] = useState({});
  const [newReminder, setNewReminder] = useState("");
  const [showInputFor, setShowInputFor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

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
    fetch("https://backend.kwikstack.com/slotCalendar")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((event) => {
          const parts = event.date.split(" and ");
          const datePart = parts[0];
          const timePart = parts[1];

          if (!timePart) {
            console.warn("Invalid time for event:", event);
            return null;
          }

          const dateTimeString = `${datePart}, ${timePart}`;
          const dateObj = new Date(dateTimeString);

          if (isNaN(dateObj.getTime())) {
            console.warn("Invalid date for event:", event);
            return null;
          }

          return {
            id: event._id,
            date: dateObj,
            time: format(dateObj, "HH:mm"),
            subject: event.subject || "No Title",
            dateKey: format(dateObj, "yyyy-MM-dd")
          };
        }).filter(Boolean);

        setSlots(formatted);
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

          return (
            <div key={day.toString()} className="min-h-[90px] bg-gray-100 p-1">
              <div className="text-xs font-semibold text-gray-700">
                {format(day, "d")}
              </div>
              {daySlots.map((slot) => (
                <div key={slot.id} className="text-[10px] bg-blue-500 text-white px-1 py-0.5 mt-1 rounded">
                  {slot.time} — {slot.subject}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const colStartClasses = ["", "col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];
