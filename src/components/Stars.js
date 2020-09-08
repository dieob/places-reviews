import React from 'react';
import './Stars.scss';

const Stars = ({ n }) => {
  let stars = []

  //rounsing n 4.2
  var rounded = n.toFixed(1).toString();
  var number = 0;
  var lastChar = rounded[rounded.length -1];

  if(parseInt(lastChar) < 7){
    number = Math.floor(rounded);
  } else {
    number = Math.ceil(rounded);
  }

  for (let i = 0; i < number; ++i) {
    stars.push(
    <svg key={i} className="stars">
      <use xlinkHref="images/sprite.svg#icon-star"></use>
    </svg>
    )
  }

  return (
    <div>
      {stars}
    </div>
  )
}

export default Stars