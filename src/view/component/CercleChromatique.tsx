import React, { useEffect, useRef, useState } from 'react';
import color, { Color } from "../../util/color";

interface CercleChromatiqueProps {
  colors: Color[];
  size?: number;
}

const calcXCord = (hue: number, saturation: number, radius:number) => {
  return radius + saturation / 100 * radius * Math.cos(hue * 2 * Math.PI / 360)
}

const calcYCord = (hue: number, saturation: number, radius:number) => {
  return radius + saturation / 100 * radius * Math.sin(hue * 2 * Math.PI / 360)
}

const colorSegment = new Color({ h: 0, s: 100, l: 50, a: 1});

const CercleChromatique: React.FC<CercleChromatiqueProps> = ({ colors, size = 400 }) => {
  const degToRad = 2 * Math.PI / 360;
  const pointStyle = {
    radius: 10,
    startAngle: 0, 
    endAngle: 2 * Math.PI,
    color: 'rgba(255, 255, 255, 0)',
    blur: 2,
  }

  const padding = 10
  const circleRadius = size / 2 - padding * 2

  const [coord, setCoord] = useState({x: calcXCord(color.hue.get, color.saturation.get, circleRadius), y: calcYCord(color.hue.get, color.saturation.get, circleRadius)})
  const canvasRef = useRef(null);
  
  const createChromatiqueCircle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < 360; i++) {
      const gradient = ctx.createLinearGradient(
        circleRadius + circleRadius * Math.cos(i * degToRad), 
        circleRadius + circleRadius * Math.sin(i * degToRad), 
        circleRadius, 
        circleRadius
      );
      colorSegment.hue = i;
      colorSegment.saturation = 100;
      colorSegment.light = color.light.get
      colorSegment.alpha = color.alpha.get
      gradient.addColorStop(0, colorSegment.rgbaStringCSS);
      colorSegment.saturation = 0;
      gradient.addColorStop(1, colorSegment.rgbaStringCSS);
      ctx.beginPath();
      ctx.moveTo(size / 2 - padding , size / 2 - padding );
      ctx.arc(size / 2 - padding , size / 2 - padding , circleRadius, i * degToRad, (i + 1) * degToRad);
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
  
    setCoord({x: calcXCord(color.hue.get, color.saturation.get, circleRadius), y: calcYCord(color.hue.get, color.saturation.get, circleRadius)})
    ctx.beginPath();
    ctx.arc(coord.x + padding, coord.y + padding, pointStyle.radius, pointStyle.startAngle, pointStyle.endAngle);
    ctx.closePath();

    ctx.fillStyle = pointStyle.color;
    ctx.fill();
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }, [color.red.get, color.green.get, color.blue.get, color.alpha.get]);

  return (
    <>
      <canvas ref={canvasRef} width={size} height={size}  />
    </>

  );
};

export default CercleChromatique;