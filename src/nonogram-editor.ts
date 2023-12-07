import './nonogram-color-selector';
import './nonogram-board';
import {NonogramBoard} from './nonogram-board';
import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ColorSelector} from './nonogram-color-selector';
import { AbstractGameData } from './core/game';

@customElement('nonogram-editor')
export class NonogramEditor extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  };

  static override styles = css`
    :host {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1em;
      place-items: center;
    }
  `;

  @property({type: Array})
  colors: string[] = ['#fff', '#000'];

  @property({type: Number})
  selected_color_index: number = 1;

  @property({type: Boolean})
  editable: boolean = false;

  @property({type: Boolean})
  resizable: boolean = false;

  @property({type: Boolean})
  addable: boolean = false;

  get game() {
    return this.shadowRoot?.getElementById('board') as NonogramBoard;
  }

  get selector() {
    return this.shadowRoot?.getElementById('color-selector') as ColorSelector;
  }

  selected_color_change(e: CustomEvent<number>) {
    this.selected_color_index = e.detail;
  }

  add_color(e: CustomEvent<string>) {
    this.colors = [...this.colors, e.detail];
  }

  remove_color(e: CustomEvent<number>) {
    this.game.board.replace_tiles(e.detail, 0);
    this.game.board.replace_tiles_fn((tile) =>
      tile && tile > e.detail ? tile - 1 : tile
    );
    this.colors = this.colors.filter((_, i) => i != e.detail);
    this.selected_color_index = e.detail - 1;
  }

  @property({type: Object})
  data?: AbstractGameData;

  override render() {
    return html`
      <nonogram-board
        id="board"
        .selected_color=${this.selected_color_index}
        .colors=${this.colors}
        ?editable=${this.editable}
        ?resizable=${this.resizable}
        .data=${this.data}
      ></nonogram-board>
      ${this.editable ? html`<nonogram-color-selector
        id="color-selector"
        .selected_color_index=${this.selected_color_index}
        .colors=${this.colors}
        ?addable=${this.addable}
        @selectedcolorchange=${this.selected_color_change}
        @addcolor=${this.add_color}
        @removecolor=${this.remove_color}
      ></nonogram-color-selector>` : undefined }
    `;
  }
}
