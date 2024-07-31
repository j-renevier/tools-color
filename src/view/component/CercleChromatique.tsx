import React from 'react';
import { Color } from "../../util/color";

interface CercleChromatiqueProps {
  colors: Color[];
}

const CercleChromatique: React.FC<CercleChromatiqueProps> = ({ colors }) => {
  return (
    <ul>
      {colors.map((color, index) => (
        <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
          {color.rgbaStringCSS}
        </li>
      ))}
    </ul>
  );
};

export default CercleChromatique;