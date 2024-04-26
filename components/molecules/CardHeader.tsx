import ButtonAddAtoms from "components/atoms/form/ButtonAdd";
import PermissionCheck from "layouts/components/PermissionCheck";

interface IProps{
  title: string
  page: string
  permission:string
}
const CardHeaderMolecules = ({ page, title, permission, ...props }:IProps) => {
  return (
    <>
      <div className="card-header flex-wrap border-0 pt-6 pb-0">
        <div className="card-title">
          <h3 className="card-label">{title}</h3>
        </div>
        <div className="card-toolbar">
        <PermissionCheck permission={`${permission}-POST`}><ButtonAddAtoms page={page}/></PermissionCheck>
        </div>
      </div>
    </>
  );
};
export default CardHeaderMolecules;