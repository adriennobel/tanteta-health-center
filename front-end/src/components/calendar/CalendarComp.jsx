import { useState } from "react";
import "./calendar-comp.css"

function CalendarComp({ callBack }) {

  const TODAY = new Date();
  const TODAY_ISODATE = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).toISOString().split('T')[0];

  const [counter, setCounter] = useState(0);
  const [selectedDate, setSelectedDate] = useState(TODAY_ISODATE);

  function loadCalendar(counter) {
    // DATE FORMAT USED IN SERVICES: 2024-01-01T09:00.000Z // ALL TIMES STORED IN UTC
    const currentYear = TODAY.getFullYear();
    const currentMonth = TODAY.getMonth() + counter;

    let currentMonthEndDate = new Date(currentYear, currentMonth + 1, 0);
    let currentMonthDays = currentMonthEndDate.getDate();
    let currentMonthISO = currentMonthEndDate.toISOString().slice(0, 7); // YYYY-MM
    let previousMonthEndWeekday = new Date(currentYear, currentMonth, 0).getDay() + 1;

    function createDateDetails(index) {
      const DATE = new Date(currentYear, currentMonth, index - previousMonthEndWeekday);
      const ISODATE = DATE.toISOString().split('T')[0];
      const DAYNUM = DATE.getDate();
      return { ISODATE, DAYNUM };
    }

    let rowsHtml = [];

    for (let row = 0; row < 6; row++) {
      let rowHtml = [];

      for (let col = 0; col < 7; col++) {
        const INDEX = row * 7 + col + 1; // 1-based index
        const KEY = INDEX + counter * 42;
        const { ISODATE, DAYNUM } = createDateDetails(INDEX);
        const TITLE = new Date(ISODATE + "T00:00").toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        const ARIALABEL = "Showing appointments for " + TITLE;

        if (INDEX <= previousMonthEndWeekday) {
          rowHtml.push(
            <td key={KEY}>
              <input type="radio" name={"calendar-" + currentMonthISO} id={ISODATE} checked={false} onChange={() => viewDayOfPrevMonth(ISODATE)} aria-label={ARIALABEL} className="calendar-number-day-input" />
              <label htmlFor={ISODATE} title={TITLE} className="calendar-number-day-label prev-day">{DAYNUM}</label>
            </td>
          );
        } else if (INDEX > previousMonthEndWeekday && INDEX <= currentMonthDays + previousMonthEndWeekday) {
          const CHECKED = ISODATE == selectedDate;
          const TODAYCLASS = ISODATE == TODAY_ISODATE ? " today" : "";
          rowHtml.push(
            <td key={KEY}>
              <input type="radio" name={"calendar-" + currentMonthISO} id={ISODATE} checked={CHECKED} onChange={() => viewDay(ISODATE)} aria-label={ARIALABEL} className="calendar-number-day-input" />
              <label htmlFor={ISODATE} title={TITLE} className={"calendar-number-day-label" + TODAYCLASS}>{DAYNUM}</label>
            </td>
          );
        } else {
          rowHtml.push(
            <td key={KEY}>
              <input type="radio" name={"calendar-" + currentMonthISO} id={ISODATE} checked={false} onChange={() => viewDayOfNextMonth(ISODATE)} aria-label={ARIALABEL} className="calendar-number-day-input" />
              <label htmlFor={ISODATE} title={TITLE} className="calendar-number-day-label next-day">{DAYNUM}</label>
            </td>
          );
        }
      }
      rowsHtml.push(<tr key={row}>{rowHtml}</tr>);
    }
    return rowsHtml;
  }

  function getCurrentMonthTitle(counter) {
    const currentMonthStartDate = new Date(TODAY.getFullYear(), TODAY.getMonth() + counter, 1);
    const currentMonthTitle = currentMonthStartDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    return currentMonthTitle
  }

  function viewDay(ISODATE) {
    setSelectedDate(ISODATE);
    callBack(ISODATE);
  }

  function nextMonth() {
    const firstDateOfNextMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1 + counter, 1);
    setCounter(count => count + 1);
    viewDay(firstDateOfNextMonth.toISOString().split('T')[0]);
  }

  function prevMonth() {
    const firstDateOfPrevMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1 + counter, 1);
    setCounter(count => count - 1);
    viewDay(firstDateOfPrevMonth.toISOString().split('T')[0]);
  }

  function viewDayOfNextMonth(ISODATE) {
    setCounter(count => count + 1);
    viewDay(ISODATE);
  }

  function viewDayOfPrevMonth(ISODATE) {
    setCounter(count => count - 1);
    viewDay(ISODATE);
  }

  return (
    <>
      <div className="calendar-component">
        <div className="calendar-header">
          <h3 className="current-month-div">
            {getCurrentMonthTitle(counter)}
          </h3>
          <div className="calendar-navigation">
            <button onClick={() => prevMonth()} title="Go to previous month" aria-label="Go to previous month">&lt;</button>
            <button onClick={() => nextMonth()} title="Go to next month" aria-label="Go to next month">&gt;</button>
          </div>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              <th title="Sunday">S</th>
              <th title="Monday">M</th>
              <th title="Tuesday">T</th>
              <th title="Wednesday">W</th>
              <th title="Thursday">T</th>
              <th title="Friday">F</th>
              <th title="Saturday">S</th>
            </tr>
          </thead>
          <tbody>
            {loadCalendar(counter)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CalendarComp