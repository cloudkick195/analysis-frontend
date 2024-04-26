import ButtonAddAtoms from 'components/atoms/form/ButtonAdd';
import CardHeaderMolecules from './CardHeader';

interface IProps {
  title: string;
  page: string;
  children:any;
  permission: string
}
const CardMolecules = ({children, page, title, permission, ...props}: IProps) => {
  return (
    <>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
        key="user-list"
        style={{minHeight: 'calc(100vh - 110.5px)'}}>
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="card card-custom">
              <CardHeaderMolecules permission={permission} title={title} page={page} />
              <div className="card-body">
              {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardMolecules;
