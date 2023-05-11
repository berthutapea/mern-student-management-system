import { useState } from "react";
import "../App.css";

function CounterFunction() {
  const [number, setNumber] = useState(0);

  const increament = () => {
    setNumber(number + 1);
  };
  const decrement = () => {
    setNumber(number - 1);
  };
  const reset = () => {
    setNumber(0);
  };

  return (
    <div>
      <h2 className="countClass">Function Base Approch</h2>
      <h2>Number : {number}</h2>
      <button onClick={increament}>+</button>{" "}
      <button onClick={decrement}>-</button>{" "}
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default CounterFunction;
