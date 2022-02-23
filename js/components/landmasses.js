import { CircleGeometry, MeshStandardMaterial, Mesh, DoubleSide, Spherical } from "../../node_modules/three/build/three.module.js";

// TODO: Compare Instanced Mesh creation and mesh per circle creation

const circleConstructor = () => {
    const geometry = new CircleGeometry(0.01,32);
    const material = new MeshStandardMaterial({ color: 0xeabdef });
    const mesh = new Mesh(geometry, material)
    mesh.material.side = DoubleSide;
    return mesh;
}

const circleRow = (density, baseRadius, r, phi) => {
    const circumference = 2*Math.PI*r;
    const nCircles = Math.floor(circumference * density);
    const theta = 2*Math.PI / nCircles;

    const circles = [...Array(nCircles).keys()]
        .map(circleConstructor());
    circles.forEach((circleMesh, index) => {
        const t = theta * index;
        // find normal to rotate x
        circleMesh.rotation.set(0, t, 0);
        circleMesh.position.setFromSphericalCoords(baseRadius, phi, t);
    });
    return circles;
}

function *rangeIterator(start, end, step) {
    for (let curr = start; curr <= end; curr += step) {
        yield curr;
    }
}

export const createCircles = (density, r) => {
    const nrows = 25;
    // const theta = Math.PI/2/nrows;
    const latStep = Math.PI/nrows;
    let circles = []
    for (let latitude of rangeIterator(0, Math.PI, latStep)) {
            const rowRadius = r * Math.sin(Math.abs(latitude)); // sin(pi/2 - x) = cos(x)
            const nCircles = Math.ceil(2*Math.PI*rowRadius * density);
            const longStep = 2*Math.PI / nCircles;
            console.log(`radius=${rowRadius}, nCircles=${nCircles}, longStep=${longStep*180/Math.PI}`);
            const row = [];
            for (let longitude of rangeIterator(-Math.PI, Math.PI, longStep)) {
                console.log("things");
                const circleMesh = circleConstructor();
                circleMesh.rotation.set(0, longitude, 0);
                circleMesh.position.setFromSphericalCoords(r, latitude, longitude);
                row.push(circleMesh);
            }
            console.log(row);
            console.log(circles);
            circles = circles.concat(row);
    }
    return circles;
}
