import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import './DatePickerPanel.module.css'

interface RangePickProps {
    dateRange: Date[] | null; // Пропс для текущего диапазона дат
    setDateRange: (dates: Date[] | null) => void; // Пропс для функции изменения диапазона дат
}

const RangePick: React.FC<RangePickProps> = ({ dateRange, setDateRange }) => {
    const [dates, setDates] = useState<Date[] | null>(dateRange);

    return (
        <div className="card flex justify-content-center">
            <Calendar
                value={dates}
                onChange={(e) => {
                    setDates(e.value as Date[] | null); // Обновляем локальное состояние
                    setDateRange(e.value as Date[] | null); // Обновляем состояние родительского компонента
                }}
                selectionMode="range"
                readOnlyInput
                // hideOnRangeSelection
                touchUI
                style={{width: '100%'}}
                inputStyle={{
                    position: 'inherit',
                    border: '0px solid #ccc',
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '40px'
                    // borderRadius: '12px',
                    // width: ''
                }}
            />
        </div>
    );
};

export default RangePick;
