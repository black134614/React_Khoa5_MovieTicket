import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config'

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} cần được nhập!',
  types: {
    email: '${label} vui lòng nhập email!',
  }
};
/* eslint-enable no-template-curly-in-string */


export default function AddNew(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);

  const formRef = useRef();
  
  const onReset = () => {
    formRef.current.resetFields();
  };

  const onFinish = (values) => {
    dispatch(themNguoiDungAction(values));
    onReset();
  };

  const danhSachLoaiNguoiDung = useSelector(state => state.QuanLyNguoiDungReducer.danhSachLoaiNguoiDung);
  const renderDanhSachLoaiNguoiDung = () => {
    return danhSachLoaiNguoiDung.map((value, index) => {
      return <Option value={value.maLoaiNguoiDung}>{value.tenLoai}</Option>
    })
  }

  return (
    <>
      <div>
        <h3 className="text-4xl">Thêm Người Dùng</h3>
        <Form {...layout} name="nest-messages" onFinish={onFinish} ref={formRef} validateMessages={validateMessages}
          initialValues={ 
            {
              maNhom: GROUPID
          } }>
          <Form.Item
            name='taiKhoan'
            label="Tài Khoản"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='matKhau'
            label="Mật khẩu"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name='hoTen' label="Họ tên"
            rules={[
              {
                required: true
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='soDt' label="Số điện thoại"
            rules={[
              {
                required: true
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name='maNhom' label="Mã nhóm">
            <Input disabled />
          </Form.Item>
          <Form.Item name='maLoaiNguoiDung' label="Loại người dùng"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="Chọn loại người dùng"
              allowClear>
              {renderDanhSachLoaiNguoiDung()}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
