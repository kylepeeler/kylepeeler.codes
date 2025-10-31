import React, { useState, useEffect, useCallback, useRef } from 'react';

// Tetris pieces (tetrominoes)
const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'bg-cyan-500'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-500'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-purple-500'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-green-500'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-red-500'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-blue-500'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-orange-500'
  }
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = '';

type Cell = string;
type Board = Cell[][];
type Position = { x: number; y: number };
type Piece = {
  shape: number[][];
  color: string;
  position: Position;
};

const createEmptyBoard = (): Board => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(EMPTY_CELL)
  );
};

const getRandomTetromino = (): { shape: number[][]; color: string } => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randomKey as keyof typeof TETROMINOES];
};

const TetrisGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const createNewPiece = useCallback((): Piece => {
    const tetromino = getRandomTetromino();
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }
    };
  }, []);

  const checkCollision = useCallback(
    (
      piece: Piece,
      board: Board,
      offset: Position = { x: 0, y: 0 }
    ): boolean => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const newX = piece.position.x + x + offset.x;
            const newY = piece.position.y + y + offset.y;

            if (
              newX < 0 ||
              newX >= BOARD_WIDTH ||
              newY >= BOARD_HEIGHT ||
              (newY >= 0 && board[newY][newX] !== EMPTY_CELL)
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    []
  );

  const rotatePiece = useCallback((piece: Piece): number[][] => {
    const rotated: number[][] = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row: number[] = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    return rotated;
  }, []);

  const mergePieceToBoard = useCallback((piece: Piece, board: Board): Board => {
    const newBoard = board.map((row) => [...row]);
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback(
    (board: Board): { board: Board; linesCleared: number } => {
      let linesCleared = 0;
      const newBoard = board.filter((row) => {
        if (row.every((cell) => cell !== EMPTY_CELL)) {
          linesCleared++;
          return false;
        }
        return true;
      });

      while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
      }

      return { board: newBoard, linesCleared };
    },
    []
  );

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    if (!checkCollision(currentPiece, board, { x: 0, y: 1 })) {
      setCurrentPiece({
        ...currentPiece,
        position: { ...currentPiece.position, y: currentPiece.position.y + 1 }
      });
    } else {
      const mergedBoard = mergePieceToBoard(currentPiece, board);
      const { board: clearedBoard, linesCleared } = clearLines(mergedBoard);
      setBoard(clearedBoard);
      setScore((prev) => prev + linesCleared * 100);

      const newPiece = createNewPiece();
      if (checkCollision(newPiece, clearedBoard)) {
        setGameOver(true);
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      } else {
        setCurrentPiece(newPiece);
      }
    }
  }, [
    currentPiece,
    board,
    gameOver,
    isPaused,
    checkCollision,
    mergePieceToBoard,
    clearLines,
    createNewPiece
  ]);

  const moveLeft = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, { x: -1, y: 0 })) {
      setCurrentPiece({
        ...currentPiece,
        position: { ...currentPiece.position, x: currentPiece.position.x - 1 }
      });
    }
  }, [currentPiece, board, gameOver, isPaused, checkCollision]);

  const moveRight = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    if (!checkCollision(currentPiece, board, { x: 1, y: 0 })) {
      setCurrentPiece({
        ...currentPiece,
        position: { ...currentPiece.position, x: currentPiece.position.x + 1 }
      });
    }
  }, [currentPiece, board, gameOver, isPaused, checkCollision]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = rotatePiece(currentPiece);
    const rotatedPiece = { ...currentPiece, shape: rotated };
    if (!checkCollision(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, board, gameOver, isPaused, rotatePiece, checkCollision]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    let dropDistance = 0;
    while (
      !checkCollision(currentPiece, board, { x: 0, y: dropDistance + 1 })
    ) {
      dropDistance++;
    }
    setCurrentPiece({
      ...currentPiece,
      position: {
        ...currentPiece.position,
        y: currentPiece.position.y + dropDistance
      }
    });
    // Immediately lock the piece
    setTimeout(moveDown, 0);
  }, [currentPiece, board, gameOver, isPaused, checkCollision, moveDown]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(createNewPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  }, [createNewPiece]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveLeft, moveRight, moveDown, rotate, hardDrop, gameOver]);

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createNewPiece());
    }
  }, [currentPiece, createNewPiece]);

  useEffect(() => {
    if (!gameOver && !isPaused && currentPiece) {
      gameLoopRef.current = setInterval(() => {
        moveDown();
      }, 1000);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameOver, isPaused, currentPiece, moveDown]);

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Score: {score}</h2>
        {isPaused && <p className="text-yellow-500 font-semibold">PAUSED</p>}
        {gameOver && (
          <p className="text-red-500 font-bold text-xl">GAME OVER!</p>
        )}
      </div>

      <div className="border-4 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-800 p-1">
        {displayBoard.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`w-6 h-6 border border-gray-800 dark:border-gray-700 ${
                  cell || 'bg-gray-900 dark:bg-gray-800'
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>← → : Move</p>
          <p>↑ : Rotate</p>
          <p>↓ : Soft Drop</p>
          <p>Space : Hard Drop</p>
          <p>P : Pause</p>
        </div>
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          {gameOver ? 'Play Again' : 'Restart Game'}
        </button>
      </div>
    </div>
  );
};

export default TetrisGame;
