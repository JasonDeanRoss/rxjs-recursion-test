import { Inject, Injectable, InjectionToken } from '@angular/core';
import { from, Observable, of } from "rxjs";
import {concatMap, expand, map, mergeAll, mergeMap, mergeScan, switchMap, tap, toArray} from "rxjs/operators";

interface ITestData {
    property: string;
    type: string;
    children?: ITestData[];
    path?: string;
}

const testData: ITestData[] = [
    {
        property: 'one',
        type: 'data',
        children: [
            {
                property: 'two',
                type: 'data'
            },
            {
                property: 'three',
                type: 'data'
            },
        ],
    },
    {
        property: 'four',
        type: 'recursive',
        path: 'inject-data-1',
    },
    {
        property: 'five',
        type: 'data',
        children: [
            {
                property: 'twelve',
                type: 'recursive',
                path: 'inject-data-2',
            },
        ]
    },
];

const templates = {
    'inject-data-1': [
        {
            property: 'six',
            type: 'data',
            children: [
                {
                    property: 'seven',
                    type: 'data'
                },
                {
                    property: 'eight',
                    type: 'data'
                },
            ],
        },
    ],
    'inject-data-2': [
        {
            property: 'nine',
            type: 'data',
            children: [
                {
                    property: 'ten',
                    type: 'data'
                },
                {
                    property: 'eleven',
                    type: 'data'
                },
            ],
        },
    ]
}

@Injectable({
    providedIn: 'root',
})
export class RxjsRecursionTesterService {

    constructor() {
    }

    /**
     * Parses a formly config at the target url
     * @param url
     */
    recursionTester(): Observable<object> {
        let responsePipeline = of(testData).pipe(
            switchMap((data) => this.recursiveFunction(data)),
        );
        return responsePipeline;
    }

    private recursiveFunction(data: ITestData[]): Observable<ITestData[]> {
        return from(data).pipe(
            switchMap(currentRecord => {
                if (currentRecord.type === 'recursive') {
                    return this.recursiveFunction(templates[currentRecord.path])
                } else if (currentRecord.children) {
                    return this.recursiveFunction(currentRecord.children).pipe(
                        map(result => {
                            currentRecord.children = result;
                            return currentRecord;
                        })
                    );
                } else {
                    return of(currentRecord);
                }
            }),
            mergeScan((acc: ITestData[], value, index) => {
                console.log(`Index: ${index} Value: ${JSON.stringify(value)}`);
                Array.isArray(value) ? acc.push(...value) : acc.push(value);
                return of(acc);
            }, []),
        );
    }
}
