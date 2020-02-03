import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CatList = (props) => {
  const {
    loading,
    catImages
  } = props;

  // List of images that are loaded
  const [imageLoader, setLoader] = useState([]);

  if(catImages.length === 0){
    return(
      <Col>No cats available</Col>)
  }

  return(
    catImages.map((catImage, index) => {
      return(
        <Col key={catImage.id} sm={6} md={3} xs={12}>
          <Card style={{ width: '18rem'}}>
            {imageLoader.includes(catImage.id) ? null :
              <Card.Img 
                variant='top' 
                as='img' 
                height='160' 
                width='120'
                style={{
                  background: 'rgb(2,0,36) linear-gradient(90deg, rgba(2,0,36,1) 18%, rgba(46,46,52,1) 100%, rgba(0,212,255,1) 100%)'
                }}
            />
            }
            <Card.Img 
              variant='top' 
              src={catImage.url} 
              as='img' 
              height='160' 
              width='120'
              onLoad={() => setLoader([catImage.id, ...imageLoader])}
              style={{
                display: imageLoader.includes(catImage.id) ? undefined : 'none'
              }}
            />
            <Card.Body>
              <Button
                as={Link}
                variant='primary'
                to={{pathname: `/${catImage.id}`, state: {breed: catImage}}}
                block
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
          
          
        </Col>
      )
    })
  )
}

export default CatList;