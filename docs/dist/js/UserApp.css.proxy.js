// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".buttons.svelte-13lqtc1.svelte-13lqtc1{position:absolute;left:0;bottom:0;width:100%}.buttons.svelte-13lqtc1 .btn.svelte-13lqtc1{width:80px;height:80px;font-size:40px}.buttons_answered.svelte-13lqtc1 .btn.svelte-13lqtc1:not(.btn_selected){opacity:0.5}.buttons_answered.svelte-13lqtc1 .btn_selected{box-shadow:0 0 0 10px yellow}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}