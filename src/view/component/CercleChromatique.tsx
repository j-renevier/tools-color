import React, { useEffect, useRef } from 'react';
import color, { Color } from "../../util/color";

interface CercleChromatiqueProps {
  colors: Color[];
}

const CercleChromatique: React.FC<CercleChromatiqueProps> = ({ colors }) => {

  // function getWheelHandlePosition(props: Partial<WheelProps>, color: IroColor) {
  //   const hsv = color.hsv;
  //   const { cx, cy } = getWheelDimensions(props);
  //   const handleRange = getHandleRange(props);
  //   const handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (TAU / 360);
  //   const handleDist = (hsv.s / 100) * handleRange;
  //   const direction = props.wheelDirection === 'clockwise' ? -1 : 1;
  //   return {
  //     x: cx + handleDist * Math.cos(handleAngle) * direction,
  //     y: cy + handleDist * Math.sin(handleAngle) * direction,
  //   }
  // }

  const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const radius = canvas.width / 2;
      const segmentAngle = 2 * Math.PI / 360;

      // Dessiner les segments de la roue chromatique
      for (let i = 0; i < 360; i++) {
        const hue = i / 360; 
        const color = new Color({h:i,s: 100, l: 50})
        const rgbStringCSS = color.rgbStringCSS;

        const gradient = ctx.createLinearGradient(radius + radius * Math.cos(i * segmentAngle), radius + radius * Math.sin(i * segmentAngle), radius, radius);
        gradient.addColorStop(0, rgbStringCSS);
        color.saturation = 0;
        gradient.addColorStop(1, color.rgbStringCSS);

        const pointX = radius + color.saturation.get * Math.cos(color.hue.get * segmentAngle);
        const pointY = radius + color.saturation.get * Math.sin(color.hue.get * segmentAngle);
  

        ctx.beginPath();
        ctx.moveTo(radius, radius); // Début du chemin au centre
        ctx.arc(radius, radius, radius, i * segmentAngle, (i + 1) * segmentAngle); // Dessiner l'arc
        ctx.rect(pointX, pointY, 5 , 5)
        ctx.closePath();


        ctx.fillStyle = gradient;
        ctx.fill(); // Remplir le segment


        ctx.beginPath();
        ctx.rect(pointX, pointY, 5 , 5)
        ctx.closePath();


        ctx.fillStyle = color.rgbStringCSS;
        ctx.fill(); 
      }
    }, []);

    


  return (
    <>
      <ul>
        {colors.map((color, index) => (
          <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
            {color.rgbaStringCSS}
          </li>
        ))}
      </ul>
      <canvas ref={canvasRef} width="400" height="400" />

    </>

  );
};

export default CercleChromatique;