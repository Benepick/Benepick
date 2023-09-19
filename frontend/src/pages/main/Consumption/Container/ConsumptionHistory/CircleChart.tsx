import React, { useEffect, useState } from 'react';
import colors from '@common/design/colors';
import Svg, { Circle, Text } from 'react-native-svg';
import { CircleChartProps } from '@interfaces/consumption';

function CircleChart({ segments, totalAmount }: CircleChartProps) {
  const [radius, setRadius] = useState(70);
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  let offset = 175;

  useEffect(() => {
    const timer = setInterval(() => {
      setRadius((prevRadius) => {
        if (prevRadius < 90) {
          return prevRadius + 2;
        } else {
          clearInterval(timer);
          return prevRadius;
        }
      });
    }, 1);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Svg height="250" width="250" viewBox="0 0 200 200">
      {segments.map((segment, index) => {
        const percent = segment.percent;
        const strokeDasharray = `${circumference * (percent / 100)} ${
          circumference * (1 - percent / 100)
        }`;
        const strokeDashoffset = circumference * (1 - offset / 100);
        offset += percent;

        return (
          <Circle
            key={index}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={segment.color || colors.main}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        );
      })}

      <Text
        x="100"
        y="100"
        textAnchor="middle"
        dy="0.3em"
        fontWeight="bold"
        fontSize="20"
        fontFamily="IBMPlexSansKR-Bold"
      >
        {`${totalAmount}원`}
      </Text>
    </Svg>
  );
}

export default CircleChart;
