import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "../constant";
import { getDivisionList } from "./api";

export const useLoadDivisionList = (startFromLevel = 1, idList?: number[],) => {
    return useQuery({
        queryKey: [END_POINT.LOAD_DIVISION_LIST, , startFromLevel, idList?.toString()],
        queryFn: () => getDivisionList(startFromLevel, idList)
    });
};
