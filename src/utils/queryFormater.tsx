import React from "react";
import {toast} from "react-toastify";
import isEmpty from "./isEmptyData";
import ToastError from "../components/toasts/ErrorToast";

function queryDataFormater<T, K extends keyof T, C extends keyof T[K], D>(
  data: T | undefined,
  queryName: K,
  dataName: C | undefined,
  falsyReturn: D
): C extends undefined ? T[K] | D : T[K][C] | D {
  if (!isEmpty(data)) {
    if (!isEmpty(data[queryName])) {
      const inData: any = data[queryName];
      if (dataName) {
        if (inData[dataName]) {
          return inData[dataName];
        }
      }
      if (inData.error) {
        console.error("queryDataFormater: Error From BackEnd");
        console.error(inData.error);
        toast.warn(<ToastError />);
        return falsyReturn as any;
      }
      return inData;
    }
  }
  // console.error('queryDataFormater: EMPTY DATA');
  return falsyReturn as any;
}

// 페이지네이션 ok error 처리,
// 순수정보까지 도달하게해줌
//  원본 data 객체 찾기 기능이 있음

export default queryDataFormater;
// export {copyFindReplace};