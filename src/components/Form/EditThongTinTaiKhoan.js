import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setSubmitFormEditThongTinTaiKhoan } from '../../redux/actions/DrawerAction';
import * as Yup from 'yup'
import { updateThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { USER_LOGIN } from '../../util/settings/config';

export default function EditThongTinTaiKhoan(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSubmitFormEditThongTinTaiKhoan(formik.handleSubmit));
        console.log(maLoaiNguoiDung);
    }, []);
    const maLoaiNguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN)).maLoaiNguoiDung;
    const { email, taiKhoan, matKhau, hoTen, soDT, maNhom } = props.thongTinTaiKhoan;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: email,
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            hoTen: hoTen,
            soDt: soDT
        },
        validationSchema: Yup.object().shape({
            matKhau: Yup.string()
                .min(5, 'Mật khẩu quá ngắn!')
                .required('Cần nhập mật khẩu'),
            email: Yup.string().email('Nhập đúng định dạng email!')
                .required('Cần nhập email!'),
            hoTen: Yup.string()
                .required('Cần nhập họ tên của bạn!'),
            soDt: Yup.string()
                .required('Cần nhập số điện thoại!')
        }),
        onSubmit: values => {
            values = { ...values, maLoaiNguoiDung: maLoaiNguoiDung , maNhom: maNhom}
            dispatch(updateThongTinTaiKhoanAction(values));
        },

    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={formik.values.email} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required disabled
                        />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={formik.values.taiKhoan} name="taiKhoan" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required disabled
                        />
                        <label htmlFor="taiKhoan" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tài Khoản</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={formik.values.hoTen} name="hoTen" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={formik.handleChange} />
                        <label htmlFor="hoTen" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Họ Tên</label>
                        <div className='text-sm text-red-500 mt-1'>{formik.errors.hoTen}</div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={formik.values.matKhau} name="matKhau" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={formik.handleChange} />
                        <label htmlFor="matKhau" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mật Khẩu</label>
                        <div className='text-sm text-red-500 mt-1'>{formik.errors.matKhau}</div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={formik.values.soDt} name="soDt" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                            onChange={formik.handleChange} />
                        <label htmlFor="soDt" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số Điện Thoại</label>
                        <div className='text-sm text-red-500 mt-1'>{formik.errors.soDt}</div>
                    </div>
                </div>
            </form>
        </>
    )
}
