import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_EDIT_THONG_TIN_TAI_kHOAN, SET_SUBMIT_FORM_EDIT_THONG_TIN_TAI_kHOAN } from "./types/DrawerType";

export const openDrawer = () => ({
  type: OPEN_DRAWER
})

export const closeDrawer = () => ({
  type: CLOSE_DRAWER
})

export const openEditFormThongTinTaiKhoan = (component, title) => ({
  type: OPEN_FORM_EDIT_THONG_TIN_TAI_kHOAN,
  component,
  title
})

export const setSubmitFormEditThongTinTaiKhoan = (submitFunction) => ({
  type: SET_SUBMIT_FORM_EDIT_THONG_TIN_TAI_kHOAN,
  submitFunction
})
