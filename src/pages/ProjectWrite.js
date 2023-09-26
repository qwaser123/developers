import { Button } from "react-bootstrap";
import { db } from "../index.js";
import { useState } from "react";

export default function MyProjectWrite() {
  const [formData, setFormData] = useState({});
  return (
    <div className="projectWriteMainContainer">
      <div className="projectWriteMainCenter">
        <p>제목</p>
        <input
          type="text"
          name='제목'
          value={formData.제목}
          placeholder="제목을 입력하세요 "
          className="inputTitle" id='title'
          onChange={(e)=> {
            let value = e.target.value;
            setFormData((data)=> ({
                ...data, 제목:value,
            }));
          }}
        ></input>
        <p>부제목?</p>
        <input
          type="text"
          name='부제목'
          value={formData.부제목}
          placeholder="프로젝트 부제목? 소개? "
          className="inputTitle" id='subtitle'
          onChange={(e)=> {
            let value = e.target.value;
            setFormData((data)=> ({
                ...data, 부제목:value,
            }));
          }}
        ></input>
        <p>모집 포지션</p>
        <label>
          <input type="checkbox"></input>프론트
        </label>
        <label>
          <input type="checkbox"></input>백
        </label>
        <label>
          <input type="checkbox"></input>UI/UX
        </label>
        <label>
          <input type="checkbox"></input>기획
        </label>
        <p>소개?</p>
        <textarea
          type="text"
          name='소개'
          value={formData.소개}
          placeholder="프로젝트를 소개해 주세요 "
          className="inputTitle introduce"  id='introduce'
          onChange={(e)=> {
            let value = e.target.value;
            setFormData((data)=> ({
                ...data, 소개:value,
            }));
          }}
        ></textarea>
        <Button variant="dark" type="submit" className="ProjectSendBtn"
        onClick={()=> {
            
              db.collection("List").add(formData);
        }}>
          {" "}
          등록하기{" "}
        </Button>
      </div>
    </div>
  );
}
