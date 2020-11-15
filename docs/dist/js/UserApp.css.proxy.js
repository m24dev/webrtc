// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user.svelte-7b5d3k .connection{width:100% !important;height:100% !important;margin:0 !important}.user.svelte-7b5d3k{position:fixed;left:0;top:0;width:100%;height:100%}.input-start.svelte-7b5d3k{position:absolute;left:50%;top:50%;width:300px;transform:translate(-50%, -50%);z-index:100}.loader.svelte-7b5d3k{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}