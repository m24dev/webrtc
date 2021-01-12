// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".user.svelte-li6vj2.svelte-li6vj2{overflow:hidden}.user__video.svelte-li6vj2.svelte-li6vj2{position:relative;height:150px}.user__video.svelte-li6vj2 video.svelte-li6vj2{width:100%;height:100%;object-fit:cover}.user__video.svelte-li6vj2 .btn-answer.svelte-li6vj2{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}