import { useEffect, useState } from "react";
import { getGameData } from "./gameData";

// тип для таймера
export type Seconds = {
    seconds: number;
    stopTimer: boolean;
};

// таймер
export const Timer = ({ seconds, stopTimer }: Seconds) => {
    
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [gameData, setGameData] = useState(() => {
      return getGameData();
    })
  
    useEffect(() => {
      if (!timeLeft || stopTimer) return;
  
      const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
          gameData.final.time = +timeLeft;
      }, 1000);
  
      return () => clearInterval(intervalId);
  
    }, [timeLeft]);
  
    return (
      <div>
        <h1>{timeLeft}</h1>
      </div>
    );
  
};