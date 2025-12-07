import React from "react";

export default function LengthControl({
  labelId,
  labelText,
  lengthId,
  decrementId,
  incrementId,
  length,
  onDecrement,
  onIncrement,
}) {
  return (
    <div className="length-control">
      <div id={labelId} className="length-label">
        {labelText}
      </div>
      <div className="length-buttons">
        <button id={decrementId} onClick={onDecrement}>
          -
        </button>
        <span id={lengthId}>{length}</span>
        <button id={incrementId} onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
}
