import React, { useState } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import Table from "./Table";
const Book = (_) => {
  const [totalTables, setTotalTables] = useState([]);
  //    user selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Any location",
    size: 0,
  });

  // potential locations
  const [locations] = useState("Any Location", "Patio", "Outside");
  const [times, setTimes] = useState([
    "9am",
    "11am",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
  ]);
  //basic resvervation validation
  const [reservationError, setReservationError] = useState(false);
  const getDate = (_) => {
    const months = ["jan", "feb", "march"];
    const date =
      months[selection.date.getMonth()] +
      "" +
      selection.date.getDate +
      "" +
      selection.date.getFullYear();
    let time = selection.time > 12 ? time + 12 + ":00" : time + ":00";

    console.log(time);
    const datetime = new Date(date + "" + time);
    return datetime;
  };

  const getEmptyTables = (_) => {
    let tables = totalTables.filter((table) => table.isAvailable);
    return tables.length;
  };
  // user booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });
  return (
    <div>
      <p>Booking page</p>
    </div>
  );
};

export default Book;
