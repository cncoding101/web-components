export default class ToolTip extends HTMLElement {
  _tooltipText: string = "";
  _tooltipContainer: HTMLDivElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot)
      this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: relative;
                background: gray;
            }

            :host-context(p) {
                font-weight: bold;
            }

            ::slotted(.highlight){
                background-color: red;
            }
        </style>
        <slot></slot>
        <span>(?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text"))
      this._tooltipText = this.getAttribute("text") || "";
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log({ name, oldValue, newValue });

    if (oldValue === newValue) return;

    if (name === "text") this._tooltipText = newValue;
  }

  static get observedAttributes() {
    return ["text"];
  }

  disconnectedCallback() {
    console.log("Disconnected");

    this._tooltipContainer.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipContainer.removeEventListener("mouseleave", this._hideTooltip);
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
