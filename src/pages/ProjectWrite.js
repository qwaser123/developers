import {

    Button,

  } from "react-bootstrap";

export default function MyProjectWrite() {
  return (
    <div className="projectWriteMainContainer">
      <div className="projectWriteMainCenter">
        <p>제목</p>
        <input
          type="text"
          placeholder="제목을 입력하세요 "
          className="inputTitle"
        ></input>
        <p>부제목?</p>
        <input
          type="text"
          placeholder="프로젝트 부제목? 소개? "
          className="inputTitle"
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
        <input
          type="text"
          placeholder="프로젝트를 소개해 주세요 "
          className="inputTitle"
        ></input>
        <Button variant="dark" type="submit" className="ProjectSendBtn"> 등록하기 </Button>
      </div>
    </div>
  );
}
