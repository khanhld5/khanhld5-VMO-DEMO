import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Tooltip } from 'antd';
import {
  PieChartOutlined,
  SlackOutlined,
  SnippetsOutlined,
  BookOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import ImageCtn from '../component/imageCtn';
import Home from '../page/home';
import ProductManage from '../page/productManage';
import ProductsManage from '../page/productsManage';
import CategoryManage from '../page/categoryManage';
import Ordersmanage from '../page/ordersManage';
import SubMenu from 'antd/lib/menu/SubMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../state/actions/adminAction';

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

const CommonLayOut = (props) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState([]);

  const location = useLocation();
  const history = useHistory();
  let { path, url } = useRouteMatch();

  const handleLogOut = () => {
    dispatch(handleLogout());
  };

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const currentLocation = () => {
    const locateArr = location.pathname.split('/');
    const pathSplit = path.split('/');
    const newCurrentRoute = [];
    for (let i = 1; i < locateArr.length; i++) {
      if (locateArr[1] === pathSplit[1]) {
        if (!locateArr[2]) {
          setCurrentRoute('');
          break;
        }
        if (locateArr[i] && i >= 2) {
          newCurrentRoute[i - 2] = locateArr[i];
        }
      }
    }
    setCurrentRoute(newCurrentRoute);
  };

  const handleSelected = () => {
    switch (currentRoute[0]) {
      case 'productManage':
        return ['2'];
      case 'productsManage': {
        if (currentRoute[1] && isNaN(parseInt(currentRoute[1]))) {
          if (currentRoute[1] === 'addProduct') return ['sub1', '4'];
        }
        return ['sub1', '3'];
      }
      case 'categoryManage':
        return ['5'];
      case 'ordersManage':
        return ['6'];
      default:
        return ['1'];
    }
  };

  const handlePath = (item) => {
    switch (item) {
      case 'productManage':
        return 'Product Manage';
      case 'productsManage':
        return 'Products Manage';
      case 'categoryManage':
        return 'Category Manage';
      case 'ordersManage':
        return 'Orders Manage';
      case 'addProduct':
        return 'Add Product';
      case 'editProduct':
        return 'Edit Product';
      case '':
        return 'Dashboard';
      default:
        if (isNaN(parseInt(item))) return item;
        return `Page ${item}`;
    }
  };

  useEffect(() => {
    currentLocation();
  }, [location]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='bg-gray-800 p-2 h-auto'>
        <nav className='flex items-center'>
          <h1 className='text-gray-50 px-10 text-5xl font-Pattaya'>Admin</h1>
          <ul className='flex ml-auto text-white items-center'>
            <li>
              <div className='flex p-1 px-2 bg-white hover:bg-gray-100 items-center rounded-lg'>
                <p className='text-xl text-gray-500 cursor-default'>
                  {'Lekhanh'}
                </p>
                <ImageCtn
                  className={'square rounded-full w-10 ml-2 self-start'}
                  link={' '}
                  notLink={true}
                  src={'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg'}
                  alt={'this is avatar'}
                />
              </div>
            </li>
            <li className='mx-4'>
              <Tooltip title='Log out' placement='left'>
                <button
                  className='inline-block px-1.5 py-0.5 rounded-full 
                align-middle text-2xl bg-red-500 hover:bg-red-700 
                outline-none focus:outline-none'
                  onClick={handleLogOut}
                >
                  <FontAwesomeIcon icon={faPowerOff} />
                </button>
              </Tooltip>
            </li>
          </ul>
        </nav>
      </Header>
      <Layout>
        <Sider
          theme='light'
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
        >
          <Menu
            defaultSelectedKeys={handleSelected()}
            selectedKeys={handleSelected()}
            mode='inline'
          >
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              <Link to={`${url}`}>Home</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<SlackOutlined />}>
              <Link to={`${url}/productManage`}>Product manage</Link>
            </Menu.Item>

            <SubMenu
              key='sub1'
              icon={<SnippetsOutlined />}
              title='Products mange'
            >
              <Menu.Item key='3'>
                <Link to={`${url}/productsManage/listProduct`}>
                  Products mange
                </Link>
              </Menu.Item>
              <Menu.Item key='4'>
                <Link to={`${url}/productsManage/addProduct`}>Add product</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='5' icon={<BookOutlined />}>
              <Link to={`${url}/categoryManage`}>Category manage</Link>
            </Menu.Item>
            <Menu.Item key='6' icon={<DatabaseOutlined />}>
              <Link to={`${url}/ordersManage`}>Orders manage</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {currentRoute.map((item) => (
                <Breadcrumb.Item key={item}>{handlePath(item)}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <section className='bg-white p-10 rounded min-h-full'>
              <Switch>
                <Route exact path={`${path}`} component={Home} />
                <Route
                  path={`${path}/productManage`}
                  component={ProductManage}
                />

                <Route
                  path={`${path}/productsManage`}
                  component={ProductsManage}
                />
                <Route
                  path={`${path}/categoryManage/:page?`}
                  component={CategoryManage}
                />
                <Route
                  path={`${path}/ordersManage/:page?`}
                  component={Ordersmanage}
                />
              </Switch>
            </section>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Snow cot admin</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CommonLayOut;
