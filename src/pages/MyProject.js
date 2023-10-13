import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { db } from '../index.js';

function MyProject(props) {
  const [projectInfo, setProjectInfo] = useState(null); // 초기값을 null로 설정
  const [userName, setUserName] = useState(null);
  useEffect(() => {}, []);
  useEffect(() => {
    db.collection('List')
      .get()
      .then((snapshot) => {
        const newData = {};

        snapshot.forEach((doc) => {
          // 새 데이터를 새 객체에 추가
          firebase.auth().onAuthStateChanged((user) => {
            setUserName(user.displayName);
            if (
              doc.data().팀장 === user.displayName ||
              (doc.data().팀원 && doc.data().팀원.includes(user.displayName))
            ) {
              newData[doc.id] = {
                제목: doc.data().제목,
                요약: doc.data().요약,
                소개: doc.data().소개,
                스택: doc.data().스택,
                마감일: doc.data().마감일,
              };
            } else {
                console.log('a');
            }
          });
        });
        // 데이터 로딩이 완료되면 state 업데이트
        setProjectInfo(newData);
      });
  }, []);

  if (projectInfo === null) {
    // 데이터 로딩 중에는 아무것도 렌더링하지 않음
    return null;
  }

  const projectInfoKeys = Object.keys(projectInfo);

  return <>
  {
    projectInfoKeys.map((key, i) => (
        <div className=' mt-4' key={key}>
          <div
            className='product'
            onClick={() => {
              props.navigate(`/project/myproject/${key}`);
    
            }}
          >
            <div className='thumbnail'>
              <div className='flex-grow-1'>
                <div className='thumbnailImg'>
                  <img
                    src={projectInfo[key].썸네일}
                    alt='썸네일 이미지'
                    style={{ width: '100%' }}
                  />
                </div>
                <div className='thumbnailInfo'>
                  {/* <div className='projectBox'>
                    <p>프로젝트</p>
                  </div> */}
                  <h5 className='title'>{projectInfo[key].제목}</h5>
                  <p className='date'>{projectInfo[key].요약}</p>
                    <p className='price'>{projectInfo[key].스택}</p>
                  <hr></hr>
                  <p className='price'>마감일| {projectInfo[key].마감일}</p>
                  {/* <p className='floatEnd'>조회수 좋아요수 댓글수 </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )) };
 
  </>;
}

export default MyProject;
