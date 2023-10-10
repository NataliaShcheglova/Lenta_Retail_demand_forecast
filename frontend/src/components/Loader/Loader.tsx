import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: '1.67vw' }}
    spin
  />
);

const Loader: FC = () => <Spin indicator={antIcon} />;

export default Loader;
