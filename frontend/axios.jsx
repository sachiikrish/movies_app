import axios from "axios";
import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

export default axiosIns;
