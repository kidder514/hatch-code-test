import { listToTree, getAllChildId } from "../util";

const promiseWrapper = async (data: any): Promise<any> => {
    return new Promise((resolve => setTimeout(() => resolve(data), 200)))
}

export const getDivisionList = async (startFromLevel: number, idList?: number[]) => {
    let list;
    if (idList && idList.length > 0) {
        list = globalThis.companyData.filter(division => idList.includes(division.id))
    } else {
        list = [...globalThis.companyData];
    }

    list = list.filter(division => division.level >= startFromLevel);
    return promiseWrapper(listToTree(list));
}

export const getDepth = async () => {
    return promiseWrapper(globalThis.companyData.sort((a, b) => b.level - a.level)[0].level);
}

export const getEntityList = async (startFromLevel: number, divisionListSelected?: number[]) => {
    let list;
    list = globalThis.companyData.filter(division => division.level >= startFromLevel);

    let childIdList: number[];
    if (divisionListSelected) {
        childIdList = getAllChildId(globalThis.companyData, divisionListSelected);
        list = list.filter(division => childIdList.includes(division.id));
    }

    const divisionIdList = list.map(division => division.id);
    let entityList = globalThis.entityData.filter(entity => divisionIdList.includes(entity.division));
    return promiseWrapper(entityList);
}

export const getEntity = async (id: number) => {
    let entity = globalThis.entityData.filter(entity => entity.id === id)
    return promiseWrapper(entity);
}