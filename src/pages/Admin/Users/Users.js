import React from 'react'
import { Button, Table, Space, Input, message, Popconfirm } from 'antd';

import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { history } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { useEffect } from 'react';
import editUser from './AddNew/AddNew'
import { NavLink } from 'react-router-dom';
const { Search } = Input;




export default function Users() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, []);

    const layDanhSachNguoiDungTheoDieuKien = value => {
        dispatch(layDanhSachNguoiDungAction(value));
    }
    const data = useSelector(state => state.QuanLyNguoiDungReducer.danhSachNguoiDung);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Mật Khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',
        },
        {
            title: 'Họ tên',
            key: 'hoTen',
            dataIndex: 'hoTen',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            key: 'soDt',
            dataIndex: 'soDt',
        },
        {
            title: 'Thao tác',
            key: 'taiKhoan',
            render: (record) => (
                <Space size="middle">
                    <NavLink to={`/admin/users/edit/${record.taiKhoan}`}><EditOutlined /></NavLink>
                    <Popconfirm
                        title={"Xóa người dùng " + record.taiKhoan + " ?"}
                        onConfirm={()=>{
                            dispatch(xoaNguoiDungAction(record.taiKhoan))
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a style={{ color: '#cf1322' }}><DeleteOutlined /></a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h3 className="text-4xl">Quản lý Người Dùng</h3>
            <Button className="mb-5" onClick={() => {
                history.push('/admin/users/addnew');
            }}>+ Thêm Người Dùng</Button>
            <Search
                className="mb-5"
                placeholder="Nhập vào tài khoản, số điện thoại hoặc họ tên người dùng"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={layDanhSachNguoiDungTheoDieuKien}
            />
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
