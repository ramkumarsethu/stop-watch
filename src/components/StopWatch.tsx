import { useCallback, useEffect, useRef, useState } from 'react';
import StopWatchButton from './Button';

const resetValue = '00:00:00.00';

const StopWatch = () => {
  const displayRef = useRef<{ counterString: string }>({ counterString: resetValue });
  const timerIntervalRef = useRef<{ intervalRef: ReturnType<typeof setInterval> }>({
    intervalRef: 0
  });
  const minutesHoursRef = useRef<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [timer, setTimer] = useState(0);
  const [startCounter, setStartCounter] = useState(false);

  const startStopCounter = useCallback((startCounter: boolean, resetCounter?: boolean) => {
    if (startCounter) {
      const intervalNumber = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
      timerIntervalRef.current.intervalRef = intervalNumber;
    } else if (resetCounter) {
      clearInterval(timerIntervalRef.current.intervalRef);
      setTimer(0);
      minutesHoursRef.current = {
        hours: 0,
        minutes: 0
      };
      displayRef.current.counterString = resetValue;
    } else {
      clearInterval(timerIntervalRef.current.intervalRef);
    }
  }, []);

  const padTwoDigits = useCallback((digits: string) => {
    if (digits) {
      return digits.padStart(2, '0');
    } else {
      return '00';
    }
  }, []);

  const resetButtonHandler = useCallback(() => {
    startStopCounter(false, true);
    setStartCounter(false);
  }, [startStopCounter]);

  const startButtonHandler = useCallback(() => {
    startStopCounter(!startCounter);
    setStartCounter((startFlag) => !startFlag);
  }, [startCounter, startStopCounter]);

  useEffect(() => {
    if (displayRef.current) {
      const minutes = Math.floor(timer / 6000);
      if (minutes + minutesHoursRef.current.minutes > minutesHoursRef.current.minutes) {
        const newMinutes = minutesHoursRef.current.minutes + 1;
        if (newMinutes === 60) {
          minutesHoursRef.current.hours += 1;
          minutesHoursRef.current.minutes = 0;
        } else {
          minutesHoursRef.current.minutes = newMinutes;
        }
        setTimer(0);
      }
      const seconds = (timer / 100.0).toString().split('.');
      displayRef.current.counterString = `${padTwoDigits(
        minutesHoursRef.current.hours.toString() //displaying hours
      )}:${padTwoDigits(
        minutesHoursRef.current.minutes.toString() //displaying minutes
      )}:${padTwoDigits(
        seconds[0] //displaying seconds
      )}.${padTwoDigits(seconds[1])}`; //displaying milliseconds
    }
  }, [timer, padTwoDigits]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        rowGap: 20,
        backgroundColor: 'beige'
      }}>
      <div style={{ fontSize: 50 }}>{displayRef.current.counterString}</div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '50vw' }}>
        <StopWatchButton
          onClickHandler={resetButtonHandler}
          buttonClass="btn-secondary"
          label="Reset"
        />
        <StopWatchButton
          onClickHandler={startButtonHandler}
          buttonClass={startCounter ? 'btn-danger' : 'btn-success'}
          label={startCounter ? 'Stop' : 'Start'}
        />
      </div>
    </div>
  );
};

export default StopWatch;
