import React from 'react'

const HeaderLayout = ({user, toggleUserPanel}:any) => {

    return (
        <div className="header header-fixed">
            <div className="container-fluid d-flex align-items-stretch justify-content-between">
                <div className="d-flex align-items-center flex-wrap mr-2"></div>
                <div className="topbar">
                    <div className="dropdown">
                    </div>
                    <div className="topbar-item">
                        <div onClick={toggleUserPanel} className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2">
                            <span
                                className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                            <span
                                className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">{user?.first_name}</span>
                            <span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
                                <span className="symbol-label font-size-h5 font-weight-bold">{user?.first_name[0]}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderLayout