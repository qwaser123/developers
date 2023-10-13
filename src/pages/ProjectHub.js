import { useEffect, useState } from 'react';
import { db } from '../index.js';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';

function ProjectHub() {
  const [projectInfo, setProjectInfo] = useState({});
  let { id } = useParams();
  useEffect(() => {
    console.log(id);
    db.collection('List')
      .get()
      .then((snapshot) => {
        const newData = {};
        snapshot.forEach((doc) => {
          // 새 데이터를 새 객체에 추가
          newData[doc.id == id] = {
            팀장: doc.data().팀장,
            팀원: doc.data().팀원,
          };
        });
        // 데이터 로딩이 완료되면 state 업데이트
        setProjectInfo(newData);
      });
  }, []);
  
  if (projectInfo === null) {
    // 데이터 로딩 중에는 아무것도 렌더링하지 않음
    return null;
  }
  return (
    <>
      <button
        onClick={() => {
          db.collection('chatroom').add(projectInfo);
        }}
      >
        채팅
      </button>
    </>
  );
}

export default ProjectHub;
