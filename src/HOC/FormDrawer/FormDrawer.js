import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../../redux/actions/DrawerAction';

export default function FormDrawer(props) {
    const {visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerReducer);

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(closeDrawer());
    };
    return (
        <>
            {/* <button onClick={showDrawer}>showdrawer</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Hủy
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Đồng ý
                        </Button>
                    </div>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
