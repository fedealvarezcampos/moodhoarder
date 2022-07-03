import { toast } from 'react-toastify';

const notifyError = message => {
    toast.warn(`${message}`, {
        position: 'bottom-right',
        limit: '3',
    });
};

const notifyMessage = message => {
    toast.success(`${message}`, {
        position: 'bottom-right',
        limit: '3',
    });
};

export { notifyError, notifyMessage };
