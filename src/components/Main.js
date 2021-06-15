import React from "react";
import { Row, Col, Button } from "reactstrap";

const Main = props => {
  return (
    <div>
      <Row noGutters className="text-center align-items-center">
        <Col>
          <p>If yoou're looking for great pizza</p>
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
      <Row noGutters className='text-center big-img-container'>
          <Col>
          <img src={''} alt='cafe' className='big-img' /></Col>
      </Row>
    </div>
  );
};

export default Main;
