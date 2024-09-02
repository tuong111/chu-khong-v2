import hanViet from '../json/hanViet.json';
import hanNom from '../json/hanNom.json';
import boFull from '../json/boFull.json';
import gianPhonThe from '../json/gianPhonThe.json';

export type DictionaryEntry = [string, string];

type DictionaryType = {
    id: number;
    name: string;
    list: DictionaryEntry[];
};

export const DICTIONARY_LIST: DictionaryType[] = [
    {
        id: 1,
        name: 'Hán Việt',
        list: hanViet.data as DictionaryEntry[]
    },
    {
        id: 2,
        name: 'Hán Nôm',
        list: hanNom.data as DictionaryEntry[]
    },
    // {
    //     name: 'Bộ Full',
    //     list: boFull.data as DictionaryEntry[]
    // },
    {
        id: 3,
        name: 'Giản Phồn Thể',
        list: gianPhonThe.data as DictionaryEntry[]
    }
];
