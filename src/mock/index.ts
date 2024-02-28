// bad practice to pollute the global
// this is for coding test only

interface Division {
    id: number;
    name: string;
    level: number;
    parentTrack: number[]; // list of all ancester ids all the way to the root of the tree
    entityList?: number[];
}

interface DivisionNode extends Division {
    children: {
        [key: number]: DivisionNode
    }
}

enum EntityType {
    USER = 'user',
    JOB = 'job',
    EQUIPMENT = 'Equipment'
}

interface Entity {
    id: number,
    type: EntityType,
    name: string,
    level: number,
    division: number,
}

var companyData: Division[];
var entityData: Entity[];
var idCountDivision: number; // used to mimic the id generation on backend
var idCountEntity: number; // used to mimic the id generation on backend

globalThis.companyData = [
    {
        id: 1,
        name: 'Plant Manager',
        level: 1,
        parentTrack: [],
    },
    {
        id: 2,
        name: 'Engineering',
        level: 2,
        parentTrack: [1],
    },
    {
        id: 3,
        name: 'Supply Chain Mgt.',
        level: 2,
        parentTrack: [1],
    },
    {
        id: 4,
        name: 'Production',
        level: 2,
        parentTrack: [1],
    },
    {
        id: 5,
        name: 'Quality',
        level: 2,
        parentTrack: [1],
    },
    {
        id: 6,
        name: 'HR',
        level: 2,
        parentTrack: [1],
    },
    {
        id: 7,
        name: 'New Products',
        level: 3,
        parentTrack: [1, 2],
    },
    {
        id: 8,
        name: 'Industrial Eng.',
        level: 3,
        parentTrack: [1, 2],
    },
    {
        id: 9,
        name: 'Purchasing',
        level: 3,
        parentTrack: [1, 3],
    },
    {
        id: 10,
        name: 'Planning',
        level: 3,
        parentTrack: [1, 3],
    },
    {
        id: 11,
        name: 'Warehouse & Logistics',
        level: 3,
        parentTrack: [1, 3],
    },
    {
        id: 12,
        name: 'Customer Service',
        level: 3,
        parentTrack: [1, 3],
    },
    {
        id: 13,
        name: 'Workshop alpha',
        level: 3,
        parentTrack: [1, 4],
    },
    {
        id: 14,
        name: 'Workship Beta',
        level: 3,
        parentTrack: [1, 4],
    },
    {
        id: 15,
        name: 'Maintenance',
        level: 3,
        parentTrack: [1, 4],
    },
    {
        id: 16,
        name: 'Quality Control',
        level: 3,
        parentTrack: [1, 5],
    },
    {
        id: 17,
        name: 'Test Automation',
        level: 3,
        parentTrack: [1, 5],
    },
    {
        id: 18,
        name: 'Quality Engineering',
        level: 3,
        parentTrack: [1, 5],
    },
];

globalThis.entityData = [
    {
        id: 1,
        type: EntityType.JOB,
        name: 'A Job',
        level: 3,
        division: 7,
    },
    {
        id: 2,
        type: EntityType.EQUIPMENT,
        name: 'The Equipment',
        level: 3,
        division: 7,
    },
    {
        id: 3,
        type: EntityType.USER,
        name: 'The good user',
        level: 2,
        division: 6,
    },
    {
        id: 4,
        type: EntityType.JOB,
        name: 'Good job',
        level: 2,
        division: 6,
    },
    {
        id: 5,
        type: EntityType.USER,
        name: 'The better user',
        level: 3,
        division: 7,
    },
]

globalThis.idCountDivision = 18;
globalThis.idCountEntity = 5;
