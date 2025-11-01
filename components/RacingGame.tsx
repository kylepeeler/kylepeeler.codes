import React, { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Game constants
const LANE_POSITIONS = [75, 135, 195, 255, 315];
const OBSTACLE_SPAWN_INTERVAL = 60;
const SPEED_INCREASE_INTERVAL = 100;
const MAX_SPEED = 8;

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameStateRef = useRef({
    player: { x: 185, y: 450, width: 30, height: 50 },
    obstacles: [] as GameObject[],
    score: 0,
    speed: 3,
    obstacleSpawnTimer: 0,
    keysPressed: {} as { [key: string]: boolean }
  });

  useEffect(() => {
    const savedHighScore = localStorage.getItem('racingGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const resetGame = () => {
    gameStateRef.current = {
      player: { x: 185, y: 450, width: 30, height: 50 },
      obstacles: [],
      score: 0,
      speed: 3,
      obstacleSpawnTimer: 0,
      keysPressed: {}
    };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const checkCollision = (obj1: GameObject, obj2: GameObject): boolean => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        gameStateRef.current.keysPressed[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        gameStateRef.current.keysPressed[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;

      // Clear canvas
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw road markings
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw road edges
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(350, 0);
      ctx.lineTo(350, canvas.height);
      ctx.stroke();

      // Update player position
      if (state.keysPressed['ArrowLeft']) {
        state.player.x = Math.max(55, state.player.x - 5);
      }
      if (state.keysPressed['ArrowRight']) {
        state.player.x = Math.min(315, state.player.x + 5);
      }

      // Draw player car
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(
        state.player.x,
        state.player.y,
        state.player.width,
        state.player.height
      );

      // Add car details
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(state.player.x + 5, state.player.y + 10, 20, 15);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(state.player.x + 3, state.player.y + 35, 8, 12);
      ctx.fillRect(state.player.x + 19, state.player.y + 35, 8, 12);

      // Spawn obstacles
      state.obstacleSpawnTimer++;
      if (state.obstacleSpawnTimer > OBSTACLE_SPAWN_INTERVAL) {
        const laneIndex = Math.floor(Math.random() * LANE_POSITIONS.length);
        state.obstacles.push({
          x: LANE_POSITIONS[laneIndex] - 15,
          y: -50,
          width: 30,
          height: 50
        });
        state.obstacleSpawnTimer = 0;
      }

      // Update and draw obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obstacle = state.obstacles[i];
        obstacle.y += state.speed;

        // Draw obstacle car
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Add obstacle car details
        ctx.fillStyle = '#f87171';
        ctx.fillRect(obstacle.x + 5, obstacle.y + 25, 20, 15);
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(obstacle.x + 3, obstacle.y + 3, 8, 12);
        ctx.fillRect(obstacle.x + 19, obstacle.y + 3, 8, 12);

        // Check collision
        if (checkCollision(state.player, obstacle)) {
          setGameOver(true);
          if (state.score > highScore) {
            setHighScore(state.score);
            localStorage.setItem('racingGameHighScore', state.score.toString());
          }
          return;
        }

        // Remove off-screen obstacles and increase score
        if (obstacle.y > canvas.height) {
          state.obstacles.splice(i, 1);
          state.score += 10;
          setScore(state.score);

          // Increase speed gradually
          if (
            state.score % SPEED_INCREASE_INTERVAL === 0 &&
            state.speed < MAX_SPEED
          ) {
            state.speed += 0.5;
          }
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver, highScore]);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          🏎️ Racing Game
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Use ← → arrow keys to dodge obstacles!
        </p>
        <div className="flex justify-center gap-8 text-lg font-semibold">
          <span className="text-gray-900 dark:text-white">
            Score: <span className="text-blue-500">{score}</span>
          </span>
          <span className="text-gray-900 dark:text-white">
            High Score: <span className="text-green-500">{highScore}</span>
          </span>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          className="border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-2xl"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <button
              onClick={resetGame}
              className="px-8 py-4 text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 rounded-lg">
            <h3 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h3>
            <p className="text-2xl text-white mb-2">Final Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-xl text-yellow-400 mb-4">
                🎉 New High Score! 🎉
              </p>
            )}
            <button
              onClick={resetGame}
              className="px-8 py-4 text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Avoid the red cars and survive as long as possible!</p>
        <p>Speed increases as your score goes up.</p>
      </div>
    </div>
  );
};

export default RacingGame;
