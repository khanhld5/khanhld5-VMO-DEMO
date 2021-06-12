import React, { useEffect, useRef, useState } from 'react';
import useMousePosition from '../../../../hooks/useMousePosition';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRate = (props) => {
  const { className, handleSetScore } = props;
  const { x, y } = useMousePosition();
  const starCtn = useRef();
  const [commit, setCommit] = useState(false);
  const [hover, setHover] = useState(false);
  const [scoreArr, setScoreArr] = useState([
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
  ]);
  const [scoreArrClone, setScoreArrClone] = useState([
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
    { visible: false, value: 1 },
  ]);
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

  const fillValue = (arrValue, arrResult) => {
    arrValue.forEach((item, index) => {
      arrResult[index].value = item;
      if (item === 0) arrResult[index].visible = false;
      else arrResult[index].visible = true;
    });
  };
  const fillVisible = (index, arr) => {
    const res = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < res.length; i++) {
      if (i <= index) {
        res[i].visible = true;
        continue;
      }
      res[i].visible = false;
    }
    setScoreArrClone(res);
  };

  const handleCommitScore = () => {
    const ctnTop = starCtn.current.offsetTop;
    const cntBottom = ctnTop + starCtn.current.offsetHeight;
    const newScoreArr = [...scoreArr];
    setCommit(true);
    if (
      starPos[0].left <= x &&
      x <= starPos[4].right &&
      ctnTop <= y &&
      y <= cntBottom
    ) {
      if (starPos[0].left + 20 <= x && x <= starPos[0].right) {
        if (x <= starPos[0].mid) {
          fillValue([0.5, 0, 0, 0, 0], newScoreArr);
          setScoreArr(newScoreArr);
          handleSetScore(0.5);
          return;
        }
        fillValue([1, 0, 0, 0, 0], newScoreArr);
        setScoreArr(newScoreArr);
        handleSetScore(1);
        return;
      }
      if (starPos[1].left <= x && x <= starPos[1].right) {
        if (x <= starPos[1].mid) {
          fillValue([1, 0.5, 0, 0, 0], newScoreArr);
          setScoreArr(newScoreArr);
          handleSetScore(1.5);
          return;
        }
        fillValue([1, 1, 0, 0, 0], newScoreArr);
        setScoreArr(newScoreArr);
        handleSetScore(2);
        return;
      }
      if (starPos[2].left <= x && x <= starPos[2].right) {
        if (x <= starPos[2].mid) {
          fillValue([1, 1, 0.5, 0, 0], newScoreArr);
          setScoreArr(newScoreArr);
          handleSetScore(2.5);
          return;
        }
        fillValue([1, 1, 1, 0, 0], newScoreArr);
        setScoreArr(newScoreArr);
        handleSetScore(3);
        return;
      }
      if (starPos[3].left <= x && x <= starPos[3].right) {
        if (x <= starPos[3].mid) {
          fillValue([1, 1, 1, 0.5, 0], newScoreArr);

          setScoreArr(newScoreArr);
          handleSetScore(3.5);
          return;
        }
        fillValue([1, 1, 1, 1, 0], newScoreArr);
        setScoreArr(newScoreArr);
        handleSetScore(4);
        return;
      }
      if (starPos[4].left <= x && x <= starPos[4].right) {
        if (x <= starPos[4].mid) {
          fillValue([1, 1, 1, 1, 0.5], newScoreArr);
          setScoreArr(newScoreArr);
          handleSetScore(4.5);
          return;
        }
        fillValue([1, 1, 1, 1, 1], newScoreArr);
        setScoreArr(newScoreArr);
        handleSetScore(5);
        return;
      }
    }
    fillValue([0, 0, 0, 0, 0], newScoreArr);
    setScoreArr(newScoreArr);
    handleSetScore(0);
    return;
  };

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

  return (
    <div
      className={`${className} w-1/2 mx-auto transition-all ease-in-out duration-300`}
    >
      <span
        className=' opacity-50 hover:opacity-100 text-gray-400'
        ref={starCtn}
        onClick={handleCommitScore}
      >
        {scoreArr.map((item, index) => (
          <span
            className={`inline-block w-14 px-2 ${
              hover
                ? scoreArrClone[index].visible
                  ? 'text-yellow-500'
                  : ''
                : item.visible
                ? 'text-yellow-500'
                : ''
            }`}
            key={index}
            onMouseOver={() => {
              fillVisible(index, scoreArr);
              setHover(true);
            }}
            onMouseLeave={
              !commit
                ? () => {
                    fillVisible(-1, scoreArr);
                    setHover(false);
                  }
                : () => setHover(false)
            }
          >
            <FontAwesomeIcon
              icon={
                item.value === 1
                  ? faStar
                  : item.value === 0
                  ? faStarRegular
                  : faStarHalfAlt
              }
            />
          </span>
        ))}
      </span>
    </div>
  );
};

export default StarRate;
