import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((history) => {
      const newHistory = [...history];

      if (replace) {
        newHistory.pop();
      }

      newHistory.push(newMode);
      setMode(newMode);

      return newHistory;
    });
  };

  const back = () => {
    setHistory((history) => {
      const newHistory = [...history];

      if (newHistory.length > 1) {
        newHistory.pop();
        setMode(newHistory[newHistory.length - 1]);
      }
      return newHistory;
    });
  };

  return { mode, transition, back };
}
