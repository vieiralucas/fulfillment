'use strict';

import { TextureLoader, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';

const texture = new TextureLoader().load('textures/player.png');
const pieceWidth = 20;
const pieceHeight = 20;
const pieceDepth = 20;
const speed = 20;
const BOTTOM = 1, TOP = -1, LEFT = 2, RIGHT = -2;
const sideByCode = {
  ArrowDown: 1,
  ArrowUp: -1,
  ArrowLeft: 2,
  ArrowRight: -2
};

class Player {
  constructor(scene, x, y, z) {
    this.scene = scene;
    this.growing = false;
    this.moving = false;
    this.pieces = [new Piece(x, y, z, BOTTOM)];

    this.pieces.forEach(piece => scene.add(piece.mesh));

    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
  }

  canGrow(side) {
    const lastPiece = this.pieces[this.pieces.length - 1];
    if (!lastPiece.canGrow(side)) {
      return false;
    }

    const growPosition = this.calculateGrowPosition(side);
    const isInside = ({x}) => x >= -90 && x <= 90;

    if (!isInside(growPosition) || this.checkIfPieceInPos(growPosition)) {
      return false;
    }

    return true;
  }

  calculateGrowPosition(side) {
    const lastPiece = this.pieces[this.pieces.length - 1];
    let {x, y, z} = lastPiece;

    if (side === LEFT) {
      x -= pieceWidth;
    } else if (side === RIGHT) {
      x += pieceWidth;
    } else if (side === TOP) {
      y += pieceHeight;
    } else if (side === BOTTOM) {
      y -= pieceHeight;
    }

    return {x, y, z};
  }

  checkIfPieceInPos({x, y, z}) {
    return this.pieces.some(piece => {
      return piece.x === x && piece.y === y && piece.z === z;
    });
  }

  grow(side) {
    this.growing = true;
    let {x, y, z} = this.calculateGrowPosition(side);

    const piece = new Piece(x, y, z, side * -1);

    this.scene.add(piece.mesh);
    this.pieces.push(piece);
  }

  canShort(side) {
    if (this.pieces.length === 1) {
      return false;
    }

    const lastPiece = this.pieces[this.pieces.length - 1];
    return lastPiece.relative === side;
  }

  short(side) {
    const lastPiece = this.pieces.pop();
    this.scene.remove(lastPiece.mesh);
  }

  move(direction) {
    this.pieces.forEach(piece => {
      piece.setX(piece.x + (speed * direction));
    });

    this.checkFloor();
  }

  keyDown({code}) {
    const growCodes = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    if (code === 'Space') {
      this.spacePress = true;
    } else if (this.spacePress && growCodes.includes(code)) {
      const side = sideByCode[code];
      if (this.canGrow(side)) {
        this.grow(side);
      } else if (this.canShort(side)) {
        this.short(side);
      }
    } else if (code === 'ArrowLeft') {
      this.move(-1);
    } else if (code === 'ArrowRight') {
      this.move(1);
    }
  }

  keyUp({code}) {
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
    } else if (code === 'Space') {
      this.spacePress = false;
    } else if (code === 'ArrowUp' || code === 'ArrowDown') {
      this.growing = false;
    }
  }

  update() {
  }

  getLeftPiece() {
    let leftPiece = this.pieces[0];

    for (let i = 0; i < this.pieces.length; i++) {
      const curr = this.pieces[i];
      if (curr.x < leftPiece.x) {
        leftPiece = curr;
      }
    }

    return leftPiece;
  }

  getRightPiece() {
    let rightPiece = this.pieces[0];

    for (let i = 0; i < this.pieces.length; i++) {
      const curr = this.pieces[i];
      if (curr.x > rightPiece.x) {
        rightPiece = curr;
      }
    }

    return rightPiece;
  }

  checkFloor() {
    let delta = 0;
    const leftLimit = -90;
    const rightLimit = 90;

    const leftPiece = this.getLeftPiece();
    const rightPiece = this.getRightPiece();

    if (leftPiece.x < leftLimit) {
      delta = leftPiece.x - leftLimit;
    } else if (rightPiece.x > rightLimit) {
      delta = rightPiece.x - rightLimit;
    }

    if (delta !== 0) {
      this.pieces.forEach(piece => {
        piece.setX(piece.x - delta);
      });
    }
  }
}

class Piece {
  // relative
  // 0 -> bottom, 1 -> top, 2 -> left, 3 -> right
  constructor(x, y, z, relative) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.mesh = this.createMesh(x, y, z);
    this.relative = relative;
  }

  setX(x) {
    this.x = x;
    this.mesh.position.x = x;
  }

  setY(y) {
    this.y = y;
    this.mesh.position.y = y;
  }

  setZ(z) {
    this.z = z;
    this.mesh.position.z = z;
  }

  createMesh(x, y, z) {
    const geometry = new BoxBufferGeometry(pieceWidth, pieceWidth, pieceDepth);
    const material = new MeshBasicMaterial({map: texture});
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);

    return mesh;
  }

  canGrow(side) {
    if (this.y === 0 && side === BOTTOM) {
      return false;
    }

    return this.relative !== side;
  }
}

export default Player;
