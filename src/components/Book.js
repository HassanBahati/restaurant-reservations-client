import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  DropdownToggle,
} from "reactstrap";
import Table from "./Table";
const Book = (props) => {
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

  useEffect(
    (_) => {
      //check availability of tables from db
      if (selection.time && selection.date) {
        // (async (_) => {
        let dateTime = getDate();
        let res = fetch("http://localhost:5000/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: dateTime,
          }),
        });
        res = res.json();
        //filter tables with locatioin and size cirtieria
        let tables = res.tables.filter(
          (table) =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Any location"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
        // });
      }
    },
    [selection.time, selection.date, selection.size, selection.location]
  );

  // make reservation if all details are filled out
  const reserve = async (_) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("incomplete details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:5000/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id,
        }),
      });
      res = await res.text();
      console.log("Reserved:" + res);
      props.setPage(2);
    }
  };
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  const getSizes = (_) => {
    let newSizes = [];
    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  const getLocations = (_) => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              locations: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });

    return newLocations;
  };

  const getTimes = (_) => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });

    const getTables = (_) => {
      console.log("get tables");
      if (getEmptyTables() > 0) {
        let tables = [];
        totalTables.forEach((table) => {
          if (table.isAvailable) {
            tables.push(
              <Table
                key={table._id}
                id={table._id}
                chairs={table.capacity}
                name={table.name}
                empty
                selectTable={selectTable}
              />
            );
          } else {
            tables.push(
              <Table
                key={table._id}
                id={table._id}
                chairs={table.capacity}
                name={table.name}
                selectTable={selectTable}
              />
            );
          }
        });
        return tables;
      }
    };
    return newTimes;
  };

  return (
    <div>
      <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
          <p className="looking-for-pizza">
            {!selection.table.id ? "Book a Table" : "confirm reservation"}
            <i
              className={
                !selection.table.id
                  ? "fas fa-chair pizza-slice"
                  : "fas fa-clipboard pizza-slice"
              }
            ></i>
          </p>
          <p className="selectd-table">
            {selection.table.id
              ? "you are booking table" + selection.table.name
              : null}
          </p>
          {reservationError ? (
            <p className="reservation-error">
              * please fill out all the details
            </p>
          ) : null}
        </Col>
      </Row>
      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T"[0])}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(e.target.value),
                    };
                    setSelection(newSel);
                  } else {
                    console.log("invalid selection");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>

            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0 ? "Select a party size": selection.size.toString() }
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className='table-display'>
            <Col>
            {getEmptyTables()>0? (
               <p className='available-tables'>
                 {getEmptyTables()} available
               </p>
            ):null}
            {selection.data && selection.time ? (
              getEmptyTables() > 0? (
                <div>
                  <div className='table-key'>
                    <span className='empty-table'>&nbsp; available &nbsp; &nbsp;</span>
                    <span className='full-table'>&nbsp; unavailable &nbsp; &nbsp;</span> 
                  </div>
                  <Row noGutters>{getTables()}</Row>
                </div>
              ):(
                <p className='table-display-message'>no available tables</p>
              )
            ): (
              
            )
          }</Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default Book;
