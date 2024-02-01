import React, { useState, useEffect } from "react";
import './DoubleRange.css';
const DoubleRange = ({ onChange1 }) => {
    const [minvalue, setminValue] = useState(0);
    const [maxvalue, setmaxValue] = useState(100);
    useEffect(() => {
        onChange1(minvalue, maxvalue);
    }, [minvalue, maxvalue]);
    return (<div>
        <h1>Filter By Age</h1>
        <div className="doubleRange-parent">
            <div>
                <input
                    id="min"
                    type="range"
                    min="1"
                    max="100"
                    value={minvalue}
                    onChange={(e) => setminValue(Math.min(e.target.value, maxvalue))}
                />
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={maxvalue}
                    onChange={(e) => setmaxValue(Math.max(e.target.value, minvalue))}
                />
            </div>
            <p>
                <span className="pull-left">min: {minvalue}</span>
                <span className="pull-right">max: {maxvalue}</span>
            </p>
        </div></div>
    );
};
export default DoubleRange;
