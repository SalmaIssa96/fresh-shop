import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

const useFetchData = <T = any>(url: string) => {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
  });
  return { data, error, isLoading, mutate };
};
export default useFetchData;
