import { VieroWebComponent } from '../../webcomponent';
// eslint-disable-next-line no-unused-vars
import { VieroIcon } from '../../icon';
import template from './index.html';

export class VieroDropdownCell extends VieroWebComponent {
  static get is() {
    return 'viero-dropdown-cell';
  }

  static get html() {
    return template;
  }

  constructor(dropdown, item) {
    super();
    this._dropdown = dropdown;
    this._item = item;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this._item.separator) {
      this.$.content.classList.add('separator');
    } else if (this._item.separatorblock) {
      this.$.content.classList.add('separatorblock');
    } else if (this._item.disabled) {
      this.$.content.classList.add('disabled');
    } else {
      // debugger;
    }

    if (this._item.iconPath) {
      this.$.icon.setAttribute('path', this._item.iconPath);
    }
    if (this._item.extPath) {
      this.$.ext.setAttribute('path', this._item.extPath);
    }
    this.$.title.innerHTML = this._item.titleHTML;

    if (this._item.action) {
      this.addEventListener('click', () => {
        this._dropdown.dismiss();
        this._item.action();
      });
    }
  }
}

VieroDropdownCell.register();
