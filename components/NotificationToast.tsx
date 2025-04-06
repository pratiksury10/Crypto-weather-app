'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NotificationToast = () => {
  const notifications = useSelector((state: RootState) => state.notifications);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.slice(-5).map((n, idx) => (
        <div
          key={idx}
          className={`px-4 py-2 rounded-lg shadow text-white ${
            n.type === 'price_alert' ? 'bg-green-600' : 'bg-yellow-500'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
