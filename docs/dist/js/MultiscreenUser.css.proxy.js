// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user.svelte-1ikueo0.svelte-1ikueo0{position:relative;width:20%;height:15vh}.user.svelte-1ikueo0 video.svelte-1ikueo0{width:100%;height:100%;object-fit:cover}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}