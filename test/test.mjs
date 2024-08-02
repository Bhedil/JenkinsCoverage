import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

describe('HTML and CSS Tests', () => {
    let dom;
    let document;

    before(() => {
        const html = fs.readFileSync(path.resolve('index.html'), 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;

        const css = fs.readFileSync(path.resolve('bootstrap.min.css'), 'utf8');
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    });

    it('should have a container div', () => {
        const container = document.querySelector('.container');
        expect(container).to.not.be.null;
    });

    it('should have a title with correct styles', () => {
        const title = document.querySelector('.title');
        expect(title).to.not.be.null;
        expect(title.textContent).to.equal('Hello, World!');

        const computedStyle = dom.window.getComputedStyle(title);
        expect(computedStyle.color).to.equal('red');
        expect(computedStyle.fontSize).to.equal('2em');
    });
});
