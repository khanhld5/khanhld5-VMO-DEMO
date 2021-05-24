import React, { useEffect, useState } from 'react';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Star = (props) => {
  const { className, score } = props;
  const [scoreArr, setScoreArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const scoreArrClone = [0, 0, 0, 0, 0];
    let rate = score;
    if (rate !== 0)
      for (let i = 0; i < 5; i++) {
        rate--;
        if (rate >= 0) {
          scoreArrClone[i] = 1;
        } else if (rate < 0) {
          if (rate > -1) {
            scoreArrClone[i] = 0.5;
          } else {
            scoreArrClone[i] = 0;
          }
          break;
        }
      }
    setScoreArr(scoreArrClone);
  }, [score]);
  return (
    <span className={`${className} text-yellow-500`}>
      {scoreArr.map((item, index) =>
        item === 1 ? (
          <FontAwesomeIcon key={index} icon={faStar} />
        ) : item === 0 ? (
          <FontAwesomeIcon key={index} icon={faStarRegular} />
        ) : (
          <FontAwesomeIcon key={index} icon={faStarHalfAlt} />
        )
      )}
    </span>
  );
};

export default Star;
