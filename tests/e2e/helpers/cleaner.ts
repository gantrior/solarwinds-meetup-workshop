/// <reference path="../typings/tsd.d.ts"/>

"use strict";

export class Cleaner {
    private static callbacks = [];

    public static add(callback: () => Promise<any>): void {
        Cleaner.callbacks.push(callback);
    }

    public static async clean(): Promise<void> {
        var current: () => Promise<any>;
        while (current = Cleaner.callbacks.pop()) {
            await current();
        }
    }
};
