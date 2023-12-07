export interface Dimensions {
    width: number;
    height: number;
}
export type CompareGameFn<T, R> = (tile_a: T | null, tile_b: T | null) => R | undefined;
export type ReplaceFn<T> = (tile: T | null, x: number, y: number) => T | undefined | null;
export interface AbstractGameData<T = number, M extends Dimensions = Dimensions> {
    game_data: M;
    data: T[][];
}
export declare abstract class AbstractGame<T = number, M extends Dimensions = Dimensions> implements AbstractGameData<T, M> {
    game_data: M;
    data: T[][];
    constructor(level_data: M, default_value: () => T);
    get_tile<T>(x: number, y: number, default_val?: T | null): T | T | null;
    get_tile_nullsafe<T>(x: number, y: number, default_val: T): T | T;
    set_tile(x: number, y: number, value: T): T | null;
    replace_tiles_fn(fn: ReplaceFn<T>): void;
    replace_tiles(tile_from: T, tile_to: T): void;
    protected cloneInternal(game: AbstractGame<T>): AbstractGame<T>;
    compare_with_game<R>(game: AbstractGame<T>, fn: CompareGameFn<T, R>, default_value: R): R;
    resize(width: number, height: number, default_value: () => T): void;
    removeRow(start: number, amount?: number): void;
    removeColumn(start: number, amount?: number): void;
}
export declare class Game extends AbstractGame {
}
//# sourceMappingURL=game.d.ts.map