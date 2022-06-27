import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "../actions/types/QuanLyNguoiDungType"


let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    thongTinTaiKhoan: {},
    danhSachNguoiDung: [{
        key: 1,
        taiKhoan: "0901959488",
        hoTen: "admin8080",
        email: "test11wefef@gmail.com",
        soDt: "12334",
        matKhau: "123456",
        maLoaiNguoiDung: "KhachHang"
    }],
    danhSachLoaiNguoiDung:[ {
        maLoaiNguoiDung: "KhachHang",
        tenLoai: "Khách hàng"
      }]
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }

        case SET_THONG_TIN_TAI_KHOAN: {
            state.thongTinTaiKhoan = action.thongTinTaiKhoan;
            return { ...state }
        }

        case SET_DANH_SACH_NGUOI_DUNG: {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            state.danhSachNguoiDung = state.danhSachNguoiDung.map((value, key) => {
                return { ...value, key }
            })
            return { ...state }
        }

        case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
            state.danhSachLoaiNguoiDung = action.danhSachLoaiNguoiDung;
            return {...state}
        }

        default:
            return { ...state }
    }
}