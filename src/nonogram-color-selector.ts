import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {map} from 'lit/directives/map.js';
import {styleMap} from 'lit/directives/style-map.js';

@customElement('nonogram-color-selector')
export class ColorSelector extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  };

  static override styles = css`
    :host {
      display: flex;
      font-size: 25px;
      box-shadow: #0005 0 0 1px 1px;
      border-radius: 0 0 1em 1em;
      position: relative;
    }
    input[type='color'] {
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0;
      right: 50px;
      pointer-events: none;
    }
    .color-container {
      position: relative;
      border: 0em solid var(--color-selected);
      border-top-width: 0.2em;
      border-bottom-width: 0.2em;
      overflow: hidden;
    }
    button.color-btn,
    button.delete-btn {
      font-size: inherit;
      border: none;
      background-color: transparent;
      height: 2.5em;
      width: 2.5em;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 0.1s;
      border-top-width: 0.2em;
      border-bottom-width: 0.2em;
      overflow: hidden;
      cursor: pointer;
    }
    button.delete-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 10px;
      opacity: 0;
      transition: opacity 0.1s;
      width: 20px;
      height: 20px;
    }
    .color-container:hover button.delete-btn {
      opacity: 1;
    }
    .color-container:first-of-type {
      border-radius: 0 0 0 1em;
      border-left-width: 0.2em;
    }
    .color-container:last-child {
      border-radius: 0 0 1em 0;
      border-right-width: 0.2em;
    }
    button.color-btn::after,
    button.color-btn::before {
      position: absolute;
      content: '';
      width: 1em;
      height: 1em;
      border-radius: 50%;
      background: var(--color);
      border: 0.2em solid #ddd;
      transition: height 0.1s, width 0.1s, border 0s;
    }
    button.color-btn::after {
      border: none;
    }
    button.color-btn.selected::before {
      width: 100%;
      border-radius: 0;
      height: 100%;
    }
    button.color-btn::after {
      width: 0;
      height: 0;
    }
    button.color-btn.selected::after {
      /*border: .2em solid #ddd;*/
      width: 1em;
      height: 1em;
    }
    .xmark {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .xmark:after,
    .xmark:before {
      content: '';
      position: absolute;
      background: currentColor;
      width: 1em;
      height: 0.2em;
      border-radius: 0.1em;
      border: 1px solid #fff;
    }
    .xmark:after {
      transform: rotateZ(45deg);
    }
    .xmark:before {
      transform: rotateZ(-45deg);
    }
  `;

  @property({type: Array})
  colors: string[] = ['#f00', '#000'];

  @property({type: Number})
  selected_color_index: number = 1;

  @property({type: Boolean})
  addable: boolean = false;

  select_color(index: number) {
    this.dispatchEvent(
      new CustomEvent('selectedcolorchange', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: index,
      })
    ) && (this.selected_color_index = index);
  }

  reject_pick_color_fn: (() => void) | null = null;

  pick_color() {
    return new Promise<string>((res, rej) => {
      if (!this.shadowRoot) throw Error('SHADOW ROOT NOT DEFINED');
      const colorPicker: HTMLInputElement | null =
        this.shadowRoot.querySelector('#color_picker');
      if (!colorPicker) throw Error('Color picker not found');
      colorPicker.click();
      const on_change = () => {
        res(colorPicker.value);
        colorPicker.removeEventListener('change', on_change);
      };
      this.reject_pick_color_fn = () => {
        colorPicker.removeEventListener('change', on_change);
        rej();
      };
      colorPicker.addEventListener('change', on_change);
    });
  }

  async add_color() {
    this.reject_pick_color_fn && this.reject_pick_color_fn();
    const color = await this.pick_color();
    if (
      this.dispatchEvent(
        new CustomEvent('addcolor', {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: color,
        })
      )
    ) {
      this.colors = [...this.colors, color];
      this.select_color(this.colors.length - 1);
    }
  }

  delete_color(index: number) {
    this.dispatchEvent(
      new CustomEvent('removecolor', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: index,
      })
    ) &&
      this.colors.splice(index, 1) &&
      this.requestUpdate();
  }

  override render() {
    return html`
      <input type="color" id="color_picker" />
      ${map(
        this.colors,
        (color, i) => html`
          <div
            class="color-container"
            style=${styleMap({
              '--color': color,
              '--color-selected': this.colors[this.selected_color_index],
            })}
          >
            <button
              class=${classMap({
                'color-btn': true,
                selected: this.selected_color_index == i,
              })}
              style=${styleMap({
                '--color': color,
                '--color-selected': this.colors[this.selected_color_index],
              })}
              @click=${() => this.select_color(i)}
            ></button>
            ${this.addable ? html`<button
              style=${styleMap({
                display: i == 0 ? 'none' : '',
              })}
              class="delete-btn"
              @click=${() => i != 0 && this.delete_color(i)}
            >
              <div class="xmark"></div>
            </button>` : undefined}
          </div>
        `
      )}
      ${this.addable
        ? html`
            <div
              class="color-container"
              style=${styleMap({
                '--color':
                  'conic-gradient(hsl(0deg 100% 50%), hsl(10deg 100% 50%), hsl(20deg 100% 50%), hsl(30deg 100% 50%), hsl(40deg 100% 50%), hsl(50deg 100% 50%), hsl(60deg 100% 50%), hsl(70deg 100% 50%), hsl(80deg 100% 50%), hsl(90deg 100% 50%), hsl(100deg 100% 50%), hsl(110deg 100% 50%), hsl(120deg 100% 50%), hsl(130deg 100% 50%), hsl(140deg 100% 50%), hsl(150deg 100% 50%), hsl(160deg 100% 50%), hsl(170deg 100% 50%), hsl(180deg 100% 50%), hsl(190deg 100% 50%), hsl(200deg 100% 50%), hsl(210deg 100% 50%), hsl(220deg 100% 50%), hsl(230deg 100% 50%), hsl(240deg 100% 50%), hsl(250deg 100% 50%), hsl(260deg 100% 50%), hsl(270deg 100% 50%), hsl(280deg 100% 50%), hsl(290deg 100% 50%), hsl(300deg 100% 50%), hsl(310deg 100% 50%), hsl(320deg 100% 50%), hsl(330deg 100% 50%), hsl(340deg 100% 50%), hsl(350deg 100% 50%))',
                '--color-selected': this.colors[this.selected_color_index],
              })}
            >
              <button
                class="color-btn"
                @click=${() => this.add_color()}
              ></button>
            </div>
          `
        : undefined}
    `;
  }
}
