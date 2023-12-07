/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {classMap} from 'lit/directives/class-map.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {AbstractGame, AbstractGameData, Game} from './core/game';

interface TileConversionTable {
  default: number | null;
  [key: number]: number;
}

/**
 * Nonogram
 * @customElement nonogram-board
 */
@customElement('nonogram-board')
export class NonogramBoard extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  };

  static override styles = css`
    table {
      height: calc((var(--grid-h)) * 30px);
      width: calc((var(--grid-w)) * 30px);
      border-collapse: collapse;
    }
    .editable .hovering-col,
    .editable .hovering-row {
      position: relative;
    }
    .editable .hovering-col:not(.delete-col):not(.active):after,
    .editable .hovering-row:not(.delete-row):not(.active):after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #0002;
    }
    td {
      color: #aaa;
      border: 1px solid #000;
      width: 26px;
      height: 26px;
    }
    td.active {
      background: #000;
    }
    td.empty-spot {
      border: none;
    }
    .delete-col,
    .delete-row {
      border: none;
    }
    .xmark,
    .plusmark {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .xmark:after,
    .xmark:before,
    .plusmark:after,
    .plusmark:before {
      content: '';
      position: absolute;
      background: currentColor;
      width: 1em;
      height: 0.2em;
      border-radius: 0.1em;
    }
    .plusmark:after {
      transform: rotateZ(90deg);
    }
    .xmark:after {
      transform: rotateZ(45deg);
    }
    .xmark:before {
      transform: rotateZ(-45deg);
    }
    .editable .hovering-col,
    .editable .hovering-row {
      color: #666;
    }
  `;

  protected _gridWidth = 10;
  get gridWidth() {
    return this._gridWidth;
  }

  /***
   * The width of the grid
   */
  @property({type: Number})
  set gridWidth(value) {
    const old = this._gridWidth;
    this._gridWidth = value;
    this.requestUpdate('gridWidth', old);
  }

  protected _gridHeight = 10;
  get gridHeight() {
    return this._gridHeight;
  }

  /***
   * The height of the grid
   */
  @property({type: Number})
  set gridHeight(value) {
    const old = this._gridHeight;
    this._gridHeight = value;
    this.requestUpdate('gridHeight', old);
  }

  protected _cellSize = 10;
  get cellSize() {
    return this._cellSize;
  }

  /***
   * The size of the cell in pixels
   */
  @property({type: Number})
  set cellSize(value) {
    const old = this._cellSize;
    this._cellSize = value;
    this.requestUpdate('cellSize', old);
  }

  protected _board?: AbstractGame;

  protected _data?: AbstractGameData;

  @property({type: Object})
  set data(board_data: AbstractGameData | undefined){
    this._data = board_data;
    if(board_data){
      this.board.data = board_data.data;
      this.board.game_data = board_data.game_data;
      this._gridWidth = board_data.game_data.width;
      this._gridHeight = board_data.game_data.height;
      this.requestUpdate('board');
    }
    this.requestUpdate('data');
  }

  get data(){
    return {
      game_data: this.board.game_data,
      data: this.board.data,
    };
  }

  /***
   * Abstract board linked to the board element
   */
  get board() {
    return (
      this._board ??
      (this._board = new Game(
        {
          height: this.gridHeight,
          width: this.gridWidth,
        },
        () => 0
      ))
    );
  }

  /***
   * Sets the value(color index) of a tile
   */
  setTile(x: number, y: number, value: number) {
    this.board.set_tile(x, y, value);
    this.requestUpdate();
  }

  /***
   * Gets the value(color index) of a tile
   */
  getTile(x: number, y: number): number {
    return this.board.get_tile_nullsafe(x, y, -1);
  }

  protected mouse_button_pressed: number = 0;
  protected tile_conversion: TileConversionTable | null = null;

  protected cell_mouseover(event: MouseEvent, x: number, y: number) {
    if (!this.mouse_button_pressed || !this.tile_conversion || !this.editable)
      return;
    event.preventDefault();
    const tile = this.getTile(x, y);
    (tile in this.tile_conversion || this.tile_conversion.default != null) &&
      this.setTile(
        x,
        y,
        this.tile_conversion[tile] ?? this.tile_conversion.default
      );
  }

  protected cell_mousedown(event: MouseEvent, x: number, y: number) {
    if (this.mouse_button_pressed || !this.editable) return;
    this.mouse_button_pressed = event.buttons;
    const tile = this.getTile(x, y);
    const conversion: TileConversionTable = {
      default: null,
    };
    if (tile == 0 && event.buttons != 1) {
      conversion.default = 0;
    } else {
      conversion.default = event.buttons == 1 ? this.selected_color : null;
    }
    conversion[tile] = event.buttons != 1 ? 0 : this.selected_color;
    this.tile_conversion = conversion;
    this.setTile(x, y, event.buttons != 1 ? 0 : this.selected_color);
  }

  protected mouse_enter(x: number, y: number) {
    this.hover_col = x;
    this.hover_row = y;
  }

  protected mouse_out(x: number, y: number) {
    if (x != this.hover_col || y != this.hover_row || !this.editable) return;
    this.hover_col = undefined;
    this.hover_row = undefined;
  }

  protected board_mouseup() {
    this.mouse_button_pressed = 0;
  }

  protected board_mouseout(event: MouseEvent) {
    if (event.target !== event.currentTarget || !this.editable) return;
    this.mouse_button_pressed = 0;
  }

  protected board_mouseup_binded = this.board_mouseup.bind(this);

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('mouseup', this.board_mouseup_binded);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('mouseup', this.board_mouseup_binded);
    super.disconnectedCallback();
  }

  /**
   * Adds a row at the end(bottom) of the grid
   */
  addRow() {
    this.gridHeight = this.gridHeight + 1;
    this.board.resize(this.gridWidth, this.gridHeight, () => 0);
    this.requestUpdate();
  }

  /**
   * Adds a col at the right of the grid
   */
  addCol() {
    this.gridWidth = this.gridWidth + 1;
    this.board.resize(this.gridWidth, this.gridHeight, () => 0);
    this.requestUpdate();
  }

  /**
   * Removes a column by index
   * @param col Index of the column to remove
   */
  removeCol(col: number) {
    this.gridWidth = this.gridWidth - 1;
    this.board.removeColumn(col);
    this.requestUpdate();
  }

  /**
   * Removes a row by index
   * @param row Index of the row to remove
   */
  removeRow(row: number) {
    this.gridHeight = this.gridHeight - 1;
    this.board.removeRow(row);
    this.requestUpdate();
  }

  /**
   * Removes a color by index
   * @param index Index of the color to remove
   */
  removeColor(index: number) {
    this.board.replace_tiles(index, 0);
    this.board.replace_tiles_fn((e) => (e && e > index ? e - 1 : e));
    this.colors.splice(index, 1);
    this.requestUpdate();
  }

  /**
   * Column of the cell curently being selected (undefined in case none is selected)
   */
  @property({type: Number})
  hover_col?: number;

  /**
   * Row of the cell curently being selected (undefined in case none is selected)
   */
  @property({type: Number})
  hover_row?: number;

  /**
   * Array of colors used in the nonogram
   */
  @property({type: Array})
  colors: string[] = ['white', 'black'];

  /**
   * Currently selected color
   */
  @property({type: Number})
  selected_color: number = 1;

  /**
   * Determines if this board is editable (or read-only)
   */
  @property({type: Boolean})
  editable: boolean = false;

  /**
   * Determines if this board is resizable (or read-only)
   */
  @property({type: Boolean})
  resizable: boolean = false;

  get show_resize () {
    return this.editable && this.resizable;
  }

  override render() {
    return html`
      <table
        @mouseup=${this.board_mouseup}
        @contextmenu=${(e: Event) => e.preventDefault()}
        @selectstart=${(e: Event) => e.preventDefault()}
        class=${classMap({
          editable: this.editable,
          resizable: this.resizable
        })}
        style=${styleMap({
          '--grid-h': this.gridHeight + (this.show_resize ? 2 : 0),
          '--grid-w': this.gridWidth + (this.show_resize ? 2 : 0),
        })}
      >
        <tbody>
          <tr>
            ${(this.show_resize || undefined) &&
            html`<td class="empty-spot"></td>`}
            ${map(range(this.gridWidth), (_, x) => {
              return this.show_resize
                ? html`
                    <td
                      class=${classMap({
                        'delete-col': true,
                        'hovering-col': x == this.hover_col,
                      })}
                      @mousedown=${(e: MouseEvent) =>
                        e.buttons & 1 && this.removeCol(x)}
                    >
                      <div class="xmark"></div>
                    </td>
                  `
                : undefined;
            })}
          </tr>
          ${map(range(this.gridHeight), (_, y) => {
            return html`
              <tr>
                ${(this.show_resize || undefined) &&
                html`<td
                  class=${classMap({
                    'delete-row': true,
                    'hovering-row': y == this.hover_row,
                  })}
                  @mousedown=${(e: MouseEvent) =>
                    e.buttons & 1 && this.removeRow(y)}
                >
                  <div class="xmark"></div>
                </td>`}
                ${map(range(this.gridWidth), (_, x) => {
                  return html`
                    <td
                      class=${classMap({
                        'hovering-col': x == this.hover_col,
                        'hovering-row': y == this.hover_row,
                      })}
                      style=${styleMap({
                        backgroundColor:
                          this.colors[this.board.get_tile_nullsafe(x, y, 0)],
                      })}
                      @mouseenter=${() => this.mouse_enter(x, y)}
                      @mouseout=${() => this.mouse_out(x, y)}
                      @mouseover=${(e: MouseEvent) =>
                        this.cell_mouseover(e, x, y)}
                      @mousedown=${(e: MouseEvent) =>
                        this.cell_mousedown(e, x, y)}
                    ></td>
                  `;
                })}
                ${((y == 0 && this.show_resize) || undefined) &&
                html`<td rowspan=${this.gridHeight} @click=${this.addCol}>
                  <div class="plusmark"></div>
                </td>`}
              </tr>
            `;
          })}
          ${(this.show_resize || undefined) &&
          html`<tr>
            <td class="empty-spot"></td>
            <td colspan=${this.gridWidth} @click=${this.addRow}>
              <div class="plusmark"></div>
            </td>
          </tr>`}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nonogram-board': NonogramBoard;
  }
}
