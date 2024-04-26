interface AlertProps {
  icon:string;
  type: string;
  message: string;
}

const Alert = ({ icon, type, message }:AlertProps) => {
  const alertClassName = `alert alert-custom alert-notice alert-light-${type} fade show mb-5`;

  return (
    <div className={alertClassName} role="alert">
      <div className="alert-icon">
        <i className={`${icon}`}></i>
      </div>
      <div className="alert-text">{message}</div>;
    </div>
  );
};

export default Alert;