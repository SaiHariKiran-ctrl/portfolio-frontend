import React, { useState, useEffect } from 'react';

const DynamicYearsCounter = () => {
    const [years, setYears] = useState(0);

    useEffect(() => {
        const calculateYears = () => {
            const startDate = new Date(2023, 5, 1);
            const currentDate = new Date();

            let yearDiff = currentDate.getFullYear() - startDate.getFullYear();

            const monthDiff = currentDate.getMonth() - startDate.getMonth();
            if (
                monthDiff < 0 ||
                (monthDiff === 0 && currentDate.getDate() < startDate.getDate())
            ) {
                yearDiff--;
            }

            const totalMonths =
                yearDiff * 12 + (monthDiff < 0 ? 12 + monthDiff : monthDiff);
            const yearsDecimal = totalMonths / 12;

            setYears(Math.round(yearsDecimal * 10) / 10);
        };

        calculateYears();

        const interval = setInterval(calculateYears, 86400000);

        return () => clearInterval(interval);
    }, []);

    return <span>{years}</span>;
};

export default DynamicYearsCounter;
