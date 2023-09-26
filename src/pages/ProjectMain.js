import { Carousel } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { db } from "../index.js";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  let navigate = useNavigate();

  useEffect(()=> {
    db.collection('List').get().then((snapshot)=> {
      snapshot.forEach((doc)=> {
          console.log(doc.data());
      })
    })
  })

  return (
    <>

      <div>
        <p>
          프로젝트 멤버를 구해보세요! 프로젝트 멤버를 찾거나
          다양한 목적의 멤버 모집글을 올릴 수 있어요!
        </p>
      </div>
      <button
        onClick={() => {
          navigate("projectWrite");
        }}
      >
        글작성
      </button>
      
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
        <div className="slidercontents2">
          <div className="wrapText">
            <h1>Organic fresh fruits for your health</h1>
            <div className="d-none d-md-block">
              <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Mauris eleifend sagittis mollis. Nulla finibus arcu eu tortor
                gravida aliquet
              </p>
            </div>
            <button>SHOP NOW</button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

function ListOfProject() {
  let [contents, setContents] = useState({});
  return(
    <div>
      {db.collection('List').get().then((snapshot)=> {
        snapshot.forEach((doc)=> {
            console.log(doc);
        })
      })}
    </div>
  )
}