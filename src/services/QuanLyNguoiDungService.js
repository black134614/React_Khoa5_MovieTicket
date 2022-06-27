import { baseService } from "./baseService";
import { GROUPID } from '../util/settings/config'
export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    dangKi = (thongTinDangKy) => {
        return this.post('/api/QuanLyNguoiDung/DangKy', thongTinDangKy);
    }
    getThongTinTaiKhoan = () => {
        return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
    }
    updateThongTinTaiKhoan = (thongTinTaiKhoan) => {
        return this.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", thongTinTaiKhoan)
    }
    layDanhSachNguoiDung = (dieuKien = '') => {
        if (dieuKien.trim() != '')
            return this.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" + GROUPID + "&tuKhoa=" + dieuKien)
        return this.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" + GROUPID)
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
    }
    themNguoiDung = (user) => {
        return this.post("/api/QuanLyNguoiDung/ThemNguoiDung", user)
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete("/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=" + taiKhoan)
    }
    capNhatNguoiDung = (user) => {
        return this.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
