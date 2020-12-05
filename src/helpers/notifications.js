import { store } from 'react-notifications-component';

const notification = (title, message, type) => {
    store.addNotification({
        title,
        message,
        type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'slideInRight'],
        animationOut: ['animated', 'zoomOut'],
        dismiss: {
            duration: 3000,
            pauseOnHover: true,
        },
    });
};

export default notification;
