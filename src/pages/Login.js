import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import 'firebase/firestore';
import { db } from '../index.js';
import firebase from 'firebase/app'; // 필요한 Firebase 모듈을 추가로 import할 수 있습니다.
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MyLogin() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  let navigate = useNavigate();
  return (
    <>
      <div className='loginBox'>
        <p className='loginTxt'>로그인</p>
        <div className='input-container' style={{ marginTop: '40px' }}>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>✉</InputGroup.Text>
            <Form.Control
              type='email'
              placeholder='이메일'
              id='email'
              aria-label='email'
              aria-describedby='basic-addon1'
              value={email}
              className='form-control large-width'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputGroup>
        </div>
        <div className='input-container'>
          <InputGroup>
            <InputGroup.Text id='basic-addon2'>🔑</InputGroup.Text>
            <Form.Control
              type='password'
              placeholder='암호'
              aria-label='password'
              aria-describedby='basic-addon2'
              className='form-control large-width'
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </InputGroup>
        </div>
        <div className="signupAndFindPwd">
        <p>아직 회원이 아니신가요? <span style={{fontWeight:'bold'}} onClick={()=> {
          navigate('/signup')
        }}>가입하기 {'>'}  </span> </p>
        <p style={{marginTop:'30px'}}>비밀번호를 잊으셨나요?  <span style={{fontWeight:'bold'}}>비밀번호 찾기 {'>'}  </span></p>
        </div>
        <Button
          variant='dark'
          id='login'
          style={{ width: '250px', marginTop: '20px' }}
          onClick={() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, pwd)
              .then((result) => {
                alert('로그인 성공');
                navigate('/main');
              })
              .catch((error) => {
                alert('로그인 실패');
              });

            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
              }
            });
          }}
        >
          로그인
        </Button>
        <br></br>
      </div>
    </>
  );
}

//TODO: 입력칸 누르면 placeholder 작아지면서 위로->
// translateY주고 포커스, 블러 이벤트 핸들러
// LogIn, SignUp 오른쪽으로 옮기거나 프로필로 변경하기 

