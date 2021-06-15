import React from "react";
import { Row, Col, Button } from "reactstrap";

const Main = (props) => {
  return (
    <div>
      <Row noGutters className="text-center align-items-center">
        <Col>
          <p>If yoou're looking for great pizza</p>
          <i className="fas fa-pizza-slice pizza-slice" style={{fontSize:'3rem' , color:'black'}}></i>
          <Button
            color="none"
            className="book-table-btn"
            onClick={(_) => {
              props.setPage(1);
            }}
          >
            Book a table
          </Button>
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col>
          <img src="./images/cafe-img.png" alt="cafe" className="big-img" />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
