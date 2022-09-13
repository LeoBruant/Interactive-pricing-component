import { useEffect, useRef, useState } from "react";

import iconSlider from "../assets/svg/icon-slider.svg";

export default function Slider({ action, className, max, value }) {
  const [canMove, setCanMove] = useState(false);
  const [mousePosition, setMousePosition] = useState();
  const [position, setPosition] = useState(100 / (max / value));
  const slider = useRef();
  const sliderContainer = useRef();

  useEffect(() => {
    const leaveCursor = () => {
      setCanMove(false);
    };

    window.addEventListener("mouseup", leaveCursor);

    return () => window.removeEventListener("mouseup", leaveCursor);
  });

  useEffect(() => {
    const moveCursor = ({ clientX }) => {
      let clientWidth = sliderContainer.current.clientWidth;
      let offsetLeft = slider.current.offsetLeft;

      let newPosition;

      if (clientX < offsetLeft) {
        newPosition = 0;
      } else if (clientX > offsetLeft + clientWidth) {
        newPosition = 100;
      } else {
        newPosition = Math.floor(((clientX - offsetLeft) * 100) / clientWidth);
      }

      setPosition(newPosition);
      action(newPosition);
    };

    if (canMove) {
      window.addEventListener("mousemove", moveCursor);
    } else {
      window.removeEventListener("mousemove", moveCursor);
      document.body.classList.remove("body--grab");
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [action, canMove]);

  const clickSlider = () => {
    setPosition(mousePosition);
    grabCursor();
    action(mousePosition);
  };

  const getMousePosition = ({
    target: { className },
    nativeEvent: { layerX },
  }) => {
    if (className === "slider__background") {
      setMousePosition(Math.floor((layerX * 100) / slider.current.clientWidth));
    }
  };

  const grabCursor = () => {
    setCanMove(true);
    document.body.classList.add("body--grab");
  };

  return (
    <div className={`slider ${className ? className : ""}`} ref={slider}>
      <div
        className="slider__background"
        onMouseDown={clickSlider}
        onMouseMove={(e) => getMousePosition(e)}
        ref={sliderContainer}
      >
        <div className="slider__fill" style={{ width: `${position}%` }}></div>
      </div>
      <div
        className={`slider__cursor ${canMove ? "slider__cursor--grab" : ""}`}
        style={{ left: `${position}%` }}
        onMouseDown={grabCursor}
      >
        <img src={iconSlider} alt="slider cursor" className="slider__icon" />
      </div>
    </div>
  );
}
