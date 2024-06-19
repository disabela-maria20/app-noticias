import { AxiosError } from "axios";

const logErro = (erro: AxiosError) => {
  const data = erro.response?.data;
  const status = erro.response?.status;
  const statusText = erro.response?.statusText;

  return {
    data, 
    status,
    statusText
  }
}
export default logErro