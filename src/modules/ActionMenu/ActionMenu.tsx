import React from 'react';
import styles from './ActionMenu.module.css';
import ActionButton from '../ActionButton/ActionButton';
import { ButtonModel } from '../../models/ButtonModel';

interface ActionMenuProps {
    buttons: ButtonModel[];
}

const ActionMenu: React.FC<ActionMenuProps> = ({ buttons }) => {
    return (
        <div className={styles.menuContainer}>
            {buttons.map((button, index) => (
                <ActionButton
                    key={index}
                    text={button.text}
                    link={button.link} // Передаем ссылку в ActionButton
                    action={button.action} // Передаем действие в ActionButton
                />
            ))}
        </div>
    );
};

export default ActionMenu;
