
export type ErrorType = {
    [key: string]: string;
  };
const error: ErrorType  = {
  user_existed: 'Người dùng đã tồn tại',
  wrong_password: 'Sai mật khẩu'
};

export class ErrorHandler {
  private error: ErrorType;

  constructor(error: ErrorType) {
    this.error = error;
  }

  handleErrorMessage(errMess: string) {
    if (errMess) {
      if (this.error[errMess]) return this.error[errMess]
      return errMess
    }
    return "Đã có lỗi xảy ra, vui lòng thử lại sau"
  }
}

export default new ErrorHandler(error)