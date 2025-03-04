import React, { useState, useEffect } from 'react';

const DynamicYearsCounter = () => {
    const [elapsedTime, setElapsedTime] = useState({ years: 0, months: 0 });

    useEffect(() => {
        const calculateElapsedTime = () => {
            const startDate = new Date(2023, 5, 1);
            const currentDate = new Date();

            let years = currentDate.getFullYear() - startDate.getFullYear();
            let months = currentDate.getMonth() - startDate.getMonth() + 1;

            if (currentDate.getDate() < startDate.getDate()) {
                months--;
            }

            if (months > 12) {
                years++;
                months -= 12;
            } else if (months < 0) {
                years--;
                months += 12;
            }

            setElapsedTime({ years, months });
        };

        calculateElapsedTime();

        const interval = setInterval(calculateElapsedTime, 86400000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span>
            {elapsedTime.years}.{elapsedTime.months}
        </span>
    );
};

export default DynamicYearsCounter;
