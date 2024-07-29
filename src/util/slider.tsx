import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';

export default function LabeledValuesSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={10} slots={{ valueLabel: SliderValueLabel }} />
    </Box>
  );
}

interface SliderValueLabelProps {
  children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  );
}


const Slider = styled(BaseSlider)(
  () => `

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.3,
      )};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[400],
        0.5,
      )};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[400],
        0.5,
      )};
      outline: none;
      transform: scale(1.2);
    }
  }

    & .label {
      font-family: IBM Plex Sans;
      font-weight: 600;
      font-size: 14px;
      background: unset;
      background-color: ${theme.palette.mode === 'light' ? blue[600] : blue[900]};
      width: 32px;
      height: 32px;
      padding: 0px;
      visibility: hidden;
      color: #fff;
      border-radius: 50% 50% 50% 0;
      position: absolute;
      transform: translate(0%, -140%) rotate(-45deg) scale(0);
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :hover .label {
      visibility: visible;
      transform: translate(0%, -140%) rotate(-45deg) scale(1);
    }

    :hover .value {
      transform: rotate(45deg);
      text-align: center;
    }
  }
`,
);
