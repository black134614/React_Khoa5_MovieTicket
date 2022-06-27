import React from 'react'
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_EDIT_THONG_TIN_TAI_kHOAN, SET_SUBMIT_FORM_EDIT_THONG_TIN_TAI_kHOAN } from '../actions/types/DrawerType'
const initialState = {
    visible: false,
    title:'',
    ComponentContentDrawer: <p>default</p>,
    callBackSubmit: (propsValue) => { alert('click demo!') }
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            console.log("open drawer");
            return { ...state, visible: true }
        case CLOSE_DRAWER:
            return { ...state, visible: false }
        case OPEN_FORM_EDIT_THONG_TIN_TAI_kHOAN: {
            state.visible = true;
            state.ComponentContentDrawer = action.component;
            state.title = action.title;
            return { ...state }
        }
        case SET_SUBMIT_FORM_EDIT_THONG_TIN_TAI_kHOAN: {
            state.callBackSubmit = action.submitFunction;
            return {...state};
        }

        // case 'SET_SUBMIT_CREATE_TASK' : {
        //     return {...state,callBackSubmit:action.submitFunction}
        // }

        // case 'OPEN_FORM_CREATE_TASK' : {
        //     state.visible = true;
        //     state.title = action.title;
        //     state.ComponentContentDrawer = action.Component;
        //     return {...state};

        // }

        

        default:
            return state
    }
}