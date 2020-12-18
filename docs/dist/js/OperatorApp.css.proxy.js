// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".answer.svelte-5ojqld{position:absolute;left:0;bottom:0;width:100%}.answer__inner.svelte-5ojqld{width:500px;height:300px;font-size:100px;font-weight:bold}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}