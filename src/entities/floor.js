'use strict';

import { TextureLoader, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const texture = new TextureLoader().load('textures/floor.png');
const pieceWidth = 200;
const pieceHeight = 20;
const pieceDepth = 5;

class Floor {
  constructor(scene, x, y, z) {
    this.position = {x, y, z};
    this.speed = 2;
    this.pieces = this.createPieces(x, y, z);
    this.pieces.forEach(piece => scene.add(piece));
  }

  createPieces(x, y, z) {
    let pieces = [];

    while(z <= 405) {
      pieces.push(this.createMesh(x, y, z));
      z += pieceDepth;
    }

    return pieces;
  }

  createMesh(x, y, z) {
    const geometry = new BoxBufferGeometry(pieceWidth, pieceHeight, pieceDepth);
    const material = new MeshBasicMaterial({map: texture});
    const mesh = new Mesh(geometry, material)

    mesh.position.set(x, y, z);

    return mesh;
  }

  update() {
    return;
    this.pieces.forEach(piece => {
      piece.position.z += this.speed;
      if (piece.position.z >= 400) {
        piece.position.z = this.position.z;
      }
    });
  }
}

export default Floor;
