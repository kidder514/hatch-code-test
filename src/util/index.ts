import uniq from 'lodash/uniq';

export const listToTree = (divisionList: Division[]): DivisionNode[] => {
    // sort by level, list in descending order, e.g. 5,4,3,2,1
    const divisionListDesc = divisionList.sort((a, b) => b.level - a.level);
    return getTreeList(divisionListDesc);;
}

export const getTreeList = (divisionListDesc: Division[]): DivisionNode[] => {
    let divisionListCurrentLevel: DivisionNode[] = [];
    let divisionListPreviousLevel: DivisionNode[] = [];
    let currentLevel = divisionListDesc[0].level;

    divisionListDesc.forEach(division => {
        if (division.level < currentLevel) {
            currentLevel = division.level;
            divisionListPreviousLevel = [...divisionListCurrentLevel];
            divisionListCurrentLevel = [];
        }

        let divisionNode: DivisionNode = { ...division, children: {} }
        divisionListPreviousLevel
            .filter(child => child.parentTrack.includes(divisionNode.id))
            .forEach(child => divisionNode.children[child.id] = child)

        divisionListCurrentLevel.push(divisionNode);
    })

    return divisionListCurrentLevel;
}

export const getAllChildId = (divisionlist: Division[], divisionListSelected: number[]) => {
    // number[][], needs to be flattened.
    const childIdSet: number[] = findNodeChildId(divisionlist, divisionListSelected);
    return uniq(childIdSet.flat(Infinity));
}

const findNodeChildId = (divisionlist: Division[], childTrack: number[]): any => {
    return childTrack.map(divisionId => {
        const division = divisionlist.find(division => division.id === divisionId);
        if (division?.childTrack && division?.childTrack.length > 0) {
            return [divisionId, findNodeChildId(divisionlist, division?.childTrack)]
        } else {
            return divisionId;
        }
    })
}
