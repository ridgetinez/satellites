import { CircleGeometry, MeshStandardMaterial, MeshBasicMaterial, Mesh, DoubleSide, SphereGeometry, Matrix4, Vector3, InstancedMesh } from "../../node_modules/three/build/three.module.js";

const circleConstructor = () => {
    const geometry = new CircleGeometry(0.005,5);
    const material = new MeshBasicMaterial({ color: 0x635fd4 });
    const mesh = new Mesh(geometry, material); // rotation, position --> 1 circle
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

const instantiateLandMeshes = (transformationMatrices) => {
    const geometry = new CircleGeometry(0.005,5);
    const material = new MeshBasicMaterial({ color: 0x635fd4 });
    const meshGroup = new InstancedMesh(geometry, material, transformationMatrices.length);
    transformationMatrices.forEach((m,i) => meshGroup.setMatrixAt(i,m));
    meshGroup.instanceMatrix.needsUpdate = true;
    return meshGroup;
}

export const createCircles = (density, r, worldMap) => {
    const nrows = 225;
    // const theta = Math.PI/2/nrows;
    const latStep = Math.PI/nrows;
    let circles = []
    let matrices = [];
    for (let latitude of rangeIterator(0, Math.PI, latStep)) {
            const rowRadius = r * Math.sin(Math.abs(latitude)); // sin(pi/2 - x) = cos(x)
            const nCircles = Math.round(2*Math.PI*rowRadius * density);
            const longStep = 2*Math.PI / nCircles;
            // console.log(`radius=${rowRadius}, nCircles=${nCircles}, longStep=${longStep*180/Math.PI}`);
            const row = [];
            for (let longitude of rangeIterator(-Math.PI, Math.PI, longStep)) {
                if (checkLandMass(latitude, longitude, worldMap)) {
                    const transformationMatrix = new Matrix4();
                    const circleMesh = circleConstructor();
                    // TODO(amartinez): For the life of me I can't yet figure out how to rotate
                    // each circle so that it's tangential to the sphere. This is good enough for now,
                    // but a principled way of computing this would be lovely!
                    const xrotationFactor = -Math.PI/2 <= longitude && longitude <= Math.PI/2 ? -1 : 1;

                    // applying transformations on matrix instead
                    transformationMatrix.makeRotationX(xrotationFactor * (Math.PI/2 - latitude));
                    transformationMatrix.makeRotationY(longitude);
                    const p = new Vector3();
                    transformationMatrix.setPosition(p.setFromSphericalCoords(r, latitude, longitude));

                    // Circle mesh already instantiated
                    circleMesh.rotation.set(xrotationFactor * (Math.PI/2 - latitude), longitude, 0);
                    circleMesh.position.setFromSphericalCoords(r, latitude, longitude);
                    row.push(circleMesh);
                    matrices.push(transformationMatrix);
                }
            }
            circles = circles.concat(row);
    }

    // instantiate the meshes
    console.log(matrices);
    console.log(`ncircles = ${circles.length}`);
    return instantiateLandMeshes(matrices);
    // return circles;
}

// TODO(amartinez): Can add property based test for this locally
// - Start with the world map
// - Create a longitude list (all longitudes at the smallest granularity)
// - Create a latitude list (all latitudes at the smallest granularity)
// - Output a PNG of all the checkLandMass(lat,long) that are true.
const checkLandMass = (lat, long, worldMap) => {
    // convert (lat,long) to (x,y) where (0,0) is the prime meridian and equator intersection
    const [ width, height ] = [ 400, 200 ];
    let x = Math.ceil(width * (long + Math.PI) / (2*Math.PI)); // long [-Math.PI,Math.PI] -> [0,2*Math.PI]
    let y = Math.ceil(height * lat / Math.PI); // lat [0,Math.PI]
    const offset = 4*(y*width + x);
    const [ r, g, b, a ] = worldMap.slice(offset, offset+4);
    return a >= 200;
}
