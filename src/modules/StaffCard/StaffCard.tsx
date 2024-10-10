import React from 'react';
import { Staff } from '../../models/StaffModel';
import styles from './StaffCard.module.css';

interface StaffCardProps {
    staff: Staff;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
    return (
        <div className={styles.card}>
            <img src={staff.photo} alt={staff.full_name} className={styles.image} />
            <h3 className={styles.name}>{staff.full_name}</h3>
            <p className={styles.role}>{staff.role}</p>
        </div>
    );
};

export default StaffCard;
