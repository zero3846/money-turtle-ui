import * as state from './state.js'

export class Component extends HTMLElement {
    constructor(css) {
        super();
        this._css = css;
        this._modelId = null;
        this._updatedListener = null;
    }

    get model() {
        return state.getModel(this._modelId);
    }

    buildContent() {
        return document.createElement('div');
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `@import url("css/style.css");\n${this._css}`;
        shadow.appendChild(style);

        if (this.hasAttribute('model-id')) {
            this._modelId = this.getAttribute('model-id');
            state.setModel(this._modelId);
        }

        const content = this.buildContent();
        shadow.appendChild(content);

        if (this._modelId) {
            this._updatedListener = state.listen(this._modelId, 'updated', e => {
                const newContent = this.buildContent();
                shadow.replaceChild(newContent, content);
            });
        }
    }

    disconnectedCallback() {
        if (this._updatedListener) {
            state.unlisten(this._modelId, this._updatedListener);
            this._updatedListener = null;
        }
        this._modelId = null;
    }
}
