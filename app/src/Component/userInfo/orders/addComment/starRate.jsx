import React, { useEffect, useMemo, useRef, useState } from 'react';
import useMousePosition from '../../../../hooks/useMousePosition';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRate = (props) => {
  const { className, handleSetScore, score } = props;
  const { x, y } = useMousePosition();
  const starCtn = useRef();
  const [scoreArr, setScoreArr] = useState([1, 1, 1, 1, 1]);
  const [starPos, setStarPos] = useState([
    {
      left: 0,
      mid: 0,
      right: 0,
    },
    {
      left: 0,
      mid: 0,
      right: 0,
    },
    {
      left: 0,
      mid: 0,
      right: 0,
    },
    {
      left: 0,
      mid: 0,

      right: 0,
    },
    {
      left: 0,
      mid: 0,

      right: 0,
    },
  ]);
  useEffect(() => {
    const starPosition = [...starPos];
    const ctnLeft = starCtn.current.offsetLeft;
    const child = starCtn.current.childNodes;
    child.forEach((item, index) => {
      let starLeft;
      let starRight;
      let starMid;
      if (index === 0) {
        starLeft = ctnLeft;
        starRight = starLeft + item.offsetWidth;
      } else {
        starLeft = starPosition[index - 1].right;
        starRight = starLeft + item.offsetWidth;
      }
      starMid = starLeft + (starRight - starLeft) / 2;
      starPosition[index].left = starLeft;
      starPosition[index].mid = starMid;
      starPosition[index].right = starRight;
    });
    setStarPos(starPosition);
  }, []);

  const handleCommitScore = () => {
    const ctnTop = starCtn.current.offsetTop;
    const cntBottom = ctnTop + starCtn.current.offsetHeight;
    if (
      starPos[0].left <= x &&
      x <= starPos[4].right &&
      ctnTop <= y &&
      y <= cntBottom
    ) {
      if (starPos[0].left + 20 <= x && x <= starPos[0].right) {
        if (x <= starPos[0].mid) {
          setScoreArr([0.5, 0, 0, 0, 0]);
          handleSetScore(0.5);
          return;
        }
        setScoreArr([1, 0, 0, 0, 0]);
        handleSetScore(1);
        return;
      }
      if (starPos[1].left <= x && x <= starPos[1].right) {
        if (x <= starPos[1].mid) {
          setScoreArr([1, 0.5, 0, 0, 0]);
          handleSetScore(1.5);
          return;
        }
        setScoreArr([1, 1, 0, 0, 0]);
        handleSetScore(2);
        return;
      }
      if (starPos[2].left <= x && x <= starPos[2].right) {
        if (x <= starPos[2].mid) {
          setScoreArr([1, 1, 0.5, 0, 0]);
          handleSetScore(2.5);
          return;
        }
        setScoreArr([1, 1, 1, 0, 0]);
        handleSetScore(3);
        return;
      }
      if (starPos[3].left <= x && x <= starPos[3].right) {
        if (x <= starPos[3].mid) {
          setScoreArr([1, 1, 1, 0.5, 0]);
          handleSetScore(3.5);
          return;
        }
        setScoreArr([1, 1, 1, 1, 0]);
        handleSetScore(4);
        return;
      }
      if (starPos[4].left <= x && x <= starPos[4].right) {
        if (x <= starPos[4].mid) {
          setScoreArr([1, 1, 1, 1, 0.5]);
          handleSetScore(4.5);
          return;
        }
        setScoreArr([1, 1, 1, 1, 1]);
        handleSetScore(5);
        return;
      }
    }
    setScoreArr([0, 0, 0, 0, 0]);
    handleSetScore(0);
    return;
  };

  return (
    <div className={`${className} w-1/2 mx-auto text-yellow-500`}>
      <span ref={starCtn} onClick={handleCommitScore}>
        {scoreArr.map((item, index) => (
          <span className='inline-block w-14 px-2' key={index}>
            <FontAwesomeIcon
              icon={
                item === 1 ? faStar : item === 0 ? faStarRegular : faStarHalfAlt
              }
            />
          </span>
        ))}
      </span>
    </div>
  );
};

export default StarRate;
