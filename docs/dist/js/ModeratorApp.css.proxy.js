// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".moderator.svelte-1o6rzx3{min-height:100vh}.connections.svelte-1o6rzx3{display:flex;justify-content:center}.loader.svelte-1o6rzx3{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}