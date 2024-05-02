import { css } from "@microsoft/fast-element";

export default css`
    #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.75)
        z-index: 10;
        opacity: 0;
        pointer-events: none;
    }

    #modal {
        position: fixed;
        top: 15vh;
        left: 25%;
        width: 50%;
        z-index: 100;
        background: white;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0,0,0, 0.26);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: none;
        opacity: 0;
    }

    :host([opened]) #backdrop,
    :host([opened]) #modal
    {
        opacity: 1;
        pointer-events: all;
    }

    header, #main {
        padding: 1rem;
    }

    header h1 {
        font-size: 1.25rem;
    }

    #actions {
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    #actions button {
        margin: 0 0 0 0.75rem;
    }
`;
