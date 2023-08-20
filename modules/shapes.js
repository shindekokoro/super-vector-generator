// Create the main SVG Shape container.
class Shape {
    constructor() {
        // SVG Default Values
        this.xml = `<?xml version="1.0" standalone="no"?>`;
        this.version = '1.1';
        this.xmlns = 'http://www.w3.org/2000/svg';
        this.logoWidth = 300;
        this.logoHeight = 200;
        this.openSVG = `<svg width="${this.logoWidth}" height="${this.logoHeight}" version="${this.version}" xmlns="${this.xmlns}">`
        this.closeSVG = `</svg>`

        // Variables for text placement
        this.textX = 150;
        this.textY = 125;
        this.fontSize = 60;
        this.textBaseline = 'auto';

        // Default open/close shape tags
        this.openTag = `<`
        this.closeTag = ` />`;
    }

    // Set Color Method of Shape
    setColor(color) {
        return this.color = color ? ` fill="${color.toLowerCase()}"` : ``;
    }

    // Set Text to LOGO
    setText(text, color, fontFamily) {
        if (!text) { return this.text = '' }
        this.fontFamily = fontFamily ? `font-family="${fontFamily}" ` : ``;
        this.fontFill = color ? ` fill="${color.toLowerCase()}"` : ``;
        let openTag = `<text x="${this.textX}" y="${this.textY}" font-size="${this.fontSize}" ${this.fontFamily} dominant-baseline="${this.textBaseline}" text-anchor="middle"${this.fontFill}>`
        let closeTag = `</text>`

        return this.text = `${openTag}\n\t\t${text.toUpperCase()}\n\t${closeTag}`
    }

    // Return Shape Tag for SVG Logo
    render() {
        this.shape = `${this.openTag}${this.color}${this.closeTag}`;
        return this.shape;
    }

    // Return full SVG LOGO Output
    createLogo() {
        //console.log(this);
        return `${this.xml}
${this.openSVG}
    ${this.render()}
    ${this.text}
${this.closeSVG}
`;
    }
}

class Circle extends Shape {
    constructor() {
        super();
        this.openTag = `<circle cx="150" cy="100" r="80"`;
        this.render()
    }
}

class Triangle extends Shape {
    constructor() {
        super();
        this.textY = 155;
        this.textBaseline = 'middle'
        this.openTag = `<polygon points="150, 18 244, 182 56, 182"`;
        this.render();
    }
}

// rX/rY give the rect rounded corners, if not set default to 0
class Square extends Shape {
    constructor() {
        super();
        // Square Variables
        const width = 150;
        const height = width;
        const x = (this.logoWidth - width) / 2;
        const y = (this.logoHeight - height) / 2;

        this.openTag = `<rect x="${x}" y="${y}" width="${width}" height="${height}"`;
        this.render();
    }
}

class Heart extends Shape {
    constructor() {
        super();
        this.textX = 155;
        this.openTag = `<path d="m 70.009927,84.665832 c -0.821844,-41.521784 28.297732,-61.651788 54.474713,-53.03016 20.37112,6.709088 30.0248,30.538376 30.04483,30.532735 1.52129,-0.428491 7.39016,-25.045097 33.97632,-31.448519 24.00122,-5.780804 46.29402,11.15323 50.41807,41.308303 7.8321,57.266849 -49.96206,51.202149 -83.09271,107.604239 -25.53318,-48.3869 -84.868962,-46.85431 -85.821223,-94.966598 z"`;
        this.render();
    }
}

class Star extends Shape {
    constructor() {
        super();
        this.textX = 145;
        this.textY = 120;
        this.fontSize = 40;
        this.openTag = `<polygon points="202,190 50,80 238,80 86,190 144,10"`;
        this.render();
    }
}

module.exports = { Circle, Triangle, Square, Heart, Star };
