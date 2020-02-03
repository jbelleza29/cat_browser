import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Select from '../../components/Select';
import CatList from '../home/components/CatList';

import axiosCustom from '../../api/api';

const ITEM_PER_ROW = 8;

function Home() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [breeds, setBreedSelect] = useState([]);
  const [loadMore, showLoadMore] = useState(false);
  const [breed, setBreed] = useState(localStorage.getItem('chosenBreed') );

  // get breeds on mount
  useEffect(() => {
    const fetchBreeds = async () => {
      await axiosCustom('/breeds',)
      .then((resp) => {
        setBreedSelect(resp.data);
        setLoading(false);
        fetchData(breed, true);
      })
      .catch((resp) => {
        console.error(resp);
        setLoading(false);
      })
    }
    fetchBreeds();
  }, []);
  
  const getImageByBreed = (currentPage, currentCats, currentBreed) => {
    const fetchData = async () => {
      let url = `/images/search?breed_id=${currentBreed}&limit=${ITEM_PER_ROW}&page=${currentPage}&order=desc`;
      await axiosCustom.get(url)
        .then((resp) => {
          if(resp.data.length === 0)
            showLoadMore(false);
          currentCats.push(...resp.data);
          setCats(currentCats);
          setBreed(currentBreed);
          setPage(currentPage);
          localStorage.setItem('chosenBreed', currentBreed);
          setLoading(false);
        })
        .catch((resp) => console.error(resp, 'error'));
    }
    setLoading(true);
    fetchData();
  }

  const fetchData = (currentBreed, stored=false) => {
    let currentPage = page;
    let currentCats = cats;
    let chosenBreed = localStorage.getItem('chosenBreed');
    currentBreed = currentBreed ? currentBreed : breed;

    if((currentBreed !== chosenBreed) || stored){
      showLoadMore(true);
      currentPage = 0;
      currentCats = [];
    }
    else
      currentPage = page + 1;
    
    getImageByBreed(currentPage, currentCats, currentBreed);
  }

  return(
    <Container>
      <Row>
        <Col>
          <h1>Cat Browser</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Select 
            options={breeds}
            label='Breeds'
            placeholder='Select a breed..'
            onChangeValue={(evt) => fetchData(evt.target.value)}
            value={breed}
            loading={loading}
          />
        </Col>
      </Row>
      <Row>
        <CatList catImages={cats} loading={loading}/>
      </Row>
      <Row style={{ paddingTop: '10px'}}>
        <Col>
          {
            (((Object.keys(cats).length % ITEM_PER_ROW) === 0) && loadMore) ? 
              <Button
                variant='success'
                onClick={() => fetchData(breed)}
                disabled={loading ? true: false}
              > 
                {loading ? 'Loading' : 'Load more..'}
              </Button> : null
          }  
        </Col>
      </Row>
    </Container>
  )
}

export default Home;