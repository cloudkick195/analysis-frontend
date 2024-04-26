import Alert from "./alert";

interface AlertErrorProps {
  message: string;
}

const AlertSucess = ({ message }:AlertErrorProps) => {
  return (
    <Alert icon="flaticon2-checkmark" type="success" message={message}/>
  );
};

export default AlertSucess;