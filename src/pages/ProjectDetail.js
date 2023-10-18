import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../index';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';

function ProjectDetail() {
  let { id } = useParams();
  const [projectInfo1, setProjectInfo1] = useState(null);

  useEffect(() => {
    db.collection('List')
      .get()
      .then((snapshot) => {
        const newData = {};

        snapshot.forEach((doc) => {
          if (doc.id === id) {
            // 이 부분에서 수정
            newData[doc.id] = {
              제목: doc.data().제목,
              요약: doc.data().요약,
              소개: doc.data().소개,
              스택: doc.data().스택,
              팀장: doc.data().팀장,
              팀원: doc.data().팀원,
              마감일: doc.data().마감일,
              모집인원: doc.data().모집인원,
              포지션: doc.data().포지션,
            };
          }
        });

        // 이전 데이터를 보존하면서 새 데이터를 추가
        setProjectInfo1((prevData) => ({
          ...prevData,
          ...newData,
        }));
      });
  }, [id]); // id가 변경될 때마다 호출

  if (projectInfo1 === null) {
    // 데이터 로딩 중에는 아무것도 렌더링하지 않음
    return null;
  }

  const projectInfo = projectInfo1[id]; // id에 해당하는 데이터 추출
  if (!projectInfo) {
    // id에 해당하는 데이터가 없는 경우
    return <p>프로젝트를 찾을 수 없습니다.</p>;
  }
  const teamLeaderName = projectInfo.팀장.slice(-2);
  return (
    <>
      <div className='projectWriteVw'>
        <div className='projectWriteMainContainer'>
          <div className='projectWriteMainCenter'>
            <h1 style={{ marginTop: '100px' }}>{projectInfo.제목}</h1>
            <br />
            <hr />
            <div className='projectWriteTopInfo'>
              <div className='projectWriteTopInfoBox'>
                <span>기술스택</span>{' '}
            <div style={{ display: 'inline-block', backgroundColor:'#efefef', borderRadius:'10px',  padding:'4px'}}>    <p style={{margin:'1px',fontSize:'12px'}}>{projectInfo.스택[0]}</p></div>
            <div style={{ display: 'inline-block', backgroundColor:'#efefef', borderRadius:'10px',  padding:'4px'}}>    <p style={{margin:'1px',fontSize:'12px'}}>{projectInfo.스택[1]}</p></div>
            <div style={{ display: 'inline-block', backgroundColor:'#efefef', borderRadius:'10px',  padding:'4px'}}>    <p style={{margin:'1px',fontSize:'12px'}}>{projectInfo.스택[2]}</p></div>
               
              </div>
              <div className='projectWriteTopInfoBox'>
               <span>마감일</span>{' '}
                <p style={{ display: 'inline-block', marginTop:'0px' }}>{projectInfo.마감일}</p>
              </div>
              <div className='projectWriteTopInfoBox'>
                {' '}
                <span>모집인원</span>{' '}
                <p style={{ display: 'inline-block', marginTop:'20px' }}>
                  {projectInfo.모집인원}
                </p>
              </div>
              <div className='projectWriteTopInfoBox'>
                {' '}
                <span>포지션</span>{' '}
                <p style={{ display: 'inline-block' , marginTop:'20px'}}>
                  {projectInfo.포지션[0]}
                </p>
                <p style={{ display: 'inline-block' , marginTop:'20px'}}>
                  {projectInfo.포지션[1]}
                </p>
              </div>
            </div>

            <p>소개</p>
            <hr />
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <p>{projectInfo.소개}</p>
            </div>

            <Button
              variant='dark'
              className='teamApply'
              type='submit'
              onClick={() => {
                firebase.auth().onAuthStateChanged((user) => {
                  // user.displayName
                  db.collection('List')
                    .doc(id)
                    .update({ 팀원: user.displayName });
                  db.collection('chatroom').doc(id).set({ 팀원uid: user.uid }); //FIXME: update문 추가
                });
              }}
            >
              {' '}
              신청하기{' '}
            </Button>
            <div
              className='sideTeamProtile'
              style={{
                width: '300px',
                height: '400px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '22%',
                left: '68%',
                border: '2px solid rgb(168, 168, 168)',
                textAlign: 'center',
                borderRadius: '20px',
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'skyblue',
                  borderRadius: '100%',
                  width: '68%',
                  height: '50%',
                  textAlign: 'center',
                  margin: 'auto',
                  paddingTop: '60px',
                }}
              >
                {' '}
                <span style={{ color: 'white', fontSize: '40px' }}>
                  {teamLeaderName}
                </span>
              </div>
              <p style={{ marginTop: '40px' }}>팀원 목록</p>
              <span>{projectInfo.팀원}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 다른 프로젝트 정보를 표시할 수 있도록 여기에 추가 */}
    </>
  );
}

export default ProjectDetail;
