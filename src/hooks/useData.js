import { useQuery } from "react-query";
import { getData } from "../services/apiData";

export default function useData() {
  const { data, error, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["data"],
  });

  return { ...data, error, isLoading };
}
