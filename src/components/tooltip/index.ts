export default class ToolTip extends HTMLElement {
  _tooltipText: string;
  _tooltipContainer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template: HTMLTemplateElement = document.querySelector("#tooltip");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute("text");
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.zIndex = "10";
    this.shadowRoot.append(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("tool-tip", ToolTip);
