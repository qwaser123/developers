import { useEffect, useRef, useState } from 'react';
import { db } from '../index.js';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import home from '../img/home.png';
import board from '../img/board.png';
import calendar from '../img/calendar.png';
import messageImg from '../img/message.png';
import styles from '../css/ProjectHub.module.css';
// import { Calendar } from '@fullcalendar/core';
// import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
function ProjectHub() {
  let ProjectHubBox = styled.div`
    width: ${(props) => props.width};
    background-color: white;
    height: 84vh;
    border-radius: 10px;
    padding: 10px;
    padding-bottom: 0;
    margin-left: ${(props) => props.marginLeft};
  `;
  let { id } = useParams();

  return (
    <>
      <div className={styles.ProjectHubContainer}>
        <ProjectHubSidebar />
        <div className={styles.ProjectHubMain}>
          <HubChat ProjectHubBox={ProjectHubBox} />
          <HubCalendar ProjectHubBox={ProjectHubBox} />
          {/* <HubFileShare /> */}
        </div>
      </div>
    </>
  );
}
function ProjectHubSidebar() {
  return (
    <div className={styles.ProjectHubSidebar}>
      {' '}
      <div className={styles.ProjectHubFeature}>
        <p>
          <img src={home} style={{ width: '32%' }} alt='홈' /> 홈
        </p>
      </div>
      <div className={styles.ProjectHubFeature}>
        <p>
          <img src={board} style={{ width: '32%' }} alt='보드' /> 보드
        </p>
      </div>
      <div className={styles.ProjectHubFeature}>
        <p>
          <img src={calendar} style={{ width: '32%' }} alt='캘린더' /> 일정
        </p>
      </div>
      <div className={styles.ProjectHubFeature}>
        <p>
          <img
            src={messageImg}
            style={{ width: '32%' }}
            onClick={() => {
              // props.navigate('/project/myproject/:id/chat');
            }}
            alt='메시지'
          />{' '}
          메세지
        </p>
      </div>
    </div>
  );
}
export function HubChat(props) {
  let { id } = useParams();
  let [message, setMessage] = useState({});
  let [haveBeenChat, setHaveBeenChat] = useState(false);
  let [messageContent, setMessageContent] = useState('');
  let [isLogged, setIsLogged] = useState('left');
  let [MessageId, setMessageId] = useState('');
  const [userUid, setUserUid] = useState('');
  const scrollUpdate = useRef();
  const messageKey = Object.keys(message);

  useEffect(() => {
    db.collection('chatroom')
      .doc(id)
      .collection('messages')
      .orderBy('date')
      .onSnapshot((result) => {
        const newData = {};
        result.forEach((a) => {
          newData[a.id] = {
            content: a.data().content,
            date: a.data().date,
            userUid: a.data().user,
          };
        }, setMessage(newData));
      });
  }, []);

  const scrollToBottom = () => {
    scrollUpdate.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserUid(user.uid);
    });
  }, []);
  return (
    <props.ProjectHubBox
      width='20vw'
      style={{ paddingRight: '0px', paddingTop: '0px' }}
    >
      <div className={styles.ChatContainer}>
        <div
          className={styles.showChat}
          // style={{float:isLogged}}
        >
          {messageKey.map((key, i) => (
            <div
              className={
                message[key].userUid == userUid
                  ? `${styles.messageContainer} ${styles.right}`
                  : `${styles.messageContainer} ${styles.left}`
              }
              key={i}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div className={styles.messageBox} ref={scrollUpdate}>
                <p>{message[key].content}</p>
              </div>
              {message[key].date && (
                <div
                  className={
                    message[key].userUid == userUid
                      ? `${styles.dateContainer} ${styles.left}`
                      : null
                  }
                >
                  <span
                    className={styles.messageDate}
                    style={{ display: 'block' }}
                  >
                    {message[key].date.toDate().toLocaleDateString()}
                  </span>
                  {/* <br></br> */}
                  <span
                    className={styles.messageDate}
                    style={{ display: 'block' }}
                  >
                    {message[key].date.toDate().toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.inputChat}>
          <textarea
            className={styles.inputChatPlace}
            placeholder='채팅을 입력하세요'
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
              setMessage((data) => ({
                ...data,
                content: messageContent,
                date: new Date(),
                user: userUid,
              }));
            }}
          />
          <button
            type='submit'
            className={styles.submitChatBtn}
            onClick={async (e) => {
              setMessageContent('');
              if (haveBeenChat === false) {
                const docRef = await db
                  .collection('chatroom')
                  .doc(id)
                  .collection('messages')
                  .add(message);
                // setHaveBeenChat(true);
                setMessageId(docRef.id);
              } //else {
              //   db.collection('chatroom').doc(id).collection('messages').doc(MessageId).update(message);
              // }
              // try {
              //   const response = await fetch(
              //     'https://api.openai.com/v1/chat/completions',
              //     {
              //       method: 'POST',
              //       headers: {
              //         'Content-Type': 'application/json',
              //         Authorization: `Bearer ${'your-api-key-here'}`, // 여기에 실제 API 키를 입력하세요.
              //       },
              //       body: JSON.stringify({
              //         model: 'gpt-3.5-turbo',
              //         messages: [
              //           { role: 'user', content: 'Say this is a test!' },
              //         ],
              //         temperature: 0.7,
              //       }),
              //     }
              //   );
              //   const data = await response.json();
              //   console.log(data);
              // } catch (error) {
              //   console.error('Error:', error);
              // }
            }}
          >
            전송{' '}
          </button>
        </div>
      </div>
    </props.ProjectHubBox>
  );
}
function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function HubCalendar(props) {
  const renderEventContent = (info) => {
    // 사용자 정의 이벤트 데이터 가져오기
    const status = info.event.extendedProps.status;

    // 렌더링할 JSX 반환
    return (
      <div>
        <div>{info.event.title}</div>

        <div
          style={{
            backgroundColor: ' rgb(81, 81, 238)', // 배경색을 빨간색으로 변경
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            marginLeft: '5px',
          }}
        ></div>
      </div>
    );
  };

  const events = [
    { title: '[메인] main page UI 구현', start: new Date('2023-10-18') },
    { title: '[공통] 헤더 UI 구현', start: new Date('2023-10-15') },
    { title: '로그인/회원가입 페이지 UI 구현', start: new Date('2023-10-20') },
  ];
  return (
    <>
      <props.ProjectHubBox width='fit-content' marginLeft='50px'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={renderEventContent}
        />
      </props.ProjectHubBox>
      <props.ProjectHubBox width='fit-content' marginLeft='50px'>
        <FullCalendar
          plugins={[listPlugin]}
          initialView='listWeek'
          events={events}
          // eventContent={renderEventContent}
        />
      </props.ProjectHubBox>
    </>
  );
}
function HubDashboard() {
  return <></>;
}
function HubFileShare() {
  return (
    <>
      <div>
        <input type='file' />
      </div>
    </>
  );
}

export default ProjectHub;

//FIXME: 컬렉션이 계속 생김, 옆에 날짜 보이게, 메세지가 누적되서 박스 넘어가면 오래된순으로 없어지게, 메세지 최신순정렬안되고잇음,. 챗을 누가 보냈는지도- db에 메세지 작성자 uid도 같이 넣어야겠다. 본인이 보낸거 오른쪽으로 - 본인한테만 보이게 어떻게하지.
