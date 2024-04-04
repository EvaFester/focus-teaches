import { MouseEvent } from 'react'

export function getAnchorClickHandler(href: string) {
  return function handleAnchorClick(evt: MouseEvent<HTMLAnchorElement>) {
    const id = href.split('#')[1];
    if (!id) {
      return;
    }

    evt.preventDefault();
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    window.history.pushState(null, '', '#' + id)
    window.scroll({
      top: window.scrollY + target.getBoundingClientRect().y,
      behavior: 'smooth'
    })
  }
}
