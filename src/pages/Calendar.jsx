import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";
import Messages from './Messages'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export default function Calendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [view, setView] = useState("month");

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  // Sample events
  const events = [
    { date: new Date(2025, 0, 28, 15, 30), title: "Jan 28, 2025 3:30" },
    { date: new Date(2025, 1, 3, 15, 0), title: "Feb 3, 2025 3:00 pm" },
  ];

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-8 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="rounded-md px-4 py-2 text-sm font-semibold"
              onClick={() => setSelectedDay(today)}
            >
              today
            </Button>
            <div className="flex gap-1">
              <Button variant="secondary" onClick={previousMonth} className="p-2">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="secondary" onClick={nextMonth} className="p-2">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
          <div className="flex gap-1">
            <Button
              variant={view === "month" ? "default" : "secondary"}
              className="rounded-md px-4 py-2 text-sm font-semibold"
              onClick={() => setView("month")}
            >
              month
            </Button>
            <Button
              variant={view === "week" ? "default" : "secondary"}
              className="rounded-md px-4 py-2 text-sm font-semibold"
              onClick={() => setView("week")}
            >
              week
            </Button>
            <Button
              variant={view === "day" ? "default" : "secondary"}
              className="rounded-md px-4 py-2 text-sm font-semibold"
              onClick={() => setView("day")}
            >
              day
            </Button>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-4">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="grid grid-cols-7 text-sm gap-px bg-gray-200">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={cn("bg-white min-h-[120px] p-2", dayIdx === 0 && colStartClasses[getDay(day)])}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full mx-auto",
                  !isSameMonth(day, firstDayCurrentMonth) && "text-gray-400",
                  isEqual(day, selectedDay) && "bg-yellow-50",
                  isToday(day) && "text-white bg-primary",
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
              </button>
              {events.map((event, eventIdx) =>
                isSameDay(day, event.date) ? (
                  <div key={eventIdx} className="mt-2 px-2 py-1 text-xs rounded bg-orange-500 text-white">
                    {format(event.date, "h:mm aaa")}
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
      </div>
      <Messages />
    </div>
  );
}

const colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

