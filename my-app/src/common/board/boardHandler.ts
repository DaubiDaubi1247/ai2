import React from "react";
import style from "./style/field.module.css"

export default class ChessBoardHandler {

    public static getBoard(N: number, queensArr : Array<Number>): React.ReactNode[] {

        const chessboardCells = [];
        for (let row = 0; row < N; row++) {
            
            const queenCollumn = this.getQueenCollumn(row, queensArr);

            for (let col = 0; col < N; col++) {
                // Определяем цвет клетки (черный или белый)
                let cellColor = (row + col) % 2 === 0 ? style.black : style.grey
                cellColor += " " + style.field + " ";

                cellColor += col === queenCollumn ? style.show_circle : "";

                // Создаем JSX элемент для клетки и добавляем его в массив
                chessboardCells.push(
                    React.createElement("div", { key: row - col, className: cellColor })
                );
            }
        }

        debugger

        return chessboardCells;
    }

    // private static createChessField(index: number): React.ReactNode {
    //     let classNames = index % 2 === 0 ? style.black : "";
    //     classNames += " " + style.field;

    //     return React.createElement("div", { key: index, className: classNames });
    // }

    private static getQueenCollumn(rowIndex : number, queensArr : Array<Number>) {
        return queensArr.indexOf(rowIndex + 1);
    }

}