import React from "react";

export default function Controls({ onStartStop, onReset }) {
  return (
    <div className="controls">
      <button id="start_stop" onClick={onStartStop}>
        ▶ / ⏸
      </button>
      <button id="reset" onClick={onReset}>
        ⟲
      </button>
    </div>
  );
}
