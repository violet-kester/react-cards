import React from "react";

/** Component for Card
 * 
 * Props:
 * - imageSrc for card image URL
 * 
 * State:
 * - none
 * 
 * CardGame -> Card
 */

function Card({ imageSrc }) {
  return (
    <div className="Card">
      <img src={imageSrc} />
    </div>
  )
}

export default Card;