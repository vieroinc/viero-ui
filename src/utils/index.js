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

export const createElement = (tagName, options) => {
  // eslint-disable-next-line no-param-reassign
  options = options || {};
  const element = document.createElement(tagName);
  if (options.classes && options.classes.length) {
    element.className = options.classes.join(' ');
  }
  if (options.attributes) {
    Object.keys(options.attributes).forEach((key) => element.setAttribute(key, options.attributes[key]));
  }
  if (options.style) {
    Object.keys(options.style).forEach((key) => {
      element.style[key] = options.style[key];
    });
  }
  if (options.properties) {
    Object.keys(options.properties).forEach((key) => {
      element[key] = options.properties[key];
    });
  }
  if (options.container) {
    options.container.appendChild(element);
  }
  return element;
};

export const rem2Px = (rem) => rem * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

export const px2Rem = (px) => px / Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
