import Alert from "./alert";

interface AlertErrorProps {
  message: string;
}

const AlertError = ({ message }:AlertErrorProps) => {
  return (
    <Alert icon="flaticon-danger" type="danger" message={message}/>
  );
};

export default AlertError;