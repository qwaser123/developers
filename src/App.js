import { db } from './index.js';
import 'firebase/firestore';
import firebase from 'firebase/app'; // 필요한 Firebase 모듈을 추가로 import할 수 있습니다.
import 'firebase/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from './img/devLogo.PNG';
import mainIntroProject from './img/mainIntroProject.PNG';
import Footer from './pages/Footer.js';
import ProjectDetail from './pages/ProjectDetail.js';
import MyProject from './pages/MyProject.js';
import MyLogin from './pages/Login';
import MySignUp from './pages/Signup.js';
import MyProjectWrite from './pages/ProjectWrite';
import ProjectPage from './pages/ProjectMain';
import profileImg from './img/profileImg.png';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Nav,
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectHub from './pages/ProjectHub.js';

function App() {
  const [isModal, setIsModal] = useState(false);
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
      {isModal === true ? (
        <Modal navigate={navigate} isModal={isModal} setIsModal={setIsModal} />
      ) : null}
      <MyNav
        setIsModal={setIsModal}
        isModal={isModal}
        navigate={navigate}
      ></MyNav>

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
                  <div className='mainIntroLeft'>
                    <p className='mainIntroText'>Project</p>
                    <p style={{ fontSize: '30px' }}>
                      사이드 프로젝트를 위한 팀원 모집 서비스.
                    </p>
                    <p style={{ fontSize: '20px' }}>
                      아이디어를 현실로 만들기 위한 파트너를 찾아보세요.{' '}
                    </p>
                    <p style={{ fontSize: '15px' }}>
                      함께 프로젝트를 시작하세요!{' '}
                    </p>
                    <Button
                      className='startBtn'
                      variant='dark'
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      자세히 보기
                    </Button>
                  </div>
                  <div
                    className='mainIntroRight'
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {' '}
                    <img
                      src={mainIntroProject}
                      alt='mainIntro 프로젝트 소개'
                      style={{
                        width: '50%',
                        marginTop: '150px',
                        marginLeft: '150px',
                      }}
                    />
                  </div>
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
              <div className='main-project'></div>
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
        <Route path='/project/detail/:id' element={<ProjectDetail />} />
        <Route path='/login' element={<MyLogin />} />
        <Route path='/signup' element={<MySignUp navigate={navigate}/>} />
        <Route path='/project/myproject' element={<MyProject navigate={navigate}/>} />
        <Route path='/project/myproject/:id' element={<ProjectHub />} />
        <Route path='*' element={<div>경로가 올바르지 않습니다</div>} />
      </Routes>
    </div>
  );
}

//nav바
function MyNav(props) {
  const [isLogin, setIsLogin] = useState('Log in');
  let [profileDropdown, setProfileDropdown] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(profileImg);
      } else {
        setIsLogin('Log in'); //FIXME: 로그인 안 되어있을시 '로그인'텍스트로 변경
      }
    });
  });
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
              프로젝트
            </Nav.Link>
            <Nav.Link className='navItem'>커뮤니티</Nav.Link>
            <Nav.Link className='navItem'>유저</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className='navItem rightNav'
              onClick={() => {
                props.setIsModal(!props.isModal);
                // props.navigate('project/projectWrite');
              }}
            >
              새 글 쓰기
            </Nav.Link>
            <Nav.Link className='navItem rightNav' id='loginProfile'>
              {isLogin === profileImg ? (
                <img
                  src={isLogin}
                  alt='프로필'
                  style={{ width: '30px' }}
                  onClick={() => {
                    setProfileDropdown(!profileDropdown);
                  }}
                />
              ) : (
                <p
                  onClick={() => {
                    props.navigate('/login');
                  }}
                >
                  {isLogin}
                </p>
              )}
              {profileDropdown === true ? (
                <Card
                  style={{
                    width: '10rem',
                    marginTop: '5px',
                    marginLeft: '-120px',
                    position: 'absolute',
                    zIndex: 1000,
                  }}
                >
                  <ListGroup variant='flush'>
                    <ListGroup.Item
                      onClick={() => {
                        setProfileDropdown(!profileDropdown);
                        props.navigate('/project/myproject')
                      }}
                    >
                      내 프로젝트
                    </ListGroup.Item>
                    <ListGroup.Item
                      onClick={() => {
                        setProfileDropdown(!profileDropdown);
                      }}
                    >
                      설정
                    </ListGroup.Item>
                    <ListGroup.Item
                      onClick={() => {
                        setProfileDropdown(!profileDropdown);
                        firebase.auth().signOut();
                      }}
                    >
                      로그아웃
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              ) : null}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
function Modal(props) {
  let [fade, setFade] = useState('');
  useEffect(() => {
    // 처음 렌더링 시에 클래스를 추가합니다.
    setFade('end');

    // 컴포넌트가 언마운트 될 때 타이머를 정리합니다.
  }, []);

  return (
    <>
      <div
        className='black-bg'
        onClick={(e) => {
          props.setIsModal(!props.isModal);
        }}
      >
        <div
          className={`white-bg start ${fade}`}
          onClick={(e) => e.stopPropagation()}
        >
          {' '}
          {/*이벤트 버블링 막음*/}
          <img src={logoImg} alt='로고' className='white-bg-img' />
          <h4>글 유형을 골라주세요</h4>
          <div
            className='white-bg-box cursorPointer'
            onClick={() => {
              props.navigate('/project/projectWrite');
              props.setIsModal(!props.isModal);
            }}
          >
            <p>사이드 프로젝트</p>
          </div>
          <div className='white-bg-box'>
            {' '}
            <p className='cursorPointer'>커뮤니티</p>
          </div>
        </div>
      </div>
    </>
  );
}
//TODO: 프로젝트리스트들 자동으로 넘어가게, footer 간단한걸로 변경
// 새글쓰기 : UI생성 - 프로젝트 or 스터디 or 커뮤니티
// nav바 호버 이벤트 확실하게. 아래에 색깔표시도 고려
//FIXME: navigate오류 ->useeffect 잘못 썼음
export default App;
