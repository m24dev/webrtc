// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user.svelte-1j7nwsj .connection{width:100% !important;height:100% !important;margin:0 !important}.user.svelte-1j7nwsj{position:fixed;left:0;top:0;width:100%;height:100%}.btn-start.svelte-1j7nwsj{position:absolute;left:50%;top:50%;width:100px;height:100px;border-radius:50%;transform:translate(-50%, -50%);z-index:100}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}