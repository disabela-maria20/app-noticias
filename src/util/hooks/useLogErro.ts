"use client";

import { AxiosError } from "axios";

const useLogErro = () => {
  const LogErro= (erro: AxiosError) => {
    const data = erro.response?.data;
    const status = erro.response?.status;
    const statusText = erro.response?.statusText;
  
    return {
      data, 
      status,
      statusText
    }
  }
  return{
    LogErro
  }
 
}
export default useLogErro