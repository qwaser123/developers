import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../index.js';
import { useEffect, useState } from 'react';

export default function ProjectPage() {
  let navigate = useNavigate();
  let [projectInfo, setProjectInfo] = useState({
    제목: '',
    요약: '',
    소개: '',
  });
  useEffect(() => {
    db.collection('List')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //FIXME: 왜 log가 무한반복되는지 
          console.log(doc.data().제목);
          console.log(doc.data().요약);
          console.log(doc.data().소개);
          setProjectInfo((data) => ({
            ...data,
            제목: doc.data().제목,
            // 요약: doc.data().요약,
            // 소개: doc.data().소개,
          }));
        });
      });
  }, [projectInfo]);
  const projectInfoKeys = Object.keys(projectInfo);
  return (
    <>
      <div>
        <Slider />
      </div>

      <div className='showProjectList'>
        <button
          onClick={() => {
            navigate('projectWrite');
          }}
        >
          글 작성하기
        </button>

        {/* TODO: 글자 수 넘어가면 ...으로 변경  */}
        {projectInfoKeys.map((key, i) => (
          <div className='container mt-3'>
            <div className='product'>
              <div className='thumbnail'>
                <div className='flex-grow-1 p-4' key={key}>
                  <div className='projectBox'>
                    <p>프로젝트</p>
                  </div>
                  <h5 className='title'>
                    {key} {projectInfo[key]}
                  </h5>
                  {/* <p className='date'>{projectInfo.요약}</p>
                  <p className='price'>{projectInfo.소개}</p> */}
                  <p className='floatEnd'>?0</p>
                </div>
              </div>
            </div>
          </div>
        ))}
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