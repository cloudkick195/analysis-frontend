import Alert from "./alert";
import AlertError from "./error";
import AlertSucess from "./sucess";

interface AlertErrorOrSucessProps {
  message: string;
}

const AlertErrorOrSucess = ({ message }:AlertErrorOrSucessProps) => {
  return (
    message &&
    (
      message == 'success' && <AlertSucess message={message}/> || <AlertError message={message}/>
    ) || <></>
  );
};

export default AlertErrorOrSucess;