import React from 'react';
import { Box } from '@mui/material';
import { styled, css } from '@mui/material/styles';

const ThumbnmailWrapper = styled(Box)(
  () => css`
    background-color: transparent;
    width: 100%;
    padding-top: 100%;
    position: relative;
    &.ratio_9-16 {
      padding-top: 177.777777778%;
    }
    &.ratio_5-8 {
      padding-top: 160%;
    }
    &.ratio_3-4 {
      padding-top: 133.333333333%;
    }
    &.ratio_4-3 {
      padding-top: 75%;
    }
    &.ratio_3-2 {
      padding-top: 66.66%;
    }
    &.ratio_8-5 {
      padding-top: 62.5%;
    }
    &.ratio_16-9 {
      padding-top: 56.25%;
    }
    &.ratio_vip {
      padding-top: 54.93421052631579%;
    }
    &.ratio_2-1 {
      padding-top: 50%;
    }
    &.ratio_campaign {
      padding-top: 45.10416666666667%;
    }
    &.ratio_3-5 {
      padding-top: 35%;
    }
    &.ratio_banner-mobile {
      padding-top: 33.33333%;
    }
    &.ratio_banner {
      padding-top: 25%;
    }
    &.ratio_intersect {
      padding-top: 23.49468713105077%;
    }
    &.ratio_provider {
      padding-top: 8.144980655670943%;
    }
  `
);

const ThumbnailInner = styled(Box)(
  () => css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `
);

const RatioBoxAtom = (props: any) => {
  return (
    <ThumbnmailWrapper {...props} className={[props.className, `ratio_${props.ratio}`].filter(e => !!e).join(' ')}>
      <ThumbnailInner>
        {props.children}
      </ThumbnailInner>
    </ThumbnmailWrapper>
  )

}

export default RatioBoxAtom