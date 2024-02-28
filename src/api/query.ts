import { useQuery } from "@tanstack/react-query";
import { END_POINT } from "../constant";
import { getDepth, getDivisionList, getEntityList } from "./api";

export const useLoadDivisionList = (startFromLevel = 1, idList?: number[]) => {
    return useQuery<Division[]>({
        queryKey: [END_POINT.LOAD_DIVISION_LIST, startFromLevel, idList?.toString()],
        queryFn: () => getDivisionList(startFromLevel, idList)
    });
};

export const useGetEntityList = (startFromLevel = 1, divisionIdList?: number[]) => {
    return useQuery<Entity[]>({
        queryKey: [END_POINT.GET_ENTITY_LIST, startFromLevel, divisionIdList?.toString()],
        queryFn: () => getEntityList(startFromLevel, divisionIdList)
    });
};

export const useGetDepth = () => {
    return useQuery<number>({
        queryKey: [END_POINT.GET_DIVISION_DEPTH],
        queryFn: () => getDepth()
    });
};
