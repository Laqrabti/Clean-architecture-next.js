import React from 'react';

interface SVGPathProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

const SVGPathComponent: React.FC<SVGPathProps> = ({
  width = 200,
  height = 200,
  strokeColor = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200" // Adjust viewBox based on your path coordinates
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 0 0 C 7 19 160 2214 2330 2234"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </svg>
  );
};

export default SVGPathComponent;