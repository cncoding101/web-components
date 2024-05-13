import { FASTElement, attr, customElement } from "@microsoft/fast-element";
import template from "@/components/modal/html";
import styles from "@/components/modal/style";

@customElement({
  name: "wcs-modal",
  template,
  styles,
})
export default class Modal extends FASTElement {
  @attr isOpen = false;
  // testService: typeof cue.core.webcomponents.CUEElement.prototype;

  constructor() {
    super();

    // this.testService = new cue.core.webcomponents.CUEElement();
    // this.testService.id = "hello";

    const cancelBtn = this.shadowRoot.querySelector("#cancel");
    const confirmBtn = this.shadowRoot.querySelector("#confirm");

    // cancelBtn.addEventListener("click", this._hide.bind(this));
    // confirmBtn.addEventListener("click", this._hide.bind(this));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.hasAttribute("opened")) this.isOpen = true;
    else this.isOpen = false;
  }

  static get observedAttributes() {
    return ["opened"];
  }

  public open() {
    this.setAttribute("opened", "");
  }

  _hide() {
    if (this.hasAttribute("opened")) this.removeAttribute("opened");
  }
}
