import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Logo} from 'assets/images';
import {Image} from 'components/atoms';
import {Box} from '@mui/material';
interface IProps {
  permissions?: any;
}

const AsideLayout = ({permissions}: IProps) => {
  const router = useRouter();

  const menus = [
    {
      id: 1,
      label: 'Dashboard',
      permissions: ['statistics-GET'],
      link: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z"
              fill="#000000"
              fillRule="nonzero"
            />
            <path
              d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z"
              fill="#000000"
              opacity="0.3"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      label: 'Báo cáo',
      permissions: ['statistics-GET'],
      section: true,
    },
    {
      id: 3,
      label: 'Hệ thống',
      link: '/system',
      permissions: ['statistics-GET'],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <rect
              fill="#000000"
              opacity="0.3"
              x="2"
              y="3"
              width="20"
              height="18"
              rx="2"></rect>
            <path
              d="M9.9486833,13.3162278 C9.81256925,13.7245699 9.43043041,14 9,14 L5,14 C4.44771525,14 4,13.5522847 4,13 C4,12.4477153 4.44771525,12 5,12 L8.27924078,12 L10.0513167,6.68377223 C10.367686,5.73466443 11.7274983,5.78688777 11.9701425,6.75746437 L13.8145063,14.1349195 L14.6055728,12.5527864 C14.7749648,12.2140024 15.1212279,12 15.5,12 L19,12 C19.5522847,12 20,12.4477153 20,13 C20,13.5522847 19.5522847,14 19,14 L16.118034,14 L14.3944272,17.4472136 C13.9792313,18.2776054 12.7550291,18.143222 12.5298575,17.2425356 L10.8627389,10.5740611 L9.9486833,13.3162278 Z"
              fill="#000000"
              fillRule="nonzero"></path>
            <circle fill="#000000" opacity="0.3" cx="19" cy="6" r="1"></circle>
          </g>
        </svg>
      ),
    },
    {
      id: 4,
      label: 'Đại lý',
      permissions: ['agency-GET'],
      link: '/agency',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M13.5,21 L13.5,18 C13.5,17.4477153 13.0522847,17 12.5,17 L11.5,17 C10.9477153,17 10.5,17.4477153 10.5,18 L10.5,21 L5,21 L5,4 C5,2.8954305 5.8954305,2 7,2 L17,2 C18.1045695,2 19,2.8954305 19,4 L19,21 L13.5,21 Z M9,4 C8.44771525,4 8,4.44771525 8,5 L8,6 C8,6.55228475 8.44771525,7 9,7 L10,7 C10.5522847,7 11,6.55228475 11,6 L11,5 C11,4.44771525 10.5522847,4 10,4 L9,4 Z M14,4 C13.4477153,4 13,4.44771525 13,5 L13,6 C13,6.55228475 13.4477153,7 14,7 L15,7 C15.5522847,7 16,6.55228475 16,6 L16,5 C16,4.44771525 15.5522847,4 15,4 L14,4 Z M9,8 C8.44771525,8 8,8.44771525 8,9 L8,10 C8,10.5522847 8.44771525,11 9,11 L10,11 C10.5522847,11 11,10.5522847 11,10 L11,9 C11,8.44771525 10.5522847,8 10,8 L9,8 Z M9,12 C8.44771525,12 8,12.4477153 8,13 L8,14 C8,14.5522847 8.44771525,15 9,15 L10,15 C10.5522847,15 11,14.5522847 11,14 L11,13 C11,12.4477153 10.5522847,12 10,12 L9,12 Z M14,12 C13.4477153,12 13,12.4477153 13,13 L13,14 C13,14.5522847 13.4477153,15 14,15 L15,15 C15.5522847,15 16,14.5522847 16,14 L16,13 C16,12.4477153 15.5522847,12 15,12 L14,12 Z"
              fill="#000000"
            />
            <rect fill="#FFFFFF" x="13" y="8" width="3" height="3" rx="1" />
            <path
              d="M4,21 L20,21 C20.5522847,21 21,21.4477153 21,22 L21,22.4 C21,22.7313708 20.7313708,23 20.4,23 L3.6,23 C3.26862915,23 3,22.7313708 3,22.4 L3,22 C3,21.4477153 3.44771525,21 4,21 Z"
              fill="#000000"
              opacity="0.3"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 5,
      label: 'Người chơi',
      permissions: ['user-GET'],
      link: '/member-statistics',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <path
              d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 6,
      label: 'Thu chi',
      section: true,
      permissions: ['income_expense-GET', 'income_expense_categories-GET'],
    },
    {
      id: 7,
      label: 'Danh mục',
      permissions: ['income_expense_categories-GET'],
      link: '/income-and-expenditure-category',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <path
              d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z"
              fill="#000000"
              opacity="0.3"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 8,
      label: 'Danh sách',
      permissions: ['income_expense-GET'],
      link: '/income-and-expenditure',
      icon: (
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24" />
            <path
              d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
              fill="#000000"
              fillRule="nonzero"
              opacity="0.3"
            />
            <rect fill="#000000" x="6" y="11" width="9" height="2" rx="1" />
            <rect fill="#000000" x="6" y="15" width="5" height="2" rx="1" />
          </g>
        </svg>
      ),
    },
    {
      id: 9,
      label: 'Tài khoản',
      section: true,
      permissions: ['user-GET'],
    },
    {
      id: 10,
      label: 'Người dùng',
      link: '/user',
      permissions: ['user-GET'],
      icon: <i className="far fa-user-circle icon-lg"></i>,
    },
    {
      id: 11,
      label: 'Thành viên',
      link: '/member',
      permissions: ['member-GET'],
      icon: <i className="far fa-user-circle icon-lg"></i>,
    },
    {
      id: 12,
      label: 'Phân quyền',
      section: true,
      permissions: ['role-GET', 'permission-GET'],
    },
    {
      id: 13,
      label: 'Role',
      link: '/role',
      permissions: ['role-GET'],
      icon: <i className="far fa-user-circle icon-lg"></i>,
    },
    {
      id: 14,
      label: 'Permission',
      link: '/permission',
      permissions: ['permission-GET'],
      icon: <i className="far fa-user-circle icon-lg"></i>,
    },
  ];

  return (
    <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto">
      <div className="brand flex-column-auto">
        <Link className="brand-logo" href="/">
          <Box sx={{width: '140px'}}>
            <Image src={Logo} alt="Logo" ratio="16-9" />
          </Box>
        </Link>
        <button className="brand-toggle btn btn-sm px-0">
          <span className="svg-icon svg-icon svg-icon-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path
                  d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                  fill="#000000"
                  fillRule="nonzero"
                  transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)"
                />
                <path
                  d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                  fill="#000000"
                  fillRule="nonzero"
                  opacity="0.3"
                  transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)"
                />
              </g>
            </svg>
          </span>
        </button>
      </div>
      <div className="aside-menu-wrapper flex-column-fluid">
        <div
          className="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
          data-menu-dropdown-timeout="500">
          <ul className="menu-nav">
            {menus.map((item: any) => {
              let hasPermission = false;

              item.permissions.forEach((itemPermission: any) => {
                if (!permissions[itemPermission]) return;
                hasPermission = true;
              });

              if (!hasPermission) return;

              return (
                <li
                  key={item.id}
                  className={`${
                    item.section
                      ? 'menu-section'
                      : router?.route.includes(item.link)
                      ? 'menu-item-active'
                      : ''
                  } menu-item `}
                  aria-haspopup="true">
                  {item.section ? (
                    <>
                      <h4 className="menu-text">{item.label}</h4>
                      <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                    </>
                  ) : (
                    <Link href={item.link}>
                      <a  className="menu-link">
                        <span className="svg-icon menu-icon">{item.icon}</span>
                        <span className="menu-text">{item.label}</span>
                      </a>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AsideLayout;
