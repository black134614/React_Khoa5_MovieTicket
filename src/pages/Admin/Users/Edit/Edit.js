import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';
import { capNhatNguoiDungAction, layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
const { Option } = Select;

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const thongTinNguoiDung  = useSelector(state => state.QuanLyNguoiDungReducer.danhSachNguoiDung)[0];
    const dispatch = useDispatch();

    useEffect(() => {
        let { taikhoan } = props.match.params;
        dispatch(layDanhSachLoaiNguoiDungAction());
        dispatch(layDanhSachNguoiDungAction(taikhoan));

    }, [])

    const danhSachLoaiNguoiDung = useSelector(state => state.QuanLyNguoiDungReducer.danhSachLoaiNguoiDung);
    const renderDanhSachLoaiNguoiDung = () => {
        return danhSachLoaiNguoiDung.map((value, index) => {
            return <option value={value.maLoaiNguoiDung}>{value.tenLoai}</option>
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            hoTen: thongTinNguoiDung.hoTen,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung
        },

        onSubmit: (values) => {
            console.log('values', values);
            dispatch(capNhatNguoiDungAction(values));
        }
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <>

            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 class="text-4xl">Chỉnh sửa người dùng</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tài Khoản">
                    <Input disabled name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                </Form.Item>
                <Form.Item label="Mật Khẩu">
                    <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
                </Form.Item>
                <Form.Item label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                </Form.Item>
                <Form.Item label="email">
                    <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
                </Form.Item>
                <Form.Item label="Mã Nhóm">
                    <Input disabled name="maNhom" onChange={formik.handleChange} value={formik.values.maNhom} />
                </Form.Item>
                <Form.Item name="maLoaiNguoiDung" label="Loại người dùng" >
                    <select className='w-full block py-1' placeholder="Chọn loại người dùng" onChange={formik.handleChange} value={formik.values.maLoaiNguoiDung}
                        allowClear>
                        {renderDanhSachLoaiNguoiDung()}
                    </select>
                </Form.Item>

                <Form.Item label="Hành động">
                    <button type="submit" className="bg-blue-700 text-white p-2">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Edit