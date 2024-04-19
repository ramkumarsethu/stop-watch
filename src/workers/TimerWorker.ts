import { expose } from 'comlink';

let timer = 0;
let intervalId = 0;

/** This function sets up the interval that increments the timer count every 10 ms and post a message with the timer count to the main thread */
const setTimerInterval = () => {
  intervalId = setInterval(() => {
    ++timer;
    self.postMessage(timer);
  }, 10);
};

/**
 * This is a web worker that runs an interval function for every 10 ms to increase timer count and sends the new timer count value to the main thread.
 * The main thread can also communicate to this web worker thread using the service methods exposed by the web worker thread for starting/stopping & resetting the timer.
 * Setting up the interval in a web worker thread instead of being in the component so that interval runs without any interruption that usually happens when switchig tabs if it had been setup on the main thread
 */
const TimerWorker = {
  /** This service method starts the timer i.e. start the interval with initial timer value of 0 */
  startTimer: async (newTimerValue: number) => {
    timer = newTimerValue;
    setTimerInterval();
  },
  /** This service method updates the timer with the value from the StopWatch component basically to reset the milliseconds count */
  updateTimer: async (newTimerValue: number) => {
    timer = newTimerValue;
  },
  /** This service method stops the timer */
  stopTimer: async () => {
    clearInterval(intervalId);
  },
  /** This service method resets the timer */
  resetTimer: async () => {
    clearInterval(intervalId);
  }
};

export type TimerServiceWorker = typeof TimerWorker;

expose(TimerWorker);
