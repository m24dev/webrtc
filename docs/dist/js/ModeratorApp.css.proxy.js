// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".moderator.svelte-hu8mga{min-height:100vh}.connections.svelte-hu8mga{display:flex;flex-wrap:wrap;justify-content:center}.loader.svelte-hu8mga{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}