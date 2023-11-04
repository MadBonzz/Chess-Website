import { NONAME } from 'dns';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import React from 'react';
import { act } from 'react-dom/test-utils';

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string
    x: number
    y: number
}

const pieces: Piece[] = []

for(let p = 0; p < 2; p++){
    const type = (p == 0) ? "d" : "l";
    const y = (p == 0) ? 7 : 0;

    pieces.push({image: `images/Chess_r${type}t60`, x:0, y})
    pieces.push({image: `images/Chess_r${type}t60`, x:7, y})
    pieces.push({image: `images/Chess_n${type}t60`, x:1, y})
    pieces.push({image: `images/Chess_n${type}t60`, x:6, y})
    pieces.push({image: `images/Chess_b${type}t60`, x:2, y})
    pieces.push({image: `images/Chess_b${type}t60`, x:5, y})
    pieces.push({image: `images/Chess_q${type}t60`, x:3, y})
    pieces.push({image: `images/Chess_k${type}t60`, x:4, y})
}

for (let i = 0; i < 8; i++){
    pieces.push({image: "images/Chess_pdt60", x:i, y:6})
}

for (let i = 0; i < 8; i++){
    pieces.push({image: "images/Chess_plt60", x:i, y:1})
}

let activePiece: HTMLElement | null = null

function grabPiece(e:React.MouseEvent) {
    const element = e.target as HTMLElement

    if(element.classList.contains("chess-piece")){
        const x = e.clientX - 44
        const y = e.clientY - 44
        element.style.left = `${x}px`
        element.style.top = `${y}px`
        element.style.position = "absolute"
        activePiece = element;
    }

}

function movePiece(e: React.MouseEvent) {
    if(activePiece) {
        const x = e.clientX - 44
        const y = e.clientY - 44
        activePiece.style.left = `${x}px`
        activePiece.style.top = `${y}px`
        activePiece.style.position = "absolute"
    }
    
}

function dropPiece(e: React.MouseEvent) {
    if(activePiece) {
        activePiece = null
    }
}

export default function Chessboard() {
    let board = []

    for(let j = verticalAxis.length - 1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){
            const number = j + i + 2;

            let image = "Shourya";

            pieces.forEach(p => {
                if(p.x === i && p.y === j) {
                    image = p.image
                }
            });

            board.push(<Tile key={`${j}, ${i}`} image={image} number = {number}/>);
        }
    }
    return <div 
        onMouseMove={e => movePiece(e)} 
        onMouseDown={e => grabPiece(e)} 
        onMouseUp={e => dropPiece(e)}
        id = "chessboard">
     {board}
    </div>
}