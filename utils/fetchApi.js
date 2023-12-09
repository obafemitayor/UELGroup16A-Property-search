import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "d7c00b7e98mshd49fad40cbc8800p16bdfcjsn51222a13f997",
    },
  });
  return data;
};
