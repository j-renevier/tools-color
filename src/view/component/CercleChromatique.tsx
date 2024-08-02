import React, { useEffect, useRef, useState } from 'react';
import color, { Color } from "../../util/color";

interface CercleChromatiqueProps {
  colors: Color[];
  radius: number;
}

const calcXCord = (hue: number, saturation: number, radius:number) => {
  return radius + saturation / 100 * radius * Math.cos(hue * 2 * Math.PI / 360)
}

const calcYCord = (hue: number, saturation: number, radius:number) => {
  return radius + saturation / 100 * radius * Math.sin(hue * 2 * Math.PI / 360)
}

const colorSegment = new Color({ h: 0, s: 100, l: 50, a: 1});

const CercleChromatique: React.FC<CercleChromatiqueProps> = ({ colors, radius = 200 }) => {
  const degToRad = 2 * Math.PI / 360;
  const pointStyle = {
    radius: 10,
    startAngle: 0, 
    endAngle: 2 * Math.PI,
    color: 'rgba(255, 255, 255, 0)',
    blur: 2,
  }

  const [coord, setCoord] = useState({x: calcXCord(color.hue.get, color.saturation.get, radius), y: calcYCord(color.hue.get, color.saturation.get, radius)})
  const canvasRef = useRef(null);
  const offScreenCanvasRef = useRef(null);
  
  const createChromatiqueCircle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, radius * 2, radius * 2);
    for (let i = 0; i < 360; i++) {
      const gradient = ctx.createLinearGradient(
        radius + radius * Math.cos(i * degToRad), 
        radius + radius * Math.sin(i * degToRad), 
        radius, 
        radius
      );
      colorSegment.hue = i;
      colorSegment.saturation = 100;
      colorSegment.light = color.light.get
      colorSegment.alpha = color.alpha.get
      gradient.addColorStop(0, colorSegment.rgbaStringCSS);
      colorSegment.saturation = 0;
      gradient.addColorStop(1, colorSegment.rgbaStringCSS);
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, i * degToRad, (i + 1) * degToRad);
      ctx.closePath(); 
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  useEffect(() => {
    createChromatiqueCircle()
  }, []);

  useEffect(() => {
    createChromatiqueCircle()
  }, [color.light.get]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    createChromatiqueCircle()

    // const offScreenCanvas = offScreenCanvasRef.current;
    // const offScreenCtx = offScreenCanvas?.getContext('2d');


    // setCoord({x: calcXCord(color.hue.get, color.saturation.get, radius), y: calcYCord(color.hue.get, color.saturation.get, radius)})
    // offScreenCtx.clearRect(0, 0, radius *2, radius*2);
    // offScreenCtx.beginPath();
    // offScreenCtx.arc(coord.x, coord.y, pointStyle.radius, pointStyle.startAngle, pointStyle.endAngle);
    // offScreenCtx.closePath();


    // offScreenCtx.fillStyle = pointStyle.color;
    // offScreenCtx.fill();

    // offScreenCtx.filter = 'blur(4px)';
    // offScreenCtx.globalCompositeOperation = 'destination-in'; // Keep only the blur effect inside the shape
    // offScreenCtx.beginPath();
    // offScreenCtx.arc(coord.x, coord.y, pointStyle.radius, pointStyle.startAngle, pointStyle.endAngle);
    // offScreenCtx.closePath();
    // offScreenCtx.fill();

    // // Draw the border on the main canvas
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = 'black';
    // ctx.beginPath();
    // ctx.arc(coord.x, coord.y, pointStyle.radius, pointStyle.startAngle, pointStyle.endAngle);
    // ctx.closePath();
    // ctx.stroke();




    setCoord({x: calcXCord(color.hue.get, color.saturation.get, radius), y: calcYCord(color.hue.get, color.saturation.get, radius)})
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, pointStyle.radius, pointStyle.startAngle, pointStyle.endAngle);
    ctx.closePath();

    ctx.fillStyle = pointStyle.color;
    ctx.fill();
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

  }, [color.red.get, color.green.get, color.blue.get, color.alpha.get]);

  return (
    <>
      <ul>
        {colors.map((color, index) => (
          <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
            {color.rgbaStringCSS}
          </li>
        ))}
      </ul>
      <canvas ref={canvasRef} width={radius * 2} height={radius * 2}  />

    </>

  );
};

export default CercleChromatique;