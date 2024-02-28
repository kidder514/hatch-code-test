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

export const addDivision = async ({ parent, name }: { parent: DivisionNode, name: string }) => {
    let id = idCountDivision + 1;
    let division = {
        id,
        name,
        level: parent.level + 1,
        parentTrack: [...parent.parentTrack, parent.id],
        childTrack: []
    };
    console.log('division', division);
    globalThis.companyData.push(division);
    const parentIndex = globalThis.companyData.findIndex(division => division.id === parent.id)
    globalThis.companyData[parentIndex].childTrack.push(id)
    idCountDivision++;
    return promiseWrapper('sucessful');
}

export const addEntity = async ({ parent, name, type }: { parent: DivisionNode, name: string, type: EntityType }) => {
    let id = idCountEntity + 1;
    let entity = {
        id,
        type,
        name,
        level: parent.level,
        division: parent.id
    };

    globalThis.entityData.push(entity);
    idCountDivision++;
    return promiseWrapper('sucessful');
}


export const getEntity = async (id?: number): Promise<{ entity: Entity, divisionList: DivisionNode[] }> => {
    if (!id) return promiseWrapper({});

    let entity = globalThis.entityData.find(entity => entity.id === id) as Entity;
    let division = globalThis.companyData.find(division => division.id === entity.division);
    let ids = [...division?.parentTrack as [], (division as DivisionNode).id]

    let divisionList = await getDivisionList(1, ids);
    return promiseWrapper({ entity, divisionList });
}