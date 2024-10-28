# Nigerian Flag Animation with Three.js

This project is a 3D animation of the Nigerian flag, created using [Three.js](https://threejs.org/). The flag waves naturally, with the left edge fixed as if it's attached to a flagpole. The animation uses custom shaders to produce the waving effect.

## Features

- **Realistic Waving Effect**: The flag waves smoothly while the left edge remains fixed.
- **Custom Shaders**: Vertex and fragment shaders are used for the waving effect.
- **Responsive Design**: The flag resizes automatically to fit different screen sizes.

## Live Demo

Check out the live demo [here](https://chriskript.github.io/waving-nigeria-flag/).

## Installation

To run this project locally:

1. Clone the repository:

```bash
git clone https://github.com/your-username/nigerian-flag-threejs.git
cd nigerian-flag-threejs
```

2. Simply open index.html in your browser to view the animation.

## Folder Structure

📁Nigerian-flag-threejs
├── app.js           # JavaScript for Three.js animation
├── index.html       # Main HTML file
├── nigeria-flag.png # Nigerian flag texture
└── style.css        # Custom styles

## Usage

This project uses a Nigerian flag texture (nigeria-flag.png) and animates it using Three.js. The left edge is fixed, simulating attachment to a pole, while the rest of the flag waves dynamically.

You can modify the wave parameters in app.js to adjust the size, shape, and speed of the waving effect.

