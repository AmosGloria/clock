import React, { useState, useEffect, useRef } from "react";
import LengthControl from "./LengthControl";
import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";

const DEFAULT_BREAK = 5;
const DEFAULT_SESSION = 25;

export default function Clock() {
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK);      
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION); 
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION * 60);     
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("session");

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return (
      String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0")
    );
  };

  const resetAll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setBreakLength(DEFAULT_BREAK);
    setSessionLength(DEFAULT_SESSION);
    setTimeLeft(DEFAULT_SESSION * 60);
    setMode("session");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBreakChange = (delta) => {
    if (isRunning) return; 
    setBreakLength((prev) => {
      const next = prev + delta;
      if (next < 1 || next > 60) return prev;
      return next;
    });
  };

  const handleSessionChange = (delta) => {
    if (isRunning) return;
    setSessionLength((prev) => {
      const next = prev + delta;
      if (next < 1 || next > 60) return prev;
      if (mode === "session") {
        setTimeLeft(next * 60);
      }
      return next;
    });
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            if (audioRef.current) {
              audioRef.current.play();
            }

            if (mode === "session") {
              setMode("break");
              return breakLength * 60;
            } else {
              setMode("session");
              return sessionLength * 60;
            }
          }

          if (prev === 1 && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, mode, breakLength, sessionLength]);

  return (
    <div className="clock-container">
      <h1 className="title">25 + 5 Clock</h1>

      <div className="length-controls">
        <LengthControl
          labelId="break-label"
          labelText="Break Length"
          lengthId="break-length"
          decrementId="break-decrement"
          incrementId="break-increment"
          length={breakLength}
          onDecrement={() => handleBreakChange(-1)}
          onIncrement={() => handleBreakChange(1)}
        />

        <LengthControl
          labelId="session-label"
          labelText="Session Length"
          lengthId="session-length"
          decrementId="session-decrement"
          incrementId="session-increment"
          length={sessionLength}
          onDecrement={() => handleSessionChange(-1)}
          onIncrement={() => handleSessionChange(1)}
        />
      </div>

      <TimerDisplay
        mode={mode}
        timeLeft={formatTime(timeLeft)}
      />

      <Controls
        onStartStop={handleStartStop}
        onReset={resetAll}
      />

      <audio
        id="beep"
        ref={audioRef}
        preload="auto"
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />
    </div>
  );
}
