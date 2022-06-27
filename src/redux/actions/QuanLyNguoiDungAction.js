import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_KI_ACTION, DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
import { notifiFunction } from "../../util/notification/notification";
import * as _ from 'lodash'


export const dangNhapAction = (thongTinDangNhap) => {

    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                // history.goBack();
                history.push("/home");
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const dangKiAction = (thongTinDangKy) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKi(thongTinDangKy);

            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Đăng kí tài khoản thành công!');
                //Chuyển hướng về trang đăng nhập 
                setTimeout(() => {
                    history.push("/login");
                }, 1000);
            }
        } catch (error) {
            notifiFunction('warning', error.response.data.content)
            console.log('error', error.response.data);
        }

    }
}

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            //đảo mảng kết quả bằng lodash
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.getThongTinTaiKhoan();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    thongTinTaiKhoan: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error.response.data);
        }

    }
}

export const updateThongTinTaiKhoanAction = (thongTinTaiKhoan) => {
    return async () => {
        try {
            const result = await quanLyNguoiDungService.updateThongTinTaiKhoan(thongTinTaiKhoan);
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Cập nhật thông tin tài khoản thành công!')
            }
        } catch (error) {
            console.log('error', error);
            notifiFunction('error', 'Cập nhật thông tin tài khoản thất bại!');
        }

    }

}

export const layDanhSachNguoiDungAction = (dieuKien = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(dieuKien);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                });
            }
        } catch (error) {
            console.log('error', error);
            notifiFunction('error', 'Lấy danh sách người dùng thất bại!');
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                    danhSachLoaiNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error);
            notifiFunction('error', 'Lấy danh sách loại người dùng thất bại!');
        }
    }
}

export const themNguoiDungAction = (user) => {
    return async () => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(user);
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Thêm người dùng thành công!')
            }
        } catch (error) {
            console.log('error', error);
            notifiFunction('error', error.response.data.content)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            if (result.data.statusCode === 200) {
                notifiFunction('warning', 'Xóa người dùng thành công!')
                dispatch(layDanhSachNguoiDungAction())
            }
        } catch (error) {
            console.log('error', error.response);
            notifiFunction('error', error.response.data.content)
        }
    }
}

export const capNhatNguoiDungAction = (user) => {
    return async () => {
        try {
            const result = await quanLyNguoiDungService.capNhatNguoiDung(user);
            if (result.data.statusCode === 200) {
                notifiFunction('success', 'Cập nhật người dùng thành công!')
            }
        } catch (error) {
            console.log('error', error.response);
            notifiFunction('error', error.response.data.content)
        }
    }
}

