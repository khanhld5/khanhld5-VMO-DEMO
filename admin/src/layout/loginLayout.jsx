import React from 'react';
import { Layout } from 'antd';
import './loginLayout.css';
import Login from '../page/login';

const { Content } = Layout;

const LoginLayout = (props) => {
  return (
    <Layout className='login min-h-screen'>
      <Content className='flex justify-center items-center'>
        <Login />
      </Content>
    </Layout>
  );
};

export default LoginLayout;
