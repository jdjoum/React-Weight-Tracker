import React from 'react';

const BmiRanges = () => {
    return (
        <div className="bmi-ranges">
            <h2>BMI Categories and Ranges</h2>
            <ul>
                <li>
                    <span className="category">Underweight:</span> 
                    <span className="range">Less than 18.5</span>
                </li>
                <li>
                    <span className="category">Normal weight:</span> 
                    <span className="range">18.5 - 24.9</span>
                </li>
                <li>
                    <span className="category">Overweight:</span> 
                    <span className="range">25 - 29.9</span>
                </li>
                <li>
                    <span className="category">Obesity:</span> 
                    <span className="range">30 or greater</span>
                </li>
            </ul>
        </div>
    );
};

export default BmiRanges;
