import { useNavigate } from 'react-router-dom';
import { db } from '../index.js';
import { useEffect, useRef, useState } from 'react';
import { GreyBox } from './ProjectDetail.js';
import styles from '../css/ProjectMain.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { menOptions } from '../components/data.js';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function ProjectPage() {
  let navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);
  useEffect(() => {
    let dbQuery = db.collection('List').limit(5);

    // 두 번째 페이지부터는 startAfter 메소드를 호출
    if (lastDoc) {
      dbQuery = dbQuery.startAfter(lastDoc);
    }

    dbQuery.get().then((snapshot) => {
      const newData = {};
      let newLastDoc = null;

      snapshot.forEach((doc) => {
        // 새 데이터를 새 객체에 추가
        if (doc.data().제목.includes(query)) {
          newData[doc.id] = {
            제목: doc.data().제목,
            요약: doc.data().요약,
            소개: doc.data().소개,
            스택: doc.data().스택,
            썸네일: doc.data().썸네일,
            마감일: doc.data().마감일,
            팀장: doc.data().팀장,
          };
        }
        newLastDoc = doc;
      });

      setLastDoc(newLastDoc);
      // 기존 데이터에 새 데이터를 추가하여 state 업데이트
      setProjectInfo((prevData) => ({ ...prevData, ...newData }));
    });
  }, [page, query]);

  // 데이터 로딩 중에는 아무것도 렌더링하지 않음
  if (projectInfo === null) {
    return null;
  }

  const projectInfoKeys = Object.keys(projectInfo);
  return (
    <>
      <div className={styles.searchBackground}>
        <div className={styles.searchGroup}>
          <SearchPage
            query={query}
            setQuery={setQuery}
            setPage={setPage}
            setLastDoc={setLastDoc}
          />
        </div>
      </div>
      <div className={styles.showProjectList}>
        <h3 className={styles.showProjectRank}> 전체 프로젝트 </h3>
        <ListOfProject
          projectInfo={projectInfo}
          projectInfoKeys={projectInfoKeys}
          navigate={navigate}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
}
const BlackBtn = styled.button`
  background-color: black;
  color: white;
  border-radius: 30px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
function SearchPage(props) {
  const handleChange = (e) => {
    props.setQuery(e.target.value);
    props.setPage(0);
    props.setLastDoc(null);
  };

  return (
    <div className={styles.searchContainer}>
      <FontAwesomeIcon icon={faSearch} className={styles.searchicon} />
      <input
        type='text'
        value={props.query}
        placeholder='프로젝트 검색'
        className={styles.searchinput}
        onChange={handleChange}
      />
      <BlackBtn>
        검색 <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '5px' }} />
      </BlackBtn>
    </div>
  );
}
function DropDown() {
  return (
    <Select
      className='basic-single'
      classNamePrefix='select'
      defaultValue={menOptions[0]}
      name='color'
      options={menOptions}
      onChange={(e) => {
        const optionvalue = e.value;
      }}
    />
  );
}

function ListOfProject(props) {
  const targetRef = useRef();
  // 페이지 번호를 저장하는 상태 변수 선언

  useEffect(() => {
    let observer;
    const currentTarget = targetRef.current;

    const observeTarget = async () => {
      if (currentTarget) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // isIntersecting: true -> 스크롤이 관찰 대상에 도달했을 때
              if (entry.isIntersecting) {
                // 페이지 번호를 증가시킴
                props.setPage((prevPage) => prevPage + 1);
                console.log('Element is intersecting!');
              }
            });
          },
          {
            root: null,
            rootMargin: '50px', // 기존 '-10px'에서 '0px'로 변경
            threshold: 0.1,
          }
        );

        observer.observe(currentTarget);
      }
    };

    observeTarget();

    return () => {
      if (observer && currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [props.page]);

  return props.projectInfoKeys.map((key, i) => (
    <div
      className=' mt-4'
      key={key}
      ref={i === props.projectInfoKeys.length - 1 ? targetRef : null}
    >
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
