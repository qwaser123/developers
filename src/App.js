import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from './img/devLogo.PNG';
import Footer from './pages/Footer.js';
import MyLogin from './pages/Login';
import MyProjectWrite from './pages/ProjectWrite';
import ProjectPage from './pages/ProjectMain';
import { db } from './index.js';
import 'firebase/firestore';
import firebase from 'firebase/app'; // 필요한 Firebase 모듈을 추가로 import할 수 있습니다.
import 'firebase/auth';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Nav,
  Navbar,
  Container,
  Button,
  Carousel,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  //텍스트 스크롤 애니메이션
  useEffect(() => {
    let observer = new IntersectionObserver((e) => {
      e.forEach((box) => {
        if (box.isIntersecting) {
          box.target.style.opacity = 1;
          box.target.style.transform = 'translateY(-50px)';
        }
      });
    });

    let elements = document.getElementsByClassName('mainAnimation');
    Array.from(elements).forEach((element) => {
      observer.observe(element);
    });

    return () => {
      Array.from(elements).forEach((element) => {
        observer.unobserve(element);
      });
    };
  });

  return (
    <div className='App'>
      <MyNav navigate={navigate}></MyNav>

      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='mainIntro'>
                <div className='mainAnimation'>
                  <p className='mainIntroText'>
                    사이드 프로젝트를
                    <br />
                    구하는 가장 <br />
                    쉽고 빠른 방법
                    {/*이거 한줄씩 나오게 할까 */}
                  </p>

                  <Button
                    className='startBtn'
                    variant='dark'
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    지금 시작하기
                  </Button>
                </div>
              </div>
              <div className='mainIntro secondIntro'>
                <div className='mainAnimation'>
                  <p className='mainIntroText'>Project</p>

                  <Button
                    className='startBtn'
                    variant='dark'
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    지금 시작하기
                  </Button>
                </div>
              </div>
              <div className='mainIntro'>
                <div className='mainAnimation'>
                  <p className='mainIntroText'>Community</p>

                  <Button
                    className='startBtn'
                    variant='dark'
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    지금 시작하기
                  </Button>
                </div>
              </div>
              <div className='mainIntro secondIntro'>
                <div className='mainAnimation'>
                  <p className='mainIntroText'>User</p>

                  <Button
                    className='startBtn'
                    variant='dark'
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    지금 시작하기
                  </Button>
                </div>
              </div>
              <div className='main-project'>
                <ProjectList></ProjectList>
              </div>
              <Footer></Footer>
            </>
          }
        />
        <Route
          path='/project/projectWrite'
          element={<MyProjectWrite />}
        ></Route>
        <Route path='/main' element={<div>로그인후 메인페이지</div>} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='/login' element={<MyLogin />} />
        <Route path='/signup' element={<div>회원가입페이지</div>} />
        <Route path='*' element={<div>경로가 올바르지 않습니다</div>} />
      </Routes>
    </div>
  );
}

//nav바
function MyNav(props) {
  return (
    <>
      <Navbar className='myNavbar'>
        <Container className='NavbarContainer'>
          <Navbar.Brand
            onClick={() => {
              props.navigate('/');
            }}
          >
            <img src={logoImg} alt='logoImg' style={{ width: '120px' }} />
          </Navbar.Brand>

          <Nav className='me-auto'>
            <Nav.Link
              className='navItem'
              onClick={() => {
                props.navigate('/project');
              }}
            >
              Project
            </Nav.Link>
            <Nav.Link className='navItem'>Community</Nav.Link>
            <Nav.Link className='navItem'>Users</Nav.Link>

            <Nav.Link
              className='navItem'
              onClick={() => {
                props.navigate('/login');
              }}
            >
              Log in
            </Nav.Link>

            <Nav.Link
              className='navItem'
              onClick={() => {
                props.navigate('/signup');
              }}
            >
              Sign up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

//TODO: 프로젝트리스트들 자동으로 넘어가게
function ProjectList() {
  return (
    <>
      <div className='container mt-3'>
        <div className='product'>
          <div className='thumbnail'>
            <div className='flex-grow-1 p-4'>
              <h5 className='title'>아기다스 신발</h5>
              <p className='date'>2030년 1월 8일</p>
              <p className='price'>20000원</p>
              <p className='floatEnd'>?0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
