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

import { VieroRecorder } from '@viero/recorder';
import { VieroWebComponent } from '../webcomponent';
import template from './index.html';

export class VieroSimpleRecorder extends VieroWebComponent {
  static get is() {
    return 'viero-simple-recorder';
  }

  static get html() {
    return template;
  }

  constructor() {
    super();

    this._onDidStartProxy = this._onDidStart.bind(this);
    this._onDidStopProxy = this._onDidStop.bind(this);
    this._onStreamDidChangeProxy = this._onStreamDidChange.bind(this);

    this._recorder = new VieroRecorder();
    this._recorder.addEventListener(VieroRecorder.EVENT.DID_START, this._onDidStartProxy);
    this._recorder.addEventListener(VieroRecorder.EVENT.DID_STOP, this._onDidStopProxy);
    this._recorder.addEventListener(VieroRecorder.EVENT.STREAM_DID_CHANGE, this._onStreamDidChangeProxy);

    this.$.video.muted = true;
  }

  get controller() {
    return this._recorder;
  }

  get video() {
    return this.$.video;
  }

  _onDidStart() {
    this.$.container.classList.add('on');
  }

  _onDidStop() {
    this.$.container.classList.remove('on');
  }

  _onStreamDidChange() {
    this.$.video.srcObject = this._recorder.stream;
  }
}

VieroSimpleRecorder.register();
