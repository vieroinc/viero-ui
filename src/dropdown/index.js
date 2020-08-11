import anime from 'animejs/lib/anime.es';
import { VieroError } from '@viero/common/error';
import { VieroApp } from '../app';
import { VieroWebComponent } from '../webcomponent';
import { VieroDropdownCell } from './cell';
import template from './index.html';

const UP = 1 << 1;
const DOWN = 1 << 2;
const LEFT = 1 << 3;
const RIGHT = 1 << 4;
const RADIUS = 'var(--viero-radius-large)';

const positionDropdownOnMobile = (dropdown) => {
  // eslint-disable-next-line no-param-reassign
  dropdown.style.position = 'absolute';
  // eslint-disable-next-line no-param-reassign
  dropdown.style.top = '100%';
  // eslint-disable-next-line no-param-reassign
  dropdown.style.left = '0';
  // eslint-disable-next-line no-param-reassign
  dropdown.style.width = '100%';
  // eslint-disable-next-line no-param-reassign
  dropdown.style.borderTopLeftRadius = 'var(--viero-radius-large)';
  // eslint-disable-next-line no-param-reassign
  dropdown.style.borderTopRightRadius = 'var(--viero-radius-large)';
  return dropdown.getBoundingClientRect().height;
};

const positionDropdownOnDesktop = (dropdown, eleRect) => {
  const ddRect = dropdown.getBoundingClientRect();

  const w = window.innerWidth;
  const h = window.innerHeight;
  const candidates = [
    // suggested origin if down right
    {
      x: eleRect.x, y: eleRect.y + eleRect.height, dir: DOWN | RIGHT,
    },
    // suggested origin if down left
    {
      x: eleRect.x + eleRect.width, y: eleRect.y + eleRect.height, dir: DOWN | LEFT,
    },
    // suggested origin if up left
    {
      x: eleRect.x + eleRect.width, y: eleRect.y, dir: UP | LEFT,
    },
    // suggested origin if up right
    {
      x: eleRect.x, y: eleRect.y, dir: UP | RIGHT,
    },
  ].map((pos) => {
    if (pos.dir & UP) {
      // eslint-disable-next-line no-param-reassign
      pos.vrt = pos.y / ddRect.height;
    }
    if (pos.dir & DOWN) {
      // eslint-disable-next-line no-param-reassign
      pos.vrt = (h - pos.y) / ddRect.height;
    }
    if (pos.dir & LEFT) {
      // eslint-disable-next-line no-param-reassign
      pos.hrz = pos.x / ddRect.width;
    }
    if (pos.dir & RIGHT) {
      // eslint-disable-next-line no-param-reassign
      pos.hrz = (w - pos.x) / ddRect.width;
    }
    return pos;
  });

  const hrzOrder = [...candidates.sort((posA, posB) => posA.hrz - posB.hrz)];
  const vrtOrder = [...candidates.sort((posA, posB) => posA.vrt - posB.vrt)];

  const hrzWin = hrzOrder.pop();
  const vrtWin = vrtOrder.pop();

  const pos = {
    x: hrzWin.x,
    y: vrtWin.y,
    dir: ((hrzWin.dir & LEFT) || (hrzWin.dir & RIGHT)) | ((vrtWin.dir & UP) || (vrtOrder.dir & DOWN)),
  };

  if (pos.dir & DOWN) {
    Object.assign(dropdown.style, {
      borderBottomLeftRadius: RADIUS, borderBottomRightRadius: RADIUS,
    });
    if (pos.dir & RIGHT) {
      // down right
      Object.assign(dropdown.style, {
        borderTopRightRadius: RADIUS, top: `${pos.y}px`, left: `${pos.x}px`,
      });
    } else {
      // down left
      Object.assign(dropdown.style, {
        borderTopLeftRadius: RADIUS, top: `${pos.y}px`, left: `${pos.x - ddRect.width}px`,
      });
    }
  } else {
    Object.assign(dropdown.style, {
      borderTopLeftRadius: RADIUS, borderTopRightRadius: RADIUS,
    });

    if (pos.dir & RIGHT) {
      // up right
      Object.assign(dropdown.style, {
        borderBottomRightRadius: RADIUS,
        top: `${pos.y - ddRect.height}px`,
        left: `${pos.x}px`,
      });
    } else {
      // up left
      Object.assign(dropdown.style, {
        borderBottomLeftRadius: RADIUS, top: `${pos.y - ddRect.height}px`, left: `${pos.x - ddRect.width}px`,
      });
    }
  }
};

export class VieroDropdown extends VieroWebComponent {
  static show(dropdown, rect) {
    if (!rect) {
      throw VieroError('VieroDropdown', 482141);
    }
    this.dismiss();
    window.addEventListener('resize', this.dismiss);
    VieroApp.shared().container.dropdown.addEventListener('click', this.dismiss);
    VieroApp.shared().container.dropdown.appendChild(dropdown);
    if (window.matchMedia('(max-width: 640px)').matches) {
      positionDropdownOnMobile(dropdown);
      anime({
        targets: [dropdown], easing: 'easeOutQuint', duration: 300, translateY: '-100%',
      });
    } else {
      positionDropdownOnDesktop(dropdown, rect);
    }
    // router to ensure dismiss-on-back
  }

  static dismiss() {
    VieroApp.shared().container.dropdown.removeEventListener('click', this.dismiss);
    const dropdown = VieroApp.shared().container.dropdown.children[0];
    if (!dropdown) {
      return;
    }
    // router to un-ensure dismiss-on-back
    window.removeEventListener('resize', this.dismiss);
    if (window.matchMedia('(max-width: 640px)').matches) {
      anime({
        targets: [dropdown], easing: 'easeOutQuint', duration: 300, translateY: '0', complete: () => dropdown.remove(),
      });
    } else {
      dropdown.remove();
    }
  }

  // DONE
  static get is() {
    return 'viero-dropdown';
  }

  // DONE
  static get html() {
    return template;
  }

  constructor(items) {
    super();
    if (items && items.length) {
      items.forEach((item) => this.$.container.appendChild(new VieroDropdownCell(this, item)));
    }
  }

  dismiss() {
    VieroDropdown.dismiss();
  }
}

VieroDropdown.register();
