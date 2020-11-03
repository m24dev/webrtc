// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n\n.container {\n  max-width: 1200px;\n  margin: auto;\n}\n\n.users {\n  display: flex;\n  justify-content: center;\n}\n.users__item {\n  width: 300px;\n  margin: 0 10px;\n}\n\nvideo {\n  margin: 0 0 20px;\n  --width: 30%;\n  width: var(--width);\n  height: calc(var(--width) * 0.75);\n  background: grey;\n}\n\n.form-group {\n  margin: 0 0 20px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}