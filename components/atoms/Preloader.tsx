import React from 'react';
import { Box } from '@mui/material'
import { styled, css } from '@mui/material/styles';
import { useMobileDetect, useWindowDimensions } from 'utils/general';

const BoxProcess = styled(Box)(
    ({ }) => css`
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #c9f7f559;
    `
);
const PreloaderAtoms = (props: any) => {
    const currentDevice = useMobileDetect()
    const { width } = useWindowDimensions()

    return (
        <BoxProcess {...props} sx={{ zIndex: currentDevice.isMobile() || width <= 900 ? 98 : 8888, ...props.sx }}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: '200px', overflow: 'hidden' }}>
                {/* <Image src={PreloaderGIF} alt='pre-loader.gif' ratio="16-9" priority /> */}
                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <rect x="0" y="0" width="24" height="24"></rect>
                                <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" fill="#000000" opacity="0.3"></path>
                                <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" fill="#000000"></path>
                            </g>
                        </svg>
                    </span>
                    <span className="pulse-ring"></span>
                </div>
            </Box>
        </BoxProcess>
    );
}

export default PreloaderAtoms