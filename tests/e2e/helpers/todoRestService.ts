/// <reference path="../typings/tsd.d.ts"/>

"use strict";

import * as rp from "request-promise";

export interface ITodo {
    _id?: string;
    todoMessage: string;
    createdAt: Date;
}

export class TodoRestService {
    constructor(private url: string) {
    }

    public async getAll(): Promise<ITodo[]> {
        console.log(`[GET] /api/todos`);
        return await rp({
            uri: `${this.url}/api/todos`,
            json: true
        });
    }

    public async delete(id: string): Promise<void> {
        console.log(`[DELETE] /api/todos/${id}`);
        await rp({
            uri: `${this.url}/api/todos/${id}`,
            json: true,
            method: "DELETE"
        });
    }

    public async createNew(task: ITodo): Promise<void> {
        console.log(`[POST] /api/todos`);
        await rp({
            uri: `${this.url}/api/todos`,
            json: true,
            method: "POST",
            body: task
        });
    }
};
