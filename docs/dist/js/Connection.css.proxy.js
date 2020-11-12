// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".connection.svelte-1wqx1ah.svelte-1wqx1ah{position:relative;height:500px;width:300px;margin:0 10px 20px}.connection.svelte-1wqx1ah .btn-stop.svelte-1wqx1ah{position:absolute;left:20px;top:20px;z-index:100}.connection.svelte-1wqx1ah .btn-volume.svelte-1wqx1ah{position:absolute;right:20px;top:20px;z-index:100}.connection__video.svelte-1wqx1ah.svelte-1wqx1ah{position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%}.connection__video.svelte-1wqx1ah video.svelte-1wqx1ah{width:100%;height:100%;object-fit:cover}.connection__chat.svelte-1wqx1ah.svelte-1wqx1ah{position:absolute;left:0;bottom:0;width:100%;background:linear-gradient(transparent, #000)}.connection.svelte-1wqx1ah .chat.svelte-1wqx1ah{height:300px;overflow-y:auto}.connection.svelte-1wqx1ah .chat__item.svelte-1wqx1ah{margin:0 0 10px}.connection.svelte-1wqx1ah .chat__message.svelte-1wqx1ah{max-width:75%;background:#fff;border-radius:5px;color:#000}.connection.svelte-1wqx1ah .chat__author.svelte-1wqx1ah{font-weight:bold}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}