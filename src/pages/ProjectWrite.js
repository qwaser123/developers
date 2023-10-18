import { Button } from 'react-bootstrap';
import { db, storage } from '../index.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { stackOptions, menOptions } from '../components/data.js';
import firebase from 'firebase/app';
export default function MyProjectWrite() {
  const [formData, setFormData] = useState({});
  //TODO: formData로 따로 만들게 아니라 project info를 props해오면 더 깔끔하지않을까?
  const [position, setPosition] = useState([]);
  const [isStorage, setIsStorage] = useState(false);
  let [file, setFile] = useState('');
  let navigate = useNavigate();
  //입력된 텍스트 null값 검사
  let [textLen, setTextLen] = useState({
    제목: '',
    요약: '',
    포지션: [],
    소개: '',
  });

  const selectedPosition = (e) => {
    console.log(position);
    if (!position.includes(e.target)) {
      position.push(e.target.id);
      setFormData((data) => ({
        ...data,
        포지션: position,
      }));
    }
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setFormData((data) => ({
        ...data,
        팀장: user.displayName,
      }));
    });
  }, []);

  useEffect(() => {
    if (file) {
      var storageRef = storage.ref();
      var 저장할경로 = storageRef.child('image/' + file.name);
      var 업로드작업 = 저장할경로.put(file);

      업로드작업.snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          setFormData((data) => ({
            ...data,
            썸네일: url,
          }));
        })
        .catch((error) => {
          console.error('파일 업로드 실패:', error);
        });
    }
  }, [file]);

  return (
    <div className='projectWriteMainContainer'>
      <div className='projectWriteMainCenter'>
        <p>제목</p>
        <input
          type='text'
          name='제목'
          value={formData.제목}
          placeholder='제목을 입력하세요 '
          className='inputTitle'
          id='title'
          onChange={(e) => {
            let value = e.target.value; // == this.value?
            setFormData((data) => ({
              ...data,
              제목: value,
            }));
            if (value === null) {
              setTextLen((data) => ({
                ...data,
                제목: false,
              }));
            } else {
              setTextLen((data) => ({
                ...data,
                제목: 'true',
              }));
            }
          }}
        ></input>

        <p>요약</p>
        <input
          type='text'
          name='요약'
          value={formData.요약}
          placeholder='프로젝트 요약 '
          className='inputTitle'
          id='subtitle'
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              요약: value,
            }));
            if (value.length < 20) {
              setTextLen((data) => ({
                ...data,
                요약: false,
              }));
            } else {
              setTextLen((data) => ({
                ...data,
                요약: true,
              }));
            }
          }}
        ></input>

        <p>모집 포지션</p>
        <input type='checkbox' id='프론트엔드' onChange={selectedPosition} />
        <label for='프론트엔드'>
          <span>프론트엔드</span>
        </label>
        <input type='checkbox' id='백엔드' onChange={selectedPosition} />
        <label for='백엔드' className='checkboxMargin'>
          <span>백엔드</span>
        </label>
        <input type='checkbox' id='UI' onChange={selectedPosition} />
        <label for='UI' className='checkboxMargin'>
          <span>UI</span>
        </label>
        <input type='checkbox' id='기획' onChange={selectedPosition} />
        <label for='기획' className='checkboxMargin'>
          <span>기획</span>
        </label>

        <p>기술 스택</p>

        <Select
          defaultValue={[stackOptions[2]]}
          isMulti
          name='stackOption'
          options={stackOptions}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );
            setFormData((data) => ({
              ...data,
              스택: selectedValues
            }));
          }}
        />
        <p>모집 인원</p>
        <Select
          className='basic-single'
          classNamePrefix='select'
          defaultValue={menOptions[0]}
          name='color'
          options={menOptions}
          onChange={(e) => {
            console.log(e.value);
            const optionvalue = e.value;
            setFormData((data) => ({
              ...data,
              모집인원: optionvalue,
            }));
          }}
        />
        <p>모집 마감일</p>
        <input
          type='date'
          id='projectDate'
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              마감일: value,
            }));
          }}
        />

        <p>썸네일</p>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <p>소개</p>
        <textarea
          type='text'
          name='소개'
          value={formData.소개}
          placeholder='프로젝트를 소개해 주세요 '
          className='inputTitle introduce'
          id='introduce'
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              소개: value,
            }));
            if (value.length < 100) {
              setTextLen((data) => ({
                ...data,
                소개: false,
              }));
            } else {
              setTextLen((data) => ({
                ...data,
                소개: true,
              }));
            }
          }}
        ></textarea>
        <div className='btngroup'>
          <Button
            variant='secondary'
            onClick={() => {
              navigate(-1); //뒤로가기
            }}
          >
            취소
          </Button>{' '}
          <Button
            variant='dark'
            type='submit'
            className='ProjectSendBtn'
            onClick={() => {
              if (textLen.제목 === false) {
                alert('제목을 입력해주세요 ');
              } else if (textLen.요약 === false) {
                alert('요약은 20자 이상 입력해주세요 ');
              } else if (textLen.소개 === false) {
                alert('소개칸은 100자 이상 입력해주세요 ');
              } else {
                db.collection('List').add(formData); //List라는 컬렉션에 formData 데이터 추가
                alert('등록 완료');
                navigate('/project');
              }
            }}
          >
            {' '}
            등록하기{' '}
          </Button>
        </div>
      </div>
    </div>
  );
}

//TODO:
//좋아요 버튼 추가
// usestate쓸 때 const와 let 차이
