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
  const [isIdInput, setIsIdInput] = useState('');
  const [isPwdInput, setIsPwdInput] = useState('');
  let [isEnter, setIsEnter] = useState('');
  const [isEmailFocus, setIsEmailFocus] = useState('이메일');
  const [isPwdFocus, setIsPwdFocus] = useState('암호');
  //FIXME: 이메일, 비번이 비어있는지 확인하는걸 onchange메서드 안에 넣어놨더니 한 번 입력했다가 지워도 true가 됨.
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      if (isEnter == 0) {
        e.preventDefault();
        document.getElementById('login').click();
        setIsEnter(1);
        console.log(isEnter);
      }
    }
  });
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
              placeholder={isEmailFocus}
              id='email'
              aria-label='email'
              aria-describedby='basic-addon1'
              value={email}
              className='form-control large-width'
              onFocus={() => {
                setIsEmailFocus('');
              }}
              onBlur={() => {
                setIsEmailFocus('이메일');
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                if ({ email } == null) {
                  setIsIdInput(false);
                } else {
                  setIsIdInput(true);
                }
              }}
            />
          </InputGroup>
        </div>
        <div className='input-container'>
          <InputGroup>
            <InputGroup.Text id='basic-addon2'>🔑</InputGroup.Text>
            <Form.Control
              type='password'
              placeholder={isPwdFocus}
              aria-label='password'
              aria-describedby='basic-addon2'
              className='form-control large-width'
              value={pwd}
              onFocus={() => {
                setIsPwdFocus('');
              }}
              onBlur={() => {
                setIsPwdFocus('암호');
              }}
              onChange={(e) => {
                setPwd(e.target.value);
                if ({ pwd } == null) {
                  setIsPwdInput(false);
                } else {
                  setIsPwdInput(true);
                }
              }}
            />
          </InputGroup>
        </div>
        <div className='signupAndFindPwd'>
          <p>
            아직 회원이 아니신가요?{' '}
            <span
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => {
                navigate('/signup');
              }}
            >
              가입하기 {'>'}{' '}
            </span>{' '}
          </p>
          <p style={{ marginTop: '30px', cursor: 'pointer' }}>
            비밀번호를 잊으셨나요?{' '}
            <span style={{ fontWeight: 'bold' }}>비밀번호 찾기 {'>'} </span>
          </p>
        </div>
        <Button
          variant='dark'
          id='login'
          style={{ width: '250px', marginTop: '20px' }}
          onClick={() => {
            if (isIdInput == false) {
              alert('아이디 입력하시오');
            } else if (isPwdInput == false) {
              alert('비밀번호를 입력하시오');
            } else {
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
            }

           
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
