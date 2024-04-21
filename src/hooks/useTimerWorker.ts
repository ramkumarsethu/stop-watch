import { wrap } from 'comlink';
import { useEffect, useRef, useState } from 'react';
import { TimerServiceWorker } from 'src/workers/TimerWorker';
/**
 * This hook setups the web worker to establish a connection between main thread & web worker thread for message communication.
 *
 */
const useTimerWorker = () => {
  const worker = useRef<Worker | null>(null);
  const workerMethods = useRef<TimerServiceWorker | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const setupTimerWorkerThread = () => {
      worker.current = new Worker(new URL('../workers/TimerWorker', import.meta.url));
      workerMethods.current = wrap<import('../workers/TimerWorker').TimerServiceWorker>(
        worker.current
      );
    };
    setupTimerWorkerThread();

    if (worker.current) {
      worker.current.onmessage = (e) => {
        if (typeof e.data === 'number') {
          setTimer(e.data);
        }
      };
    }

    return () => {
      worker.current?.terminate();
    };
  }, []);

  return {
    workerMethods: workerMethods.current,
    timer,
    setTimer
  };
};

export default useTimerWorker;
