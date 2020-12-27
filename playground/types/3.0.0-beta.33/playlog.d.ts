/*v3.1.0

*/

declare module '@akashic/playlog' {
    export * from "@akashic/playlog/Tick";
    export * from "@akashic/playlog/Event";
    export * from "@akashic/playlog/StorageData";
}

declare module '@akashic/playlog/Tick' {
    import * as Event from "@akashic/playlog/Event";
    import { StorageData } from "@akashic/playlog/StorageData";
    export interface Tick extends Array<any> {
        [index: number]: any;
        0: number;
        1?: Event.Event[] | null;
        2?: StorageData[];
    }
    export const enum TickIndex {
        Frame = 0,
        Events = 1,
        StorageData = 2
    }
    export interface TickList extends Array<any> {
        [index: number]: any;
        0: number;
        1: number;
        2?: Tick[];
    }
    export const enum TickListIndex {
        From = 0,
        To = 1,
        Ticks = 2
    }
}

declare module '@akashic/playlog/Event' {
    import * as storage from "@akashic/playlog/StorageData";
    export const enum EventCode {
        Join = 0,
        Leave = 1,
        Timestamp = 2,
        PlayerInfo = 3,
        Message = 32,
        PointDown = 33,
        PointMove = 34,
        PointUp = 35,
        Operation = 64
    }
    export interface Event extends Array<any> {
        [index: number]: any;
        0: EventCode;
        1: number;
        2: string | null;
    }
    export const enum EventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2
    }
    export const enum EventFlagsMask {
        Priority = 3,
        Transient = 8,
        Ignorable = 16
    }
    export interface JoinEvent extends Event {
        3: string;
        4?: storage.StorageData[];
    }
    export const enum JoinEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        PlayerName = 3,
        StorageData = 4
    }
    export interface LeaveEvent extends Event {
    }
    export const enum LeaveEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2
    }
    export interface TimestampEvent extends Event {
        3: number;
    }
    export const enum TimestampEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        Timestamp = 3
    }
    export interface PlayerInfoEvent extends Event {
        3: string;
        4?: any;
    }
    export const enum PlayerInfoEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        PlayerName = 3,
        UserData = 4
    }
    export interface MessageEvent extends Event {
        3: any;
    }
    export const enum MessageEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        Data = 3
    }
    export interface PointDownEvent extends Event {
        3: number;
        4: number;
        5: number;
        6?: number;
    }
    export const enum PointDownEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        PointerId = 3,
        X = 4,
        Y = 5,
        EntityId = 6
    }
    export interface PointMoveEvent extends Event {
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10?: number;
    }
    export const enum PointMoveEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        PointerId = 3,
        X = 4,
        Y = 5,
        StartDeltaX = 6,
        StartDeltaY = 7,
        PrevDeltaX = 8,
        PrevDeltaY = 9,
        EntityId = 10
    }
    export interface PointUpEvent extends Event {
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10?: number;
    }
    export const enum PointUpEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        PointerId = 3,
        X = 4,
        Y = 5,
        StartDeltaX = 6,
        StartDeltaY = 7,
        PrevDeltaX = 8,
        PrevDeltaY = 9,
        EntityId = 10
    }
    export interface OperationEvent extends Event {
        3: number;
        4: (number | string)[];
    }
    export const enum OperationEventIndex {
        Code = 0,
        EventFlags = 1,
        PlayerId = 2,
        OperationCode = 3,
        Data = 4
    }
}

declare module '@akashic/playlog/StorageData' {
    export interface StorageKey {
        region: number;
        regionKey: string;
        gameId?: string;
        userId?: string;
    }
    export interface StorageValue {
        data: string | number;
        tag?: string;
        storageKey?: StorageKey;
    }
    export interface StorageReadKey extends StorageKey {
        options?: {
            keyOrder?: number;
            valueOrder?: number;
        };
    }
    export interface StorageData {
        readKey: StorageReadKey;
        values: StorageValue[];
    }
}

