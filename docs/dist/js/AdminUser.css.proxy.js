// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user.svelte-8w7att.svelte-8w7att{overflow:hidden}.user__video.svelte-8w7att.svelte-8w7att{position:relative;height:200px}.user__video.svelte-8w7att video.svelte-8w7att{width:100%;height:100%;object-fit:cover}.user__video.svelte-8w7att .btn-answer.svelte-8w7att{position:absolute;left:50%;bottom:5px;transform:translateX(-50%);white-space:nowrap;opacity:0.7}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}