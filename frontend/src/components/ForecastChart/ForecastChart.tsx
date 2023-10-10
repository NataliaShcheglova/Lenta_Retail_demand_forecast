import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './ForecastChart.module.scss';
import { forecast } from '../../utils/forecast';

const ForecastChart: React.FC = () => {
  if (forecast.data.length > 5) {
    return (
    <div className={styles.message}>
      Упс! Невозможно построить график для более, чем 5 позиций. Уберите лишние позиции.
    </div>
    )
  }

  const dates: string[] = Object.keys(forecast.data[0]?.forecast.sales_units) || [];

  const chartData = dates.map((date) => {
    const entry: { [key: string]: string } = {
      date,
    };
    forecast.data.forEach((productData: any) => {
      entry[productData.forecast.sku] = productData.forecast.sales_units[date] || 0;
    });
    return entry;
  });

  const colors = [
    'rgba(0, 61, 150, 1)', 
    'rgba(0, 61, 150, 0.7)', 
    'rgba(0, 61, 150, 0.5)', 
    'rgba(0, 61, 150, 0.3)', 
    'rgba(0, 61, 150, 0.15)'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        {forecast.data.map((productData, index) => (
          <div key={productData.forecast.sku} className={styles.legendBlock} style={{ backgroundColor: colors[index % colors.length] }}>
            <p className={`${styles.text} ${styles.textBold}`}>{productData.store}</p>
            <p className={styles.text}>{productData.forecast.sku}</p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={681}>
      <BarChart
        data={chartData}
        margin={{ top: 80, right: 0, left:  0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="7 0" vertical={false} stroke="rgba(182, 202, 255, 0.4)" strokeWidth={2}/>
        <XAxis dataKey="date" tickSize={0} tickMargin={8}/>
        <YAxis tickSize={0} tickMargin={8} axisLine={false}/>
        <Tooltip
            cursor={{fill: 'transparent'}}
            content={({ payload }) => (
              <div className={styles.tooltip}>
                {payload && payload.map((item, index) => (
                  <p key={index} className={styles.tooltipText}>
                    {item.value}
                  </p>
                ))}
              </div>
            )}
          />

        {forecast.data.map((productData, index) => (
          <Bar
            name={`${productData.store} - ${productData.forecast.sku}`}
            key={productData.forecast.sku}
            dataKey={productData.forecast.sku}
            fill={colors[index % colors.length]}
            barSize={8}
            radius={[30, 30, 0, 0]}
          />
        ))}
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;


