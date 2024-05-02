import { html } from "@microsoft/fast-element";
import Modal from "@/components/modal/index";

export default html<Modal>`
  <div id="backdrop"></div>
  <div id="modal">
    <header>
      <h1>Please confirm</h1>
      <h2>${(x) => x.isOpen}</h2>
    </header>

    <section id="main">
      <slot></slot>
    </section>

    <section id="actions">
      <button id="cancel">Cancel</button>
      <button id="confirm">Confirm</button>
    </section>
  </div>
`;
