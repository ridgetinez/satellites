import { CircleGeometry, MeshStandardMaterial, MeshBasicMaterial, Mesh, DoubleSide, SphereGeometry } from "../../node_modules/three/build/three.module.js";

// TODO: Compare Instanced Mesh creation and mesh per circle creation

const circleConstructor = () => {
    const geometry = new CircleGeometry(0.005,5);
    const material = new MeshBasicMaterial({ color: 0x635fd4 });
    const mesh = new Mesh(geometry, material);
    mesh.material.side = DoubleSide;
    return mesh;
}

function *rangeIterator(start, end, step) {
    for (let curr = start; curr <= end; curr += step) {
        yield curr;
    }
}

export const createOceanWorld = (r) => {
    const geometry = new SphereGeometry(r, 128);
    const material = new MeshStandardMaterial({ color: 0x2D338E });
    return new Mesh(geometry, material);
}

export const createCircles = (density, r) => {
    const nrows = 200;
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
                // TODO(amartinez): For the life of me I can't yet figure out how to rotate
                // each circle so that it's tangential to the sphere. This is good enough for now,
                // but a principled way of computing this would be lovely!
                const xrotationFactor = -Math.PI/2 <= longitude && longitude <= Math.PI/2 ? -1 : 1;
                circleMesh.rotation.set(xrotationFactor * (Math.PI/2 - latitude), longitude, 0);
                circleMesh.position.setFromSphericalCoords(r, latitude, longitude);
                row.push(circleMesh);
            }
            console.log(row);
            console.log(circles);
            circles = circles.concat(row);
    }
    return circles;
}
