import "./CSS/EventSlider.css";
import { useRef, useEffect } from "react";
import img1 from "../../assets/images/exmember.jpg";
import img2 from "../../assets/images/gang.jpg";
import img3 from "../../assets/images/pooto/Invite.jpg";
import img4 from "../../assets/images/pooto/CSEIftarParty.png";
import img5 from "../../assets/images/pooto/ICPC.jpg";
import img6 from "../../assets/images/img6.jpg";
import img7 from "../../assets/images/img7.jpg";
import img8 from "../../assets/images/img8.jpg";
import img9 from "../../assets/images/img9.jpg";
import img10 from "../../assets/images/img10.jpeg";
import img11 from "../../assets/images/img11.jpg";
const Event = () => {
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);
  const carousel = useRef(null);
  const list = useRef(null);
  const runningTime = useRef(null);

  let timeRunning = 3000;
  let timeAutoNext = 7000;

  let runTimeOut;
  const runNextAuto = useRef(null);

  useEffect(() => {
    // Add event listeners after the component mounts
    nextBtn.current.onclick = () => show("next");
    prevBtn.current.onclick = () => show("prev");

    // Start the auto-slide functionality
    runNextAuto.current = setTimeout(() => {
      nextBtn.current.click();
    }, timeAutoNext);

    // Cleanup on component unmount
    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  const resetTimeAnimation = () => {
    runningTime.current.style.animation = "none";
    runningTime.current.offsetHeight; // Trigger reflow
    runningTime.current.style.animation = null;
    runningTime.current.style.animation = "runningTime 7s linear 1 forwards";
  };

  const show = (type) => {
    const ItemsDom = list.current.querySelectorAll(".item");

    if (type === "next") {
      list.current.appendChild(ItemsDom[0]);
      carousel.current.classNameList.add("next");
    } else {
      list.current.prepend(ItemsDom[ItemsDom.length - 1]);
      carousel.current.classNameList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carousel.current.classNameList.remove("next");
      carousel.current.classNameList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto.current);
    runNextAuto.current = setTimeout(() => {
      nextBtn.current.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
  };

  return (
    <div>
      <div ref={carousel} className="carousel translate-y-[350px] bg-black">
        <div ref={list} className="list">
          <div style={{ backgroundImage: `url(${img1})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img2})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img3})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img4})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img5})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img6})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img7})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img8})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img9})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img10})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ backgroundImage: `url(${img11})` }} className="item">
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <a href="/Events">
                  <button>Details</button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="arrows">
          <button ref={prevBtn} className="prev">
            <svg
              className="w-7 translate-x-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <button ref={nextBtn} className="next">
            <svg
              className="w-7 translate-x-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>

        <div ref={runningTime} className="timeRunning"></div>
      </div>
    </div>
  );
};

export default Event;
