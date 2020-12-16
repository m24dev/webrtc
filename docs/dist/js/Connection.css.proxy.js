// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".btn-stop.svelte-ey45hr.svelte-ey45hr{position:absolute;left:10px;top:10px;z-index:100}.btn-volume.svelte-ey45hr.svelte-ey45hr{position:absolute;right:10px;top:10px;z-index:100}.btn-answer.svelte-ey45hr.svelte-ey45hr{position:absolute;left:50%;top:10px;transform:translateX(-50%);z-index:100}.connection.svelte-ey45hr.svelte-ey45hr{height:100%;width:100%}.connection__video.svelte-ey45hr.svelte-ey45hr{position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%}.connection__video.svelte-ey45hr video.svelte-ey45hr{width:100%;height:100%;object-fit:cover}.connection__chat.svelte-ey45hr.svelte-ey45hr{position:absolute;left:0;bottom:0;width:100%;background:linear-gradient(transparent, #000)}.chat.svelte-ey45hr.svelte-ey45hr{max-height:300px;overflow-y:auto;flex-wrap:wrap;line-height:1}.chat__item.svelte-ey45hr.svelte-ey45hr{width:100%}.chat__item_alt.svelte-ey45hr.svelte-ey45hr{justify-content:flex-end}.chat__message.svelte-ey45hr.svelte-ey45hr{position:relative;max-width:75%;background:#fff;border-radius:5px;font-size:90%;color:#000}.chat__message.svelte-ey45hr.svelte-ey45hr:after{content:\"\";position:absolute;right:0;bottom:0;border-bottom:7px solid #fff;border-left:5px solid transparent;border-right:5px solid transparent;transform:translateX(50%)}.chat__item_alt.svelte-ey45hr .chat__message.svelte-ey45hr{background:#28a745}.chat__item_alt.svelte-ey45hr .chat__message.svelte-ey45hr:after{right:auto;left:0;border-bottom-color:#28a745;transform:translateX(-50%)}.chat__item_alt.svelte-ey45hr .chat__author.svelte-ey45hr{text-align:right}.popup.svelte-ey45hr.svelte-ey45hr{position:absolute;left:0;top:50px;width:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}