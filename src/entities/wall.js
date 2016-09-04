'use strict';

import { TextureLoader, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const texture = new TextureLoader().load('textures/player.png');
const pieceWidth = 20;
const pieceHeight = 20;
const pieceDepth = 20;

const wallRepr = [
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

class Wall {
  constructor(scene, x, y, z) {
    this.position = {x, y, z};
    this.speed = 5;
    this.pieces = this.createPieces(x, y, z);
    this.pieces.forEach(piece => scene.add(piece));
  }

  createPieces() {
    const x = this.position.x - (((wallRepr[0].length * pieceWidth) / 2) - pieceWidth / 2);
    const {y, z} = this.position;
    let pieces = [];

    for (let _y = 0; _y < wallRepr.length; _y++) {
      for (let _x = 0; _x < wallRepr[_y].length; _x++) {
        const hasWall = wallRepr[_y][_x] === 1;

        if (hasWall) {
          pieces.push(this.createMesh(x + (_x * pieceWidth), y + (pieceHeight * _y), z));
        }
      }
    }

    return pieces;
  }

  createMesh(x, y, z) {
    const geometry = new BoxBufferGeometry(pieceWidth, pieceHeight, pieceDepth);
    const material = new MeshBasicMaterial({map: texture});
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);

    return mesh;
  }

  update() {
    this.pieces.forEach(piece => {
      piece.position.z += this.speed;
      if (piece.position.z >= 400) {
        piece.position.z = this.position.z;
      }
    });
  }
}

export default Wall;
