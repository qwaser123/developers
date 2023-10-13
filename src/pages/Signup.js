import { useState } from "react";
import 'firebase/firestore';
import firebase from 'firebase/app'; // 필요한 Firebase 모듈을 추가로 import할 수 있습니다.
import 'firebase/auth';
import { db } from '../index';
import { Navigate } from "react-router-dom";
function SignUp(props) {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [pwd, setPwd] = useState('');
  return (
    <>
      <div className='projectWriteMainContainer'>
        {' '}
        <div className='projectWriteMainCenter'>
        <p>이름</p>
        <input type='text' onChange={(e)=> {
            setName( e.target.value);

        }}></input>
        <p>이메일</p>
        <input type='email' onChange={(e)=> {
             setEmail( e.target.value);

        }}></input>
        <p>비번</p>
        <input type='password' onChange={(e)=> {
            setPwd( e.target.value);

        }}></input><br></br>
        <button type="submit" onClick={()=> {
            firebase.auth().createUserWithEmailAndPassword(email, pwd).then( (result)=> {
                alert('완료');
                result.user.updateProfile( {displayName : name} )
                var 유저정보 = {name: name, email: email}
                db.collection('user').doc(result.user.uid).set(유저정보)
                props.navigate('/project');
            })
        }}>등록하기</button>
      </div>
      </div>
    </>
  );
}

export default SignUp;
