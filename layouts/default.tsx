import React, {FC, createContext, useEffect, useState} from 'react';
import {Aside, Footer, Header, HeaderMobile} from 'layouts';
import {selectUi} from 'slices/ui/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Preloader} from 'components/atoms';
import {useUserSlice} from 'slices/user';
import {selectUser} from 'slices/user/selectors';

import UserPannel from './components/UserPannel';

interface Props {
  children?: any;
}

export interface IRolePermissionsProps {
  user: {
    roles: any;
  };
  permissions: any;
}

export const PermissionContext = createContext({});

const DefaultLayout: FC<Props> = (props: Props) => {
  const {children} = props;
  const {alert, loading} = useSelector(selectUi);
  const dispatch = useDispatch();

  const {data} = useSelector(selectUser);

  const {currentUser} = useUserSlice();

  useEffect(() => {
    dispatch(currentUser(null));
  }, []);

  const dataUser: IRolePermissionsProps = {
    user: data?.current?.data,
    permissions: {},
  };

  dataUser.user?.roles?.length > 0 &&
    dataUser.user.roles.forEach((item: any) => {
      item.permissions?.length > 0 &&
        item.permissions.forEach((itemPermission: any) => {
          dataUser.permissions[itemPermission.guard_name] = itemPermission;
        });
    });

  const [userPanelVisible, setUserPanelVisible] = useState(false);

  const toggleUserPanel = () => {
    setUserPanelVisible(!userPanelVisible);
  };

  const handleOutsideClick = () => {
    if (userPanelVisible) {
      setUserPanelVisible(false);
    }
  };
  
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <PermissionContext.Provider value={dataUser}>
          <div
            onClick={handleOutsideClick}
            className="header-fixed header-mobile-fixed aside-enabled aside-fixed aside-minimize-hoverable">
            <Alert
              type={alert.type}
              title={alert.title}
              isShow={alert.isShow}
            />
   
            <Header user={dataUser.user} toggleUserPanel={toggleUserPanel} />
            <HeaderMobile />
            <div className="d-flex flex-column flex-root">
              <div className="d-flex flex-row flex-column-fluid page">
                <Aside permissions={dataUser.permissions} />
                <div className="d-flex flex-column flex-row-fluid wrapper">
                  <div
                    className="content d-flex flex-column flex-column-fluid"
                    style={{minHeight: 'calc(100vh - 110.5px)'}}>
                    <div className="d-flex flex-column-fluid">
                      <div className="container">{children}</div>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
            <UserPannel
            user={dataUser.user}
              userPanelVisible={userPanelVisible}
              setUserPanelVisible={setUserPanelVisible}
            />
            {userPanelVisible && <div className="offcanvas-overlay"></div>}
          </div>
        </PermissionContext.Provider>
      )}
    </>
  );
};

export default DefaultLayout;
