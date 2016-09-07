'use strict';

import { Math, TextureLoader, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const pieceWidth = 20;
const pieceHeight = 20;
const pieceDepth = 20;

class Wall {
  constructor(scene, x, y, z, gameplay) {
    this.gameplay = gameplay;
    this.scene = scene;
    this.wallRepr = this.generateRepr();
    this.depth = pieceDepth;
    this.position = {x, y, z};
    this.speed = 2;
    this.pieces = this.createPieces(x, y, z);
    this.pieces.forEach(piece => this.scene.add(piece));
    this.hit = false;
    this.holes = 0;
  }

  createPieces() {
    const x = this.position.x - (((this.wallRepr[0].length * pieceWidth) / 2) - pieceWidth / 2);
    const {y, z} = this.position;
    let pieces = [];

    for (let _y = 0; _y < this.wallRepr.length; _y++) {
      for (let _x = 0; _x < this.wallRepr[_y].length; _x++) {
        const hasWall = this.wallRepr[_y][_x] === 1;

        this.holes++;
        pieces.push(this.createMesh(x + (_x * pieceWidth), y + (pieceHeight * _y), z, hasWall));
      }
    }

    return pieces;
  }

  createMesh(x, y, z, visible) {
    const geometry = new BoxBufferGeometry(pieceWidth, pieceHeight, pieceDepth);
    const material = new MeshBasicMaterial({color: 0x0000ff});
    material.visible = visible;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);

    return mesh;
  }

  update() {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];

      piece.position.z += this.speed;
      if (piece.position.z >= 400) {
        this.restart();
        return;
      }
    }
  }

  restart() {
    this.hit = false;
    this.holes = 0;
    this.wallRepr = this.generateRepr();
    this.pieces.forEach(piece => {
      this.scene.remove(piece);
      piece.material.dispose();
    });
    this.pieces = this.createPieces();
    this.pieces.forEach(piece => this.scene.add(piece));
    if (this.hit) {
      this.position.z += pieceDepth * 4;
    }
    this.gameplay.wallRestart();
  }

  generateRepr() {
    const wallRepr = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    let holeLength = Math.randInt(1, 10);
    let holePos = {
      y: 0,
      x: Math.randInt(0, wallRepr[0].length - 1)
    };

    while (holeLength > 0) {
      wallRepr[holePos.y][holePos.x] = 0;
      holeLength--;

      let possibilities = [];
      if (wallRepr[holePos.y + 1] && wallRepr[holePos.y + 1][holePos.x] === 1) {
        possibilities.push({y: holePos.y + 1, x: holePos.x});
      }

      if (wallRepr[holePos.y - 1] && wallRepr[holePos.y - 1][holePos.x] === 1) {
        possibilities.push({y: holePos.y - 1, x: holePos.x});
      }

      if (wallRepr[holePos.y][holePos.x + 1] === 1) {
        possibilities.push({y: holePos.y, x: holePos.x + 1});
      }

      if (wallRepr[holePos.y][holePos.x - 1] === 1) {
        possibilities.push({y: holePos.y, x: holePos.x - 1});
      }

      if (possibilities.length === 0) {
        return wallRepr;
      }

      holePos = possibilities[Math.randInt(0, possibilities.length - 1)];
    }

    return wallRepr;
  }

  getZ() {
    return this.pieces[0].position.z;
  }

  getDepth() {
    return pieceDepth;
  }
}

export default Wall;
