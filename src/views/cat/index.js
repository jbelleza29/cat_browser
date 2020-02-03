import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Cat = (props) => {
  const breedInfo = props.location && props.location.state && props.location.state.breed;
  const { name, origin, temperament, description } = breedInfo.breeds[0];

  return(
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Button onClick={() => props.history.goBack()}>
                Back
              </Button>
            </Card.Header>
            <Card.Img 
              as='img'
              variant='top'
              src={breedInfo.url}
            />
            <Card.Body>
              <h4>{name}</h4>
              <h5>Origin: {origin}</h5>
              <h6>Temperament: {temperament}</h6>
              <p>{description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cat;