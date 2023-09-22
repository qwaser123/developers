import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./index.js";
import Footer from "./Footer.js";
import "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { Nav, Navbar, Container, Button, Carousel } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <UncontrolledExample></UncontrolledExample>
      <div className="main-project">
        <ProjectList></ProjectList>
      </div>
      <Footer></Footer>
    </div>
  );
}

function UncontrolledExample() {
  return (
    <Carousel>
    <Carousel.Item>
        <div className='slidercontents'>
            <div className='wrapText'>
                <h1>Organic fresh fruits for your health</h1>
                <div className="d-none d-md-block">
                    <p>Interdum et malesuada fames ac ante ipsum primis in 
                    faucibus. Mauris eleifend sagittis mollis. 
                    Nulla finibus arcu eu tortor gravida aliquet</p>
                </div>
                <button>SHOP NOW</button>
            </div>
        </div>
    </Carousel.Item>
    {/* <Carousel.Item>
        <div className='slidercontents2'>
            <div className='wrapText'>
                <h1>Organic fresh fruits for your health</h1>
                <div className="d-none d-md-block">
                    <p>Interdum et malesuada fames ac ante ipsum primis in 
                    faucibus. Mauris eleifend sagittis mollis. 
                    Nulla finibus arcu eu tortor gravida aliquet</p>
                </div>
                <button>SHOP NOW</button>
            </div>
        </div>
    </Carousel.Item> */}
</Carousel>
  );
}

function ProjectList() {
  return (
    <>
      <div className="container mt-3">
        <div className="product">
          <div className="thumbnail">
            <div className="flex-grow-1 p-4">
              <h5 className="title">아기다스 신발</h5>
              <p className="date">2030년 1월 8일</p>
              <p className="price">20000원</p>
              <p className="floatEnd">?0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// db.collection('product').doc('상품3').set({제목 : '변기'} )

// db.collection("product")
//               .get()
//               .then((snapshot) => {
//                 snapshot.forEach((doc) => {

//                 });
//               });
export default App;
