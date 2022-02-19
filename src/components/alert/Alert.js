import React, { useContext } from 'react';
import AlertContext from '../../context/AlertContext/AlertContext';


const Alert = () => {
    const alert = useContext(AlertContext);
    return (
        <div className={`alert alert-${alert.alertType}`} role="alert">
            {alert.alertMsg}
        </div>
    )
}

export default Alert;