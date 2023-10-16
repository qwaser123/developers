import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../index';
import firebase from 'firebase/app';

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

  return (
    <>
      <div className='projectWriteMainContainer'>
        <div className='projectWriteMainCenter'>
        <h1 style={{marginTop:'100px'}}>{projectInfo.제목}</h1><br/><hr/>
        <p>{projectInfo.스택}</p>
        <p>{projectInfo.요약}</p>
        
        <p>{projectInfo.마감일}</p>
        <p>소개</p>
        <hr/>
        <p>{projectInfo.소개}</p>
        <p>팀장</p>
        <span>{projectInfo.팀장}</span>
        <p>팀원</p>
        <span>{projectInfo.팀원}</span>
        <button onClick={()=> {
          firebase.auth().onAuthStateChanged((user)=> {
            // user.displayName
          db.collection('List').doc(id).update({팀원: user.displayName});
          db.collection('chatroom').doc(id).set({팀원uid: user.uid}); //FIXME: update문 추가 
        
          })
        }}> 신청하기 </button>
        </div>

      </div>

      {/* 다른 프로젝트 정보를 표시할 수 있도록 여기에 추가 */}
    </>
  );
}

export default ProjectDetail;
