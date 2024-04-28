import { useCallback, useEffect, useState } from 'react';
import StopWatchButton from './Button';
import { Time } from 'src/types/Time';
import useTimerWorker from 'src/hooks/useTimerWorker';

const defaultValue: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliSeconds: 0
};

const StopWatch = () => {
  const [minutesHours, setMinutesHours] = useState({ ...defaultValue });
  const [startCounter, setStartCounter] = useState(false);
  const { workerMethods, timer, setTimer } = useTimerWorker();

  const padTwoDigits = useCallback((digits: string) => {
    if (digits) {
      return digits.padStart(2, '0');
    } else {
      return '00';
    }
  }, []);

  const resetButtonHandler = useCallback(async () => {
    setStartCounter(false);
    setMinutesHours({ ...defaultValue });
    await workerMethods?.resetTimer();
    setTimer(0);
  }, [workerMethods, setTimer]);

  const startButtonHandler = useCallback(async () => {
    if (startCounter) {
      await workerMethods?.stopTimer();
    } else {
      await workerMethods?.startTimer(timer);
    }
    setStartCounter((startFlag) => !startFlag);
  }, [workerMethods, startCounter, timer]);

  useEffect(() => {
    const setNewTimerValueInWorker = async (value: number) =>
      await workerMethods?.updateTimer(value);
    const minutes = Math.floor(timer / 6000);
    if (minutes + minutesHours.minutes > minutesHours.minutes) {
      const newMinutes = minutesHours.minutes + 1;
      if (newMinutes === 60) {
        setMinutesHours((oldValue) => ({ ...oldValue, hours: oldValue.hours + 1, minutes: 0 }));
      } else {
        setMinutesHours((oldValue) => ({ ...oldValue, minutes: newMinutes }));
      }
      setTimer(0);
      setNewTimerValueInWorker(0);
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
  }, [timer, padTwoDigits, minutesHours.minutes, setTimer, workerMethods]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        rowGap: 20,
        backgroundColor: 'inherit',
        justifyItems: 'center'
      }}>
      <div
        style={{
          fontSize: '15vw',
          display: 'flex',
          columnGap: 5,
          maxWidth: '70vw',
          color: 'white'
        }}>
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
