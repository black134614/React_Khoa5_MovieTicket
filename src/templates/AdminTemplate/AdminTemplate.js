import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    UserAddOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div>Hello ! {userLogin.taiKhoan}</button> <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Đăng xuất</button>

        </Fragment> : ''}
    </Fragment>


    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <NavLink to="/admin">Dashboard</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="2" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>

                            </Menu.Item>
                            <Menu.Item key="3" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>


                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="userSub" icon={<UsergroupAddOutlined />} title="User Manage">
                            <Menu.Item key="4" icon={<UserOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>

                            </Menu.Item>
                            <Menu.Item key="5" icon={<UserAddOutlined />}>
                                <NavLink to="/admin/users/addnew">Add new</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        {/* <Menu.Item key="6" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtimes">Showtime</NavLink>
    </Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}


export default AdminTemplate;