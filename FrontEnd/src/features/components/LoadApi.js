import React from 'react'
import { quocgiaData } from "../container/admin/Quocgia/quocgiaSlice";
import { tintucData } from "../container/admin/tintuc/tintucSlice";
import { loaitourData } from "../container/admin/Loaitour/loaitourSlice";
import { diadiemData } from "../container/admin/DiaDiem/diadiemSlice";
import { mangxahoiData } from "../container/admin/mxh/mangxahoiSlice";
import { binhluanData } from "../container/admin/Binhluan/binhluanSlice";
import { userData } from "../container/admin/taikhoan/taikhoanSlice";
import { tagData } from "../container/admin/Tag/tagSlice";
import { anhData } from "../container/admin/Anh/anhSlice";
import { dichvuData } from "../container/admin/Dichvu/dichvuSlice";
import { hoadonData } from "../container/admin/Hoadon/hoadonSlice";
import { roleData } from "../container/admin/Role/roleSlice";
import { lienheData } from "../container/admin/Lienhe/lienheSlice";
import { ngaydiData } from "../container/admin/Ngaydi/ngaydiSlice";
import { tourData } from "../container/admin/Tour/tourSlice";
import { camnangdulichData } from "../container/admin/Camnangdulich/camnangdulichSlice";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function LoadApi() {
    const dispatch = useDispatch();
    const actionquocgia = async () => { await dispatch(quocgiaData()) }
    const actiontintuc = async () => { await dispatch(tintucData()) }
    const actionloaitour = async () => { await dispatch(loaitourData()) }
    const actionuser = async () => { await dispatch(userData()) }
    const actiondiadiem = async () => { await dispatch(diadiemData()) }
    const actionmangxahoi = async () => { await dispatch(mangxahoiData()) }
    const actionbinhluan = async () => { await dispatch(binhluanData()) }
    const actiontag = async () => { await dispatch(tagData()) }
    const actionanh = async () => { await dispatch(anhData()) }
    const actiondichvu = async () => { await dispatch(dichvuData()) }
    const actionhoadon = async () => { await dispatch(hoadonData()) }
    const actionrole = async () => { await dispatch(roleData()) }
    const actionlienhe = async () => { await dispatch(lienheData()) }
    const actionngaydi = async () => { await dispatch(ngaydiData()) }
    const actiontour = async () => { await dispatch(tourData()) }
    const actioncamnang = async () => { await dispatch(camnangdulichData()) }
    useEffect(() => {
        actionquocgia();
        actiontintuc();
        actionloaitour();
        actionuser();
        actiondiadiem();
        actionmangxahoi();
        actionbinhluan();
        actiontag();
        actionanh();
        actiondichvu();
        actionhoadon();
        actionrole();
        actionlienhe();
        actionngaydi();
        actiontour();
        actioncamnang();
    }, [])

}
