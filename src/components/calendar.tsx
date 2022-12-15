/* Calendar.tsx component */

import { NextPage } from "next";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { useEffect } from "react";

interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
}

interface Props {
  events: NewEvent[];
  calendars: string[];
}

const TimeCalendar: NextPage<Props> = (props) => {
  const { events, calendars } = props;
  useEffect(() => {
    console.log(events);
  }, []);
  const newCalendars = calendars.map((calendar) => {
    var randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    return { id: calendar, name: calendar, backgroundColor: randomColor };
  });

  return (
    <div className="w-full">
      <Calendar
        usageStatistics={false}
        week={{ eventView: ["time"], taskView: false }}
        isReadOnly={true}
        calendars={newCalendars}
        events={events}
      />
    </div>
  );
};

export default TimeCalendar;
