import { listToTree } from "../util";

const promiseWrapper = async (data: any): Promise<any> => {
    return new Promise((resolve => setTimeout(() => resolve(data), 1000)))
}

export const getDivisionList = async (startFromLevel: number, idList?: number[],) => {
    let list;
    if (idList && idList.length > 0) {
        list = globalThis.companyData.filter(division => {
            idList.includes(division.id)
        })
    } else {
        list = [...globalThis.companyData];
    }

    list = list.filter(division => division.level >= startFromLevel);

    return promiseWrapper(listToTree(list));
}