import React from 'react';
import { RadarChart, CircularGridLines } from 'react-vis';

import 'react-vis/dist/style.css';

const Chart = ({ metrics }) => {
  const chartProps = metrics.reduce(
    (props, metric) => ({
      data: [{ ...props.data[0], [metric.key]: metric.value }],
      domains: [
        ...props.domains,
        {
          name: metric.name,
          domain: metric.domain,
          getValue: d => d[metric.key]
        }
      ]
    }),
    { data: [], domains: [] }
  );

  return (
    <RadarChart
      {...chartProps}
      style={{
        polygons: {
          fill: '#FF2C83',
          fillOpacity: 0.625,
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: '#FF2C83'
        },
        labels: {
          fontSize: '3rem',
          textAnchor: 'middle'
        }
      }}
      margin={{
        left: 60,
        top: 60,
        bottom: 60,
        right: 60
      }}
      tickFormat={t => ''}
      width={600}
      height={600}
    >
      <CircularGridLines tickValues={[-0.82, -0.63, -0.45, -0.276, -0.1]} />
    </RadarChart>
  );
};

export default Chart;
