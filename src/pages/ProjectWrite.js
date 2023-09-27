import { Button } from "react-bootstrap";
import { db } from "../index.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProjectWrite() {
  const [formData, setFormData] = useState({});
  let navigate = useNavigate();
  let [textLen, setTextLen] = useState({
    제목: "",
    부제목: "",
    포지션: "",
    소개: "",
  });

  return (
    <div className="projectWriteMainContainer">
      <div className="projectWriteMainCenter">

        <p>제목</p>
        <input
          type="text"
          name="제목"
          value={formData.제목}
          placeholder="제목을 입력하세요 "
          className="inputTitle"
          id="title"
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              제목: value,
            }));
            if (value === null) {
              setTextLen((data) => ({
                ...data,
                제목: false,
              }));
            }
            else {
                setTextLen((data) => ({
                    ...data,
                    제목: "true",
                  }));
            }
          }}
        ></input>

        <p>부제목</p>
        <input
          type="text"
          name="부제목"
          value={formData.부제목}
          placeholder="프로젝트 부제목 "
          className="inputTitle"
          id="subtitle"
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              부제목: value,
            }));
            if (value.length < 50) {
                setTextLen((data) => ({
                  ...data,
                  부제목: false,
                }));
              } else {
                setTextLen((data) => ({
                    ...data,
                    부제목: true,
                  }));
              }
          }}
        ></input>

        <p>모집 포지션</p>
        <input type="checkbox" id="position1" />
        <label for="position1">
          <span>프론트엔드</span>
        </label>
        <input type="checkbox" id="position2" />
        <label for="position2" className="checkboxMargin">
          <span>백엔드</span>
        </label>
        <input type="checkbox" id="position3" />
        <label for="position3" className="checkboxMargin">
          <span>UI/UX</span>
        </label>
        <input type="checkbox" id="position4" />
        <label for="position4" className="checkboxMargin">
          <span>기획</span>
        </label>

        <p>소개</p>
        <textarea
          type="text"
          name="소개"
          value={formData.소개}
          placeholder="프로젝트를 소개해 주세요 "
          className="inputTitle introduce"
          id="introduce"
          onChange={(e) => {
            let value = e.target.value;
            setFormData((data) => ({
              ...data,
              소개: value,
            }));
            if (value.length < 150) {
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
        <Button
          variant="dark"
          type="submit"
          className="ProjectSendBtn"
          onClick={() => {
            if (textLen.제목 == false) {
              alert("제목을 입력해주세요 ");
            } else if (textLen.부제목 == false) {
              alert("부제목은 50자 이상 입력해주세요 ");
            } 
            else if (textLen.소개 == false) {
              alert("소개칸은 150자 이상 입력해주세요 ");
            } 
            else {
              db.collection("List").add(formData);
              alert('등록 완료')
              navigate('/project')
            }
          }}
        >
          {" "}
          등록하기{" "}
        </Button>
      </div>
    </div>
  );
}
