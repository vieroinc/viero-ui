/**
 * Copyright 2020 Viero, Inc.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { VieroWebComponent } from '../webcomponent';
import { NONE } from './none';

class VieroIcon extends VieroWebComponent {
  static get is() {
    return 'viero-icon';
  }

  static get html() {
    return `
      <style>
        :host { display: block; }
        #container { position: relative; width: 100%; height: 100%; }
        #svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        #path { fill: var(--fill); }
        :host(:hover) #path { fill: var(--fill-hover, var(--fill)); }
        :host(:active) #path { fill: var(--fill-active, var(--fill)); }
      </style>
      <div id="container">
        <svg id="svg" viewBox="0 0 210 210">
          <g id="g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path id="path" d="M104.5,157" fill-rule="nonzero">
          </g>
        </svg>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  get path() {
    return this.$.path.getAttribute('d');
  }

  set path(path) {
    this.$.path.setAttribute('d', path || NONE);
  }
}

VieroIcon.register();

export { VieroIcon };
