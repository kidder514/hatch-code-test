import { atom } from 'jotai';

export const selectDivisionListAtom = atom<number[]>([]);
export const selectLevelAtom = atom<number>(1);
export const selectEntityAtom = atom<number | undefined>(undefined);