import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../index.js';
import { useEffect, useState } from 'react';
import { GreyBox } from './ProjectDetail.js';
import styles from '../css/ProjectMain.module.css';

export default function ProjectPage() {
  let navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    db.collection('List')
      .get()
      .then((snapshot) => {
        const newData = {};
        snapshot.forEach((doc) => {
          // 새 데이터를 새 객체에 추가
          newData[doc.id] = {
            제목: doc.data().제목,
            요약: doc.data().요약,
            소개: doc.data().소개,
            스택: doc.data().스택,
            썸네일: doc.data().썸네일,
            마감일: doc.data().마감일,
            팀장: doc.data().팀장,
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

  const projectInfoKeys = Object.keys(projectInfo);
  return (
    <>
      <div>
        <Slider />
      </div>
      <div className={styles.showProjectList}>
        <h3 className={styles.showProjectRank}>새로운 프로젝트 🎊</h3>
        {/* TODO: 컴포넌트 쓸 때마다 props로 넘겨줘야 하는 건가? */}
        <ListOfProject
          projectInfo={projectInfo}
          projectInfoKeys={projectInfoKeys}
          navigate={navigate}
        />
        <h3 className={styles.showProjectRank}> 인기 프로젝트 🔥</h3>
        <ListOfProject
          projectInfo={projectInfo}
          projectInfoKeys={projectInfoKeys}
          navigate={navigate}
        />
        <h3 className={styles.showProjectRank}> 전체 프로젝트 </h3>
        <ProjectFiltering />
        <ListOfProject
          projectInfo={projectInfo}
          projectInfoKeys={projectInfoKeys}
          navigate={navigate}
        />
      </div>
    </>
  );
}
function PrevBtn() {
  <img src='' alt='이전'></img>;
}
//캐러셀
function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className='slidercontents'>
          <div className='wrapText'></div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='slidercontents'>
          <div className='wrapText'></div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

function ProjectFiltering() {
  return (
    <>
      <select name='language' id='language'>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='c++'>C++</option>
        <option value='java'>Java</option>
      </select>
      <select name='position' id='position'>
        <option value='frontend'>프론트엔드</option>
        <option value='backend'>백엔드</option>
        <option value='UI/UX'>UI/UX</option>
        <option value='planning'>기획</option>
      </select>
    </>
  );
}
function ListOfProject(props) {
  return props.projectInfoKeys.map((key, i) => (
    <div className=' mt-4' key={key}>
      <div
        className={styles.product}
        onClick={() => {
          props.navigate(`/project/detail/${key}`);
        }}
      >
        <div className={styles.thumbnail}>
          <div className='flex-grow-1'>
            <div className={styles.thumbnailImg}>
              <img
                src={props.projectInfo[key].썸네일}
                alt='썸네일 이미지'
                style={{ width: '100%' }}
              />
            </div>
            <div className={styles.thumbnailInfo}>
              <h5 className={styles.title}>{props.projectInfo[key].제목}</h5>
              <p className={styles.date}>{props.projectInfo[key].요약}</p>
              {props.projectInfo[key].스택.map((stackItem, index) => (
                <GreyBox key={index}>
                  <p style={{ margin: '1px', fontSize: '12px' }}>{stackItem}</p>
                </GreyBox>
              ))}
              <hr />
              <p className={styles.price}>
                {props.projectInfo[key].팀장} {props.projectInfo[key].마감일}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

//TODO: 신규프로젝트, 인기프로젝트 넘어가는거 만들기 , 그 아래에 프로젝트 리스트, 무한스크롤
