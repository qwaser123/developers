import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../index.js';
import { useEffect, useState } from 'react';

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
      <div className='showProjectList'>
        <h3 className='showProjectRank'>새로운 프로젝트 🎊</h3>
        {/* TODO: 글자 수 넘어가면 ...으로 변경 */}
        {projectInfoKeys.map((key) => (
          <div className=' mt-4' key={key}>
            <div className='product'>
              <div className='thumbnail'>
                <div className='flex-grow-1 p-4'>
                  <div className='projectBox'>
                    <p>프로젝트</p>
                  </div>
                  <h5 className='title'>{projectInfo[key].제목}</h5>
                  <p className='date'>{projectInfo[key].요약}</p>
                  {/* <p className='price'>{projectInfo[key].소개}</p> */}
                  <p className='floatEnd'>?1</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <h3 className='showProjectRank'> 인기 프로젝트 🔥</h3>
      </div>
    </>
  );
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

function ListOfProject() {
  let [contents, setContents] = useState({});
  return <div></div>;
}

//TODO: 신규프로젝트, 인기프로젝트 넘어가는거 만들기 , 그 아래에 프로젝트 리스트, 무한스크롤
