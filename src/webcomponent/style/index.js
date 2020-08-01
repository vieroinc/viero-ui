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

const REGISTRY = {};

export class VieroStyle {
  /**
   * Registers a named <style> element with the provided CSS content.
   * The style element then can be included from styles in VieroWebComponent.
   */
  static registerCSS(id, css) {
    const template = document.createElement('template');
    template.innerHTML = `<style id="${id}">${css}</style>`;
    REGISTRY[id] = template;
  }

  static getStyle(id) {
    const template = REGISTRY[id];
    if (!template) {
      return null;
    }
    return template.content.cloneNode(true);
  }
}
