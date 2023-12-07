export interface Dimensions {
  width: number;
  height: number;
}

export type CompareGameFn<T, R> = (
  tile_a: T | null,
  tile_b: T | null
) => R | undefined;

export type ReplaceFn<T> = (
  tile: T | null,
  x: number,
  y: number
) => T | undefined | null;

export interface AbstractGameData<
  T = number,
  M extends Dimensions = Dimensions
> {
  game_data: M;
  data: T[][];
}

export abstract class AbstractGame<
  T = number,
  M extends Dimensions = Dimensions
> implements AbstractGameData<T, M> {
  game_data: M;
  data: T[][];

  constructor(level_data: M, default_value: () => T) {
    this.game_data = level_data;
    this.data = new Array(this.game_data.height)
      .fill(0)
      .map(() => new Array(this.game_data.width).fill(0));
    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];
      for (let j = 0; j < element.length; j++) {
        this.data[i][j] = default_value();
      }
    }
  }

  get_tile<T>(x: number, y: number, default_val: T | null = null) {
    return this.data &&
      y >= 0 &&
      y < this.data.length &&
      x >= 0 &&
      x < this.data[y].length
      ? this.data[y][x]
      : default_val;
  }

  get_tile_nullsafe<T>(x: number, y: number, default_val: T) {
    return this.data &&
      y >= 0 &&
      y < this.data.length &&
      x >= 0 &&
      x < this.data[y].length
      ? this.data[y][x]
      : default_val;
  }

  set_tile(x: number, y: number, value: T) {
    return this.data ? (this.data[y][x] = value) : null;
  }

  replace_tiles_fn(fn: ReplaceFn<T>) {
    for (let x = 0; x < this.game_data.width; x++) {
      for (let y = 0; y < this.game_data.height; y++) {
        const r = fn(this.get_tile_nullsafe(x, y, null), x, y);
        r && this.set_tile(x, y, r);
      }
    }
  }

  replace_tiles(tile_from: T, tile_to: T) {
    for (let x = 0; x < this.game_data.width; x++) {
      for (let y = 0; y < this.game_data.height; y++) {
        if (this.get_tile_nullsafe(x, y, null) == tile_from) {
          this.set_tile(x, y, tile_to);
        }
      }
    }
  }

  protected cloneInternal(game: AbstractGame<T>): AbstractGame<T> {
    if (game.data) {
      for (let i = 0; i < game.data.length; i++) {
        for (let j = 0; j < game.data[i].length; j++) {
          game.data[i][j] = this.data[i][j];
        }
      }
    }
    return game;
  }

  compare_with_game<R>(
    game: AbstractGame<T>,
    fn: CompareGameFn<T, R>,
    default_value: R
  ) {
    for (let x = 0; x < this.game_data.width; x++) {
      for (let y = 0; y < this.game_data.height; y++) {
        const r = fn(
          this.get_tile_nullsafe(x, y, null),
          game.get_tile_nullsafe(x, y, null)
        );
        if (r !== undefined) return r;
      }
    }
    return default_value;
  }

  resize(width: number, height: number, default_value: () => T) {
    if (height < this.game_data.height) {
      this.data = this.data.slice(0, height);
    }
    if (height > this.game_data.height) {
      const arr = new Array(height - this.game_data.height)
        .fill(null)
        .map(() =>
          new Array(this.game_data.width).fill(null).map(default_value)
        );
      this.data.push(...arr);
    }

    if (width < this.game_data.width) {
      this.data = this.data.map((e) => e.slice(0, width));
    }

    if (width > this.game_data.width) {
      const delta = width - this.game_data.width;
      this.data.forEach((e) => {
        e.push(...Array(delta).fill(null).map(default_value));
      });
    }
    this.game_data = {
      ...this.game_data,
      width,
      height,
    };
  }

  removeRow(start: number, amount: number = 1) {
    if (amount < 0) {
      throw RangeError('The amount of rows to remove cannot be less than 0');
    }
    amount = Math.min(amount, this.game_data.height);
    this.data = [
      ...this.data.slice(0, start),
      ...this.data.slice(start + amount),
    ];
    this.game_data = {
      ...this.game_data,
      height: this.data.length,
    };
  }

  removeColumn(start: number, amount: number = 1) {
    if (amount < 0) {
      throw RangeError('The amount of rows to remove cannot be less than 0');
    }
    amount = Math.min(amount, this.game_data.width);

    this.data = this.data.map((e) => [
      ...e.slice(0, start),
      ...e.slice(start + amount),
    ]);
    this.game_data = {
      ...this.game_data,
      width: this.game_data.width - amount,
    };
  }
}

export class Game extends AbstractGame {}
