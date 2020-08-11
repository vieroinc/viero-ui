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

import { VieroError } from '@viero/common/error';
import { VieroWebComponent } from '../webcomponent';
import { VieroStyle } from '../webcomponent/style';
import template from './index.html';
import vieroCSS from './viero.css';

let SHARED;

export class VieroApp extends VieroWebComponent {
  static get html() {
    return template;
  }

  static shared() {
    SHARED = SHARED || new this();
    return SHARED;
  }

  constructor() {
    super();
    if (SHARED) {
      throw new VieroError('VieroApp', 764279);
    }

    this._containers = Array.from(this.$.container.children).reduce((acc, ele) => {
      acc[ele.id] = ele;
      return acc;
    }, {});
    VieroStyle.registerCSS('viero', vieroCSS);
    window.vieroApp = this;
  }

  get container() {
    return { ...this._containers };
  }
}
