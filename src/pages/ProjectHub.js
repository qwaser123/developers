import { useEffect, useState } from 'react';
import { db } from '../index.js';
import firebase from 'firebase/app';
import { Route, Routes, useParams } from 'react-router-dom';
import home from '../img/home.png';
import board from '../img/board.png';
import calendar from '../img/calendar.png';
import messageImg from '../img/message.png';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function ProjectHub() {
  return (
    <>
      <div className='ProjectHubContainer'>
        <div className='ProjectHubSidebar'>
          {' '}
          <div className='ProjectHubFeature'>
            <p>
              <img src={home} style={{ width: '35px' }} alt='홈' /> 홈
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img src={board} style={{ width: '35px' }} alt='보드' /> 보드
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img src={calendar} style={{ width: '35px' }} alt='캘린더' /> 일정
            </p>
          </div>
          <div className='ProjectHubFeature'>
            <p>
              <img
                src={messageImg}
                style={{ width: '35px' }}
                onClick={() => {
                  // props.navigate('/project/myproject/:id/chat');
                }}
                alt='메시지'
              />{' '}
              메세지
            </p>
          </div>
        </div>
        <div className='ProjectHubMain'>
          <HubChat />
          <HubCalendar />
        </div>
      </div>
    </>
  );
}

function HubChat(props) {
  let { id } = useParams();
  let [message, setMessage] = useState({});
  let [haveBeenChat, setHaveBeenChat] = useState(false);
  let [messageContent, setMessageContent] = useState('');
  let [isLogged, setIsLogged] = useState('left');
  const messageKey = Object.keys(message);
  useEffect(() => {
    db.collection('chatroom')
      .doc(id)
      .collection('messages')
      .onSnapshot((result) => {
        const newData = {};
        result.forEach((a) => {
          newData[a.id] = {
            content: a.data().content,
            date: a.data().date,
          };
        }, setMessage(newData));
      });
  }, []);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogged('right');
      }
    });
  });
  return (
    <div className='ProjectHubMainChat'>
      <div
        className='showChat'
        // style={{float:isLogged}}
      >
        {messageKey.map((key, i) => (
          <div className='messageBox'>
            <p>{message[key].content}</p>
          </div>
        ))}
      </div>
      <div className='inputChat'>
        <textarea
          className='inputChatPlace'
          placeholder='채팅을 입력하세요'
          value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value);
            setMessage((data) => ({
              ...data,
              content: messageContent,
              date: new Date(),
            }));
          }}
        />
        <button
          type='submit'
          className='submitChatBtn'
          onClick={(e) => {
            setMessageContent('');
            if (haveBeenChat === false) {
              db.collection('chatroom')
                .doc(id)
                .collection('messages')
                .add(message);
              setHaveBeenChat(true);
            } else {
              db.collection('chatroom').doc(id).update(message);
            }
          }}
        >
          전송{' '}
        </button>
      </div>
    </div>
  );
}

function HubCalendar() {


  return (
    <>
      <div
        className='fullCalendar'
        style={{ position: 'absolute', top: '100px', left: '700px' }}
      >
        <FullCalendar defaultView='dayGridMonth' plugins={[dayGridPlugin]} height={600}/>
      </div>
    </>
  );
}
function HubDashboard() {
  return <></>;
}
export default ProjectHub;

//FIXME: 컬렉션이 계속 생김, 옆에 날짜 보이게, 메세지가 누적되서 박스 넘어가면 오래된순으로 없어지게, 메세지 최신순정렬안되고잇음,. 챗을 누가 보냈는지도- db에 메세지 작성자 uid도 같이 넣어야겠다. 본인이 보낸거 오른쪽으로 - 본인한테만 보이게 어떻게하지.
