import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../index.js";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  let navigate = useNavigate();

  useEffect(() => {
    db.collection("List")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  });

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
      <ListOfProject/>
      
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
      {db
        .collection("List")
        .get()
        .then((snapshot) => {
          snapshot.map((doc) => {
            console.log(doc);
            return (
              <div>
                <p>doc.data</p>
              </div>
            );
          });
        })}
    </div>
  );
}
