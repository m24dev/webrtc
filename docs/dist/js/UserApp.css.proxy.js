// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".buttons.svelte-1biodbv.svelte-1biodbv{position:absolute;left:0;bottom:40px;width:100%}.buttons.svelte-1biodbv .btn.svelte-1biodbv{width:70px;height:70px;font-size:40px}.buttons_answered.svelte-1biodbv .btn.svelte-1biodbv:not(.btn_selected){opacity:0.5}.buttons_answered.svelte-1biodbv .btn_selected{box-shadow:0 0 0 10px yellow}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}