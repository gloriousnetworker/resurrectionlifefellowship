// components/admin/NotificationAlert.jsx
const NotificationAlert = ({ message, type }) => {
    if (!message) return null;
  
    const alertClasses = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };
  
    return (
      <div className={`mb-6 p-4 rounded-lg ${alertClasses[type]}`}>
        {message}
      </div>
    );
  };
  
  export default NotificationAlert;