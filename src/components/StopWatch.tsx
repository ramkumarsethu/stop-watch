import { useCallback, useEffect, useRef, useState } from 'react';
import StopWatchButton from './Button';

const defaultValue: { hours: number; minutes: number; seconds: number; milliSeconds: number } = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliSeconds: 0
};

const StopWatch = () => {
  const timerIntervalRef = useRef<{ intervalRef: ReturnType<typeof setInterval> }>({
    intervalRef: 0
  });
  const [minutesHours, setMinutesHours] = useState({ ...defaultValue });
  const [timer, setTimer] = useState(0);
  const [startCounter, setStartCounter] = useState(false);
  const [resetPressed, setResetPressed] = useState(false);

  const startStopCounter = useCallback((startCounter: boolean, resetCounter?: boolean) => {
    if (startCounter) {
      const intervalNumber = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
      timerIntervalRef.current.intervalRef = intervalNumber;
    } else if (resetCounter) {
      clearInterval(timerIntervalRef.current.intervalRef);
      setResetPressed(true);
    } else {
      clearInterval(timerIntervalRef.current.intervalRef);
    }
  }, []);

  useEffect(() => {
    if (resetPressed) {
      setMinutesHours({ ...defaultValue });
      setTimer(0);
    }
  }, [resetPressed]);

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
    setResetPressed(false);
    startStopCounter(!startCounter);
    setStartCounter((startFlag) => !startFlag);
  }, [startCounter, startStopCounter]);

  useEffect(() => {
    const minutes = Math.floor(timer / 6000);
    if (minutes + minutesHours.minutes > minutesHours.minutes) {
      const newMinutes = minutesHours.minutes + 1;
      if (newMinutes === 60) {
        setMinutesHours((oldValue) => ({ ...oldValue, hours: oldValue.hours + 1, minutes: 0 }));
      } else {
        setMinutesHours((oldValue) => ({ ...oldValue, minutes: newMinutes }));
      }
      setTimer(0);
    } else {
      const seconds = Number.parseFloat((timer / 100).toString())
        .toFixed(2)
        .split('.');
      setMinutesHours((oldValue) => {
        return {
          ...oldValue,
          seconds: seconds[0] ? Number(seconds[0]) : 0,
          milliSeconds: seconds[1] ? Number(seconds[1]) : 0
        };
      });
    }
  }, [timer, padTwoDigits, minutesHours.minutes]);

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
      <div style={{ fontSize: '15vw', display: 'flex', columnGap: 5 }}>
        <>
          {padTwoDigits(
            minutesHours.hours.toString() //displaying hours
          )}
          :
          {padTwoDigits(
            minutesHours.minutes.toString() //displaying minutes
          )}
          :
          {padTwoDigits(
            minutesHours.seconds.toString() //displaying seconds
          )}
          .
          {padTwoDigits(
            minutesHours.milliSeconds.toString() //displaying milli seconds
          )}
        </>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-around', width: '50vw', columnGap: 10 }}>
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
