import React, { FC } from 'react';
import ruRU from 'antd/locale/ru_RU';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import styles from './Table.module.scss';
import { formatDate } from '../../utils/utils';

interface DataType {
  key: React.Key;
  ТК: string;
  group: string;
  category: string;
  subcategory: string;
  product: string;
  forecast_date: string;
  [key: string]: number | React.Key;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface ITable {
  data: any;
}

const ForecastTable: FC<ITable> = ({ data }) => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'ТК',
      dataIndex: 'ТК',
      // filtered: true,
      sorter: {
        compare: (a, b) => a.ТК.localeCompare(b.ТК),
      },
      filterIcon: (filtered) => <p style={{ color: filtered ? '#1890ff' : undefined }}>qq</p>,
      width: 'calc(4.57vw + 32px)',

      className: styles.columnTitle,
      showSorterTooltip: false,
      render: (text) => (
        <div
          style={{ width: '4.57vw', whiteSpace: 'normal', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      sorter: {
        compare: (a, b) => a.group.localeCompare(b.group),
      },
      width: 'calc(9.375vw + 32px)',
      className: styles.columnTitle,
      showSorterTooltip: false,
      render: (text) => (
        <div
          style={{ width: '9.375vw', whiteSpace: 'normal', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      sorter: {
        compare: (a, b) => a.category.localeCompare(b.category),
      },
      width: 'calc(9.375vw + 32px)',
      className: styles.columnTitle,
      showSorterTooltip: false,
      render: (text) => (
        <div
          style={{ width: '9.375vw', whiteSpace: 'normal', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    },
    {
      title: 'Подкатегория',
      dataIndex: 'subcategory',
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.subcategory.localeCompare(b.subcategory),
      },
      width: 'calc(9.375vw + 32px)',
      className: styles.columnTitle,
      render: (text) => (
        <div
          style={{ width: '9.375vw', whiteSpace: 'normal', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      sorter: {
        compare: (a, b) => a.product.localeCompare(b.product),
      },
      width: 'calc(9.375vw + 32px)',
      className: styles.columnTitle,
      showSorterTooltip: false,
      render: (text) => (
        <div
          style={{ width: '9.375vw', whiteSpace: 'normal', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    },
    ...Object.keys(data?.data[0].forecast).map((date) => ({
      title: formatDate(date),
      dataIndex: date,
      key: date,
      width: 'calc(4.17vw + 32px)',
      className: styles.columnTitle,
      render: (text: string) => (
        <div
          style={{ width: '4.17vw', textAlign: 'end', boxSizing: 'border-box' }}
          className={styles.cell}>
          {text}
        </div>
      ),
    })),
  ];

  const dataSource = data?.data.map((item: any) => ({
    key: item.forecast_date,
    ТК: item.store,
    product: item.sku,
    group: 'string',
    category: 'string',
    subcategory: 'string',
    forecast_date: item.forecast_date,
    ...item.forecast, // Распаковываем данные прогноза в отдельные колонки
  }));

  console.log(dataSource);
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        components: {
          Table: {
            headerBg: 'rgba(182, 202, 255, 0.40)',
            headerColor: '#2C2A29',
            headerBorderRadius: 12,
            borderColor: 'none',
            rowHoverBg: 'none',
            headerFilterHoverBg: 'rgba(182, 202, 255, 0.40)',
            headerSortActiveBg: 'rgba(182, 202, 255, 0.40)',
            headerSortHoverBg: 'rgba(182, 202, 255, 0.40)',
            bodySortBg: 'none',
            stickyScrollBarBorderRadius: 1,
            stickyScrollBarBg: 'rgba(182, 202, 255, 0.4)',
          },
        },
      }}>
      <Table
        rowClassName={(record, index) => (index % 2 === 0 ? styles.rowLight : styles.rowDark)}
        className={styles.table}
        columns={columns}
        dataSource={data ? dataSource : undefined}
        onChange={onChange}
        pagination={false}
        sticky={true}
        scroll={{ x: true }}
        // loading
      />
    </ConfigProvider>
  );
};

export default ForecastTable;
