import { useEffect, useState } from 'react';
import { db } from '../index.js';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import home from '../img/home.png';
import board from '../img/board.png';
import calendar from '../img/calendar.png';
import messageImg from '../img/message.png';

function ProjectHub() {
  let { id } = useParams();
  let [message, setMessage] = useState({});
  let [userMessage, setUserMessage] = useState('');
  useEffect(() => {
    db.collection('chatroom')
      .doc(id)
      .collection('messages')
      .get()
      .then((result) => {
        result.forEach((a) => {
          setUserMessage(a.data().content); //배열로 만들어서 집어넣어야 할듯
        });
      });
  }, [userMessage]);
  return (
    <>
      <div className='ProjectHubContainer'>
        <div className='ProjectHubSidebar'>
          {' '}
          <div className='ProjectHubFeature'>
            <p>
              <img src={home} style={{ width: '20px' }} alt='홈' /> 홈
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img src={board} style={{ width: '20px' }} alt='보드' /> 보드
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img src={calendar} style={{ width: '20px' }} alt='캘린더' /> 일정
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img src={messageImg} style={{ width: '20px' }} alt='메시지' />{' '}
              메세지
            </p>
          </div>
        </div>
        <div className='ProjectHubMain'>
          <div className='ProjectHubMainChat'>
            <div className='showChat'>
              <p>{userMessage}</p>
            </div>
            <div className='inputChat'>
              <textarea className='inputChatPlace'
                placeholder='채팅을 입력하세요'
                onChange={(e) => {
                  var messageContent = e.target.value;
                  setMessage((data) => ({
                    ...data,
                    content: messageContent,
                  }));
                }}
              />
              <button
                type='submit'
                style={{float:'right'}}
                onClick={(e) => {
                  db.collection('chatroom')
                    .doc(id)
                    .collection('messages')
                    .add(message);
                }}
              >
                전송{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectHub;
