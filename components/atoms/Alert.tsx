/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { styled, css } from '@mui/material/styles'
import { Box } from '@mui/material';
import { AlertTypeEnum } from 'utils/enum';
import { useUiSlice } from 'slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi } from 'slices/ui/selectors';

const CustomAlertBox = styled(Box)(
    ({ }) => css`
        position: fixed;
        top: 8px;
        right: 8px;
        z-index: 98;
        transition: 0.3s all ease-in-out;
        display: none;
        &.show {
            display: block;
        }
    `
);

const AlertAtoms = (props: any) => {
    const { type, isShow, title } = props
    const dispatch = useDispatch()
    const { hideAlert } = useUiSlice()
    const { alert } = useSelector(selectUi)
    const [typeIcon, setTypeIcon] = useState<string>('flaticon2-checkmark icon-md')
    const [typeColor, setTypeColor] = useState<string>('success')

    useEffect(() => {
        if (type) {
            switch (type) {
                case AlertTypeEnum.ERROR:
                    setTypeIcon('flaticon-delete icon-md');
                    setTypeColor('danger');
                    break;
                case AlertTypeEnum.WARNING:
                    setTypeIcon('flaticon-warning icon-md');
                    setTypeColor('warning');
                    break;
                case AlertTypeEnum.SUCCESS:
                    setTypeIcon('flaticon2-checkmark icon-md');
                    setTypeColor('success')
                    break;
                default:
                    setTypeIcon('flaticon2-checkmark icon-md');
                    setTypeColor('success')
                    break;
            }
        }
    }, [type])
     
    useEffect(() => {
        if (alert && alert.isShow) {
            const timer = setTimeout(() => {
                dispatch(hideAlert())
                clearTimeout(timer);
            }, 2000);
        }
    }, [dispatch, alert])
    
    return (
        <CustomAlertBox className={`fade ${isShow ? 'show' : 'hide'}`}>
            <div className={`alert alert-custom alert-notice alert-light-${typeColor} fade ${isShow ? 'show' : 'hide'} `} role="alert">
                <div className="alert-icon"><i className={typeIcon}></i></div>
                <div className="alert-text">{title}</div>
                {/* <div className="alert-close">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(hideAlert())}>
                        <span aria-hidden="true"><i className="ki ki-close"></i></span>
                    </button>
                </div> */}
            </div>
        </CustomAlertBox>
    )
}

export default AlertAtoms