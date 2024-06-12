import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { objectUserApi } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useGetObjectUser() {
  const query = useQuery({
    queryKey: [QR_KEY.OBJECT_USER],
    queryFn: () => objectUserApi.getObjectUser(),
    staleTime: QR_TIME_CACHE,
  });
  const dataObjectUser = query.data?.data || []
  return Object.assign(query, {
    dataObjectUser
  })
}