import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as _ from 'lodash'
import moment from 'moment';
import { openDrawer, openEditFormThongTinTaiKhoan } from '../../redux/actions/DrawerAction';
import EditThongTinTaiKhoan from '../../components/Form/EditThongTinTaiKhoan';

const { TabPane } = Tabs;


export default function Profile() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layThongTinTaiKhoanAction())
    }, []);

    const thongTinTaiKhoan = useSelector((state) => state.QuanLyNguoiDungReducer.thongTinTaiKhoan);

    const renderThongTinCaNhan = () => {
        return <div className="wrapper bg-gray-400 antialiased text-gray-900 py-5">
            <div>
                <div className='-mb-8'>
                    <img src="https://source.unsplash.com/random/1000x100" alt="random imgee" className="w-full object-cover object-center rounded-lg shadow-md" />
                </div>
                <div className="relative px-4 -mt-8 py-3 rounded">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div class="grid grid-cols-2 gap-2 text-base">
                            <div className='mb-3'>
                                <strong>Email:</strong>
                                <span className='pl-2'>{thongTinTaiKhoan.email}</span>
                            </div>
                            <div className='mb-3'>
                                <strong>Tài khoản:</strong>
                                <span className='pl-2'>{thongTinTaiKhoan.taiKhoan}</span>
                            </div>
                            <div className='mb-3'>
                                <strong>Họ tên:</strong>
                                <span className='pl-2'>{thongTinTaiKhoan.hoTen}</span>
                            </div>
                            <div className='mb-3'>
                                <strong>Mật khẩu:</strong>
                                <span className='pl-2'>{thongTinTaiKhoan.matKhau}</span>
                            </div>
                            <div className='mb-3'>
                                <strong>Số điện thoại:</strong>
                                <span className='pl-2'>{thongTinTaiKhoan.soDT}</span>
                            </div>
                            <div className='mb-3'>
                                <a href='#' className="bg-indigo-600 py-2 px-4 border border-transparent hover:border-indigo-400 rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-50 transition-all duration-300"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        dispatch(openEditFormThongTinTaiKhoan(<EditThongTinTaiKhoan thongTinTaiKhoan={thongTinTaiKhoan} />, 'Chỉnh sửa thông tin tài khoản'))
                                    }}>
                                    Cập nhật thông tin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const renderLichSuDatVe = () => {
        return thongTinTaiKhoan.thongTinDatVe?.map((datVe, index) => {
            return datVe.danhSachGhe.map((datGhe, index) => {
                return <div className='wrapper px-5 py-3' key={index}>
                    <div class="flex flex-row">
                        <div class="basis-1/4 truncate">
                            <img className='w-32 h-32' src={datVe.hinhAnh} />
                        </div>
                        <div class="basis-3/4 ml-3 h-16">
                            <div class="flex flex-row">
                                <img className='w-14 basis-1/6' src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" />
                                <div className='basis-5/6 ml-1'>
                                    {datGhe.maHeThongRap}
                                    <br />
                                    {datGhe.tenHeThongRap}
                                    <a className='ml-3 italic' href='#'>[Bản đồ]</a>
                                </div>
                            </div>
                            <div className='h-16 ring-2 ring-blue-500 mt-2 p-2 rounded'>
                                <strong>Ngày đặt: </strong>
                                {moment(datVe.ngayDat).format('DD/MM/YYYY hh:mm:ss')}
                                -
                                {datGhe.tenRap}
                                - 
                                {datGhe.tenGhe}
                            </div>
                        </div>
                    </div>
                </div>
            })
        });

    }
    return (
        <>
            <div style={{ paddingTop: "6rem" }}>
                <div className="bg-indigo-600">
                    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-0 flex-1 flex items-center">
                                <span className="flex p-2 rounded-lg bg-indigo-800">
                                    {/* Heroicon name: outline/speakerphone */}
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </span>
                                <p className="ml-3 font-medium text-white truncate">
                                    <span className="md:hidden"> Giảm 20% giá vé khi đi cùng gia đình vào dịp vu lan!! </span>
                                    <span className="hidden md:inline"> Tin nóng! Giảm 20% giá vé khi đi cùng gia đình vào dịp vu lan! </span>
                                </p>
                            </div>
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"> Xem thêm </a>
                            </div>
                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                                    <span className="sr-only">Dismiss</span>
                                    {/* Heroicon name: outline/x */}
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" style={{ minHeight: "50vh", padding: "0 5rem" }}>
                <TabPane tab="THÔNG TIN CÁ NHÂN" key="1">
                    {renderThongTinCaNhan()}
                </TabPane>
                <TabPane tab="LỊCH SỬ ĐẶT VÉ" key="2">
                    {renderLichSuDatVe()}
                </TabPane>
            </Tabs>
        </>
    )
}
