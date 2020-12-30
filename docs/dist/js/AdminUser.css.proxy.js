// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user__video.svelte-1302kxk.svelte-1302kxk{height:150px}.user__video.svelte-1302kxk video.svelte-1302kxk{width:100%;height:100%;object-fit:cover}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}