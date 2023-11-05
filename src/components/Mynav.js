import { useEffect ,useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'firebase/firestore';
import firebase from 'firebase/app';
import profileImg from '../img/profileImg.png';
import { Card, Container, Nav, Navbar } from 'react-bootstrap';
import logoImg from '../img/devLogo.PNG';
export default function MyNav(props) {
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
            <img src={logoImg} alt='logoImg' style={{ width: '110px' }} />
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
                        props.navigate('/project/myproject');
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
