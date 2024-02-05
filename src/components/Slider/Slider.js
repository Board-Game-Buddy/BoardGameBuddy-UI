import React, { useState } from "react";

const Slider = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleMinChange = (event) => {
    const { value } = event.target;
    setMin(value);
  };

  const handleMaxChange = (event) => {
    const { value } = event.target;
    setMax(value);
  };

  return (
    <div>
      <label>
        Min:
        <input
          type="range"
          min={0}
          max={max}
          value={min}
          onChange={handleMinChange}
        />
        {min}
      </label>
      <label>
        Max:
        <input
          type="range"
          min={min}
          max={100}
          value={max}
          onChange={handleMaxChange}
        />
        {max}
      </label>
    </div>
  );
};

export default Slider;
