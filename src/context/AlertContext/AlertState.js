import { useState } from 'react';
import AlertContext from './AlertContext';

const AlertState = (props) => {
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertType, setAlertType] = useState(null);

    const showAlert = (msg, type) => {
        setAlertMsg(msg);
        setAlertType(type);

        setTimeout(() => {
            setAlertMsg(null);
            setAlertType(null);
        }, 2000);
    }

    return (
        <AlertContext.Provider value={{ alertMsg, alertType, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;