import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../index.js";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  let navigate = useNavigate();
  let [projectInfo, setProjectInfo] = useState({
    제목: "",
    부제목: "",
    소개: "",
  });
  useEffect(() => {
    db.collection("List")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().제목);
          console.log(doc.data().부제목);
          console.log(doc.data().소개);
          setProjectInfo((data)=> ({
            ...data, 제목: doc.data().제목, 부제목: doc.data().부제목, 소개: doc.data().소개,
          }));
        });
      });
  }, [projectInfo]);

  return (
    <>
      <div>
        <Slider />
      </div>
      <button
        onClick={() => {
          navigate("projectWrite");
        }}
      >
        글작성
      </button>
        <p>{projectInfo.제목}</p>
        <p>{projectInfo.부제목}</p>
        <p>{projectInfo.소개}</p>
      
    </>
  );
}

//캐러셀
function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="slidercontents">
          <div className="wrapText"></div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slidercontents">
          <div className="wrapText"></div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

function ListOfProject() {
  let [contents, setContents] = useState({});
  return (
    <div>
    </div>
  );
}
