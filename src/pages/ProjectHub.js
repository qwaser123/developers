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
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
function ProjectHub() {
  let ProjectHubBox = styled.div`
    width: ${(props) => props.width};
    background-color: white;
    height: ${(props) => props.height};
    border-radius: 10px;
    padding: 10px;
    padding-bottom: 0;
    margin-left: ${(props) => props.marginLeft};
  `;
  let whiteModal = styled.div`
    background: rgb(255, 255, 255);
    width: ${(props)=> props.width};
    height: ${(props) => props.height};
    padding: 30px;
    border-radius: 10px;
    position: absolute;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    top: 55%;
    left: 54.5%;
    transform: translate(-50%, -50%);
    z-index: 5;
  `;

  let { id } = useParams();

  return (
    <>
      <div className={styles.ProjectHubContainer}>
        <ProjectHubSidebar />
        <div className={styles.ProjectHubMain}>
          <HubChat ProjectHubBox={ProjectHubBox} />
          <HubCalendar ProjectHubBox={ProjectHubBox} whiteModal={whiteModal} />
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
      height='84vh'
      style={{ paddingTop: '0px' }}
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
                    {message[key].date.toDate().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

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
            backgroundColor: ' rgb(0,0,0)', // 배경색을 빨간색으로 변경
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

  useEffect(() => {
    db.collection('TodoList')
      .doc(id)
      .collection('Todo')
      .get()
      .then((result) => {
        const newData = {};
        result.forEach((a) => {
          console.log(a.data());
          newData[a.id] = {
            title: a.data().title,
            start: a.data().start,
            end: a.data().end,
          };
        });
        setTodoEvent(newData);
      });
  }, []);

  const [TodoEvent, setTodoEvent] = useState({});
  let { id } = useParams();
  const [isModal, setIsModal] = useState(false);
  const [isEventModal, setIsEventIsModal] = useState(false);
  const [TodoTitle, setTodoTitle] = useState('');
  const [TodoStartDate, setTodoStartDate] = useState('');
  const [TodoEndDate, setTodoEndDate] = useState('');
  const [Todo, setTodo] = useState({});
  const [infoTitle, setInfoTitle] = useState('');
  const [infoStart, setInfoStart] = useState('');
  const [infoEnd, setInfoEnd] = useState('');
  const handleEventClick = (info) => {
    setInfoTitle(info.event.title);
    const startDate = new Date(info.event.start);
    let start = `${startDate.getFullYear()}년 ${
      startDate.getMonth() + 1
    }월 ${startDate.getDate()}일`;
    setInfoStart(start);
    const endDate = new Date(info.event.end);
    let end = `${endDate.getFullYear()}년 ${
      endDate.getMonth() + 1
    }월 ${endDate.getDate()}일`;
    setInfoEnd(end);
    setIsEventIsModal(!isEventModal);
  };
  const handleEventModal = () => {
    setIsEventIsModal(!isEventModal);
  };
  const handleAddModal = () => {
    setIsModal(!isModal);
  };

  const postTodoInfo = () => {
    const newTodo = {
      ...Todo,
      title: TodoTitle,
      start: TodoStartDate,
      end: TodoEndDate,
    };
    db.collection('TodoList').doc(id).collection('Todo').add(newTodo);
    setIsModal(!isModal);
  };
  return (
    <>
      {isModal ? (
        <props.whiteModal width='28%' height='40%'>
          <div style={{ textAlign: 'right' }}>
            <button
              type='button'
              className={styles.xbutton}
              onClick={handleAddModal}
            >
              X
            </button>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              placeholder='제목을 입력하세요'
              className={styles.inputModalTodo}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
            ></input>
            <div className={styles.todoInfoBox}>
              <span>시작일</span>
              <div className={styles.setTodoInfo}>
                <input
                  type='date'
                  onChange={(e) => {
                    setTodoStartDate(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className={styles.todoInfoBox}>
              <span>종료일</span>
              <div className={styles.setTodoInfo}>
                <input
                  type='date'
                  onChange={(e) => {
                    setTodoEndDate(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <button
              className={styles.submitChatBtn}
              style={{ marginTop: '20px' }}
              onClick={postTodoInfo}
            >
              등록
            </button>
          </form>
        </props.whiteModal>
      ) : null}

      {isEventModal ? (
        <props.whiteModal width='24%'>
          {' '}
          <div style={{ textAlign: 'right' }}>
            <button
              type='button'
              className={styles.xbutton}
              onClick={handleEventModal}
            >
              X
            </button>
          </div>
          <div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {infoTitle}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '20px' }}>
                {infoStart.toString()} ~ {infoEnd.toString()}
              </p>
            </div>
          </div>
        </props.whiteModal>
      ) : null}
      <props.ProjectHubBox width='fit-content' marginLeft='50px' height='84vh'>
        <FullCalendar
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next,myCustomButton',
          }}
          customButtons={{
            myCustomButton: {
              text: '+',
              click: handleAddModal,
            },
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          editable={true}
          locale='ko'
          events={Object.values(TodoEvent)}
          // eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventColor='rgb(81, 81, 238)'
          eventDisplay='block'
          dayCellContent={(content) => content.date.getDate()}
        />
      </props.ProjectHubBox>
      <props.ProjectHubBox
        width='fit-content'
        marginLeft='50px'
        className='calendarTodoToday'
        height='42vh'
      >
        <FullCalendar
          plugins={[listPlugin]}
          initialView='listDay'
          locale='ko'
          contentHeight='650'
          events={Object.values(TodoEvent)}

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
