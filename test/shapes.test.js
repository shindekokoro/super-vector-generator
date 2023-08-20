const { Circle, Triangle, Square } = require('../modules/shapes')

// A testing suite for Shape
describe('Shape', () => {
    it('Test for a blue triangle', () => {
        const shape = new Triangle();
        shape.setColor("blue");
        console.log(shape);
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    })
    it('Test for a green circle', () => {
        const shape = new Circle();
        shape.setColor("green");
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="80" fill="green" />');
    })
    it('Test for a purple square', () => {
        const shape = new Square();
        shape.setColor("purple");
        expect(shape.render()).toEqual('<rect x="75" y="25" width="150" height="150" fill="purple" />');
    })
})