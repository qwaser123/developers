import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../index';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import ProjectWriteTitle from './ProjectWrite';

export let GreyBox = styled.div`
  display: inline-block;
  background-color: #efefef;
  border-radius: 10px;
  padding: 4px;
  margin-left: 10px;
  margin-top: 20px;
  font-size: 12px;
  height: 3vh;
`;
let ProjectDetailTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 70px;
`;
let SideTeamProfile = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  position: absolute;
  top: 22%;
  left: 68%;
  border: 2px solid rgb(168, 168, 168);
  text-align: center;
  border-radius: 20px;
  padding-top: 20px;
`;
let SideProfileLeader = styled.div`
  background-color: skyblue;
  border-radius: 100%;
  width: 68%;
  height: 50%;
  text-align: center;
  margin: auto;
  padding-top: 60px;
`;
function ProjectDetail() {
  let { id } = useParams();

  //FIXME: 박스 색 변경 적용 안 됨
  const [projectInfo1, setProjectInfo1] = useState(null);

  useEffect(() => {
    db.collection('List')
      .get()
      .then((snapshot) => {
        const newData = {};

        snapshot.forEach((doc) => {
          if (doc.id === id) {
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
                {projectInfo.스택.map((Item, index) => (
                  <GreyBox key={index}>
                    {' '}
                    <p style={{ margin: '1px', fontSize: '12px' }}>{Item}</p>
                  </GreyBox>
                ))}
              </div>
              <div className='projectWriteTopInfoBox'>
                <span>마감일</span>{' '}
                <p style={{ display: 'inline-block', marginTop: '0px' }}>
                  {projectInfo.마감일}
                </p>
              </div>
              <div className='projectWriteTopInfoBox'>
                {' '}
                <span>모집인원</span>{' '}
                <p style={{ display: 'inline-block', marginTop: '0px' }}>
                  {projectInfo.모집인원}
                </p>
              </div>
              <div className='projectWriteTopInfoBox'>
                {' '}
                <span>포지션</span>{' '}
                {projectInfo.포지션.map((Item, index) => (
                  <GreyBox key={index}>
                    <p
                      style={{
                        display: 'inline-block',
                        padding: '1px',
                        fontSize: '12px',
                      }}
                    >
                      {Item}
                    </p>
                  </GreyBox>
                ))}
              </div>
            </div>
            {/* FIXME: 스타일드 겹치는거 해결  */}
            <ProjectDetailTitle>소개</ProjectDetailTitle>
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
                  db.collection('chatroom').doc(id).set({ 팀원uid: user.uid }).then(()=> {
                    alert('신청 완료');
                  }); //FIXME: update문 추가
                });
              }}
            >
              {' '}
              신청하기{' '}
            </Button>
            <SideTeamProfile>
              <SideProfileLeader>
                {' '}
                <span style={{ color: 'white', fontSize: '40px' }}>
                  {teamLeaderName}
                </span>
              </SideProfileLeader>
              <p style={{ marginTop: '40px' }}>팀원 목록</p>
              <span>{projectInfo.팀원}</span>
            </SideTeamProfile>
          </div>
        </div>
      </div>
      {/* 다른 프로젝트 정보를 표시할 수 있도록 여기에 추가 */}
    </>
  );
}

export default ProjectDetail;
