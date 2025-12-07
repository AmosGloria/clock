import React from "react";

export default function TimerDisplay({ mode, timeLeft }) {
  const labelText = mode === "session" ? "Session" : "Break";

  return (
    <div className="timer">
      <div id="timer-label" className="timer-label">
        {labelText}
      </div>
      <div id="time-left" className="time-left">
        {timeLeft}
      </div>
    </div>
  );
}
