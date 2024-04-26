import ButtonAddAtoms from 'components/atoms/form/ButtonAdd';
import CardHeaderMolecules from './CardHeader';
import {Stack} from '@mui/material';

interface objStack {
  label: string;
  val: string;
  func: any;
}

interface IProps {
  children: any;
  title: string;
  loading: boolean;
  stack?: {
    value: string;
    data: Array<objStack>;
  };
}
const BoxMolecules = ({children, title, loading, stack}: IProps) => {
  return (
    <>
      <div className={`card card-custom overlay ${loading && 'overlay-block'}`}>
        <div className="card-header">
          <div className="card-title">
            <h3 className="card-label">{title}</h3>
          </div>
          <div className="card-toolbar">
            <Stack direction="row" alignItems="center" spacing={2}>
              {stack?.data?.map((item: objStack, idx:number) => {
                return (
                <div
                  key={idx}
                  className={`btn btn-light-primary btn-sm font-weight-bolder ${
                    stack.value === item.val ? 'active' : ''
                  }`}
                  onClick={item.func}>
                  {item.label}
                </div>
                );
              })}
            </Stack>
          </div>
        </div>
        <div className="card-body">
          <div className="overlay-wrapper">{children}</div>
          {loading && (
            <div className="overlay-layer bg-dark-o-10">
              <div className="spinner spinner-primary"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default BoxMolecules;
