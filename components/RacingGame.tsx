import React, { useEffect, useRef, useState } from 'react';

interface Player {
  x: number;
  y: number;
  speed: number;
  angle: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  color: string;
}

interface RoadSegment {
  x: number;
  y: number;
  curve: number;
}

// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const ROAD_WIDTH = 400;
const MAX_HEALTH = 100;
const COLLISION_DAMAGE = 5;
const FORWARD_SPEED = 5;
const BACKWARD_SPEED = 3;
const TURN_SPEED = 4;
const HEALTH_REGEN = 0.1;

const RacingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string>('');

  const gameStateRef = useRef({
    player1: {
      x: CANVAS_WIDTH / 2 - 60,
      y: CANVAS_HEIGHT - 150,
      speed: 0,
      angle: 0,
      width: 30,
      height: 50,
      health: MAX_HEALTH,
      maxHealth: MAX_HEALTH,
      color: '#3b82f6'
    } as Player,
    player2: {
      x: CANVAS_WIDTH / 2 + 60,
      y: CANVAS_HEIGHT - 150,
      speed: 0,
      angle: 0,
      width: 30,
      height: 50,
      health: MAX_HEALTH,
      maxHealth: MAX_HEALTH,
      color: '#ef4444'
    } as Player,
    cameraY: 0,
    roadSegments: [] as RoadSegment[],
    keysPressed: {} as { [key: string]: boolean },
    lastCollision: 0
  });

  const resetGame = () => {
    gameStateRef.current = {
      player1: {
        x: CANVAS_WIDTH / 2 - 60,
        y: CANVAS_HEIGHT - 150,
        speed: 0,
        angle: 0,
        width: 30,
        height: 50,
        health: MAX_HEALTH,
        maxHealth: MAX_HEALTH,
        color: '#3b82f6'
      },
      player2: {
        x: CANVAS_WIDTH / 2 + 60,
        y: CANVAS_HEIGHT - 150,
        speed: 0,
        angle: 0,
        width: 30,
        height: 50,
        health: MAX_HEALTH,
        maxHealth: MAX_HEALTH,
        color: '#ef4444'
      },
      cameraY: 0,
      roadSegments: [],
      keysPressed: {},
      lastCollision: 0
    };
    setGameOver(false);
    setWinner('');
    setGameStarted(true);
  };

  const checkCollision = (p1: Player, p2: Player): boolean => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (p1.width + p2.width) / 2;
  };

  const generateRoadSegments = () => {
    const segments: RoadSegment[] = [];
    let curve = 0;
    for (let i = 0; i < 200; i++) {
      // Create sinusoidal curves
      curve = Math.sin(i * 0.03) * 150 + Math.cos(i * 0.05) * 80;
      segments.push({
        x: CANVAS_WIDTH / 2 + curve,
        y: i * 50,
        curve
      });
    }
    return segments;
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize road segments
    if (gameStateRef.current.roadSegments.length === 0) {
      gameStateRef.current.roadSegments = generateRoadSegments();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'w',
        's',
        'a',
        'd'
      ];
      if (validKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        gameStateRef.current.keysPressed[e.key.toLowerCase()] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const validKeys = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'w',
        's',
        'a',
        'd'
      ];
      if (validKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        gameStateRef.current.keysPressed[e.key.toLowerCase()] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;

      // Update Player 1 (WASD keys)
      if (state.keysPressed['w']) {
        state.player1.speed = FORWARD_SPEED;
      } else if (state.keysPressed['s']) {
        state.player1.speed = -BACKWARD_SPEED;
      } else {
        state.player1.speed *= 0.95; // Friction
      }

      if (state.keysPressed['a']) {
        state.player1.x -= TURN_SPEED;
      }
      if (state.keysPressed['d']) {
        state.player1.x += TURN_SPEED;
      }

      // Update Player 2 (Arrow keys)
      if (state.keysPressed['arrowup']) {
        state.player2.speed = FORWARD_SPEED;
      } else if (state.keysPressed['arrowdown']) {
        state.player2.speed = -BACKWARD_SPEED;
      } else {
        state.player2.speed *= 0.95; // Friction
      }

      if (state.keysPressed['arrowleft']) {
        state.player2.x -= TURN_SPEED;
      }
      if (state.keysPressed['arrowright']) {
        state.player2.x += TURN_SPEED;
      }

      // Update camera position (follow average of both players)
      const avgSpeed = (state.player1.speed + state.player2.speed) / 2;
      state.cameraY += avgSpeed;

      // Update player Y positions relative to camera
      state.player1.y -= state.player1.speed;
      state.player2.y -= state.player2.speed;

      // Keep players within bounds
      state.player1.x = Math.max(
        CANVAS_WIDTH / 2 - ROAD_WIDTH / 2 + 20,
        Math.min(CANVAS_WIDTH / 2 + ROAD_WIDTH / 2 - 20, state.player1.x)
      );
      state.player2.x = Math.max(
        CANVAS_WIDTH / 2 - ROAD_WIDTH / 2 + 20,
        Math.min(CANVAS_WIDTH / 2 + ROAD_WIDTH / 2 - 20, state.player2.x)
      );

      // Check collision between players
      if (checkCollision(state.player1, state.player2)) {
        const now = Date.now();
        if (now - state.lastCollision > 500) {
          // Damage every 500ms
          state.player1.health = Math.max(
            0,
            state.player1.health - COLLISION_DAMAGE
          );
          state.player2.health = Math.max(
            0,
            state.player2.health - COLLISION_DAMAGE
          );
          state.lastCollision = now;

          // Bounce players apart
          const dx = state.player2.x - state.player1.x;
          const dy = state.player2.y - state.player1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            state.player1.x -= (dx / dist) * 10;
            state.player2.x += (dx / dist) * 10;
          }
        }
      } else {
        // Regenerate health slowly when not colliding
        state.player1.health = Math.min(
          MAX_HEALTH,
          state.player1.health + HEALTH_REGEN
        );
        state.player2.health = Math.min(
          MAX_HEALTH,
          state.player2.health + HEALTH_REGEN
        );
      }

      // Check for game over
      if (state.player1.health <= 0) {
        setWinner('Player 2 (Red)');
        setGameOver(true);
        return;
      }
      if (state.player2.health <= 0) {
        setWinner('Player 1 (Blue)');
        setGameOver(true);
        return;
      }

      // Clear canvas
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw curved road with perspective
      const visibleSegments = 20;
      const startSegment = Math.floor(state.cameraY / 50);

      for (let i = 0; i < visibleSegments; i++) {
        const segmentIndex = startSegment + i;
        if (segmentIndex >= 0 && segmentIndex < state.roadSegments.length - 1) {
          const segment = state.roadSegments[segmentIndex];
          const nextSegment = state.roadSegments[segmentIndex + 1];

          const y = CANVAS_HEIGHT - (i * CANVAS_HEIGHT) / visibleSegments;
          const nextY =
            CANVAS_HEIGHT - ((i + 1) * CANVAS_HEIGHT) / visibleSegments;

          // Calculate perspective scaling
          const scale = 1 - i / visibleSegments;
          const roadWidth = ROAD_WIDTH * scale;

          // Draw road segment
          ctx.fillStyle = i % 2 === 0 ? '#555' : '#666';
          ctx.beginPath();
          ctx.moveTo(segment.x - roadWidth / 2, y);
          ctx.lineTo(segment.x + roadWidth / 2, y);
          ctx.lineTo(nextSegment.x + roadWidth / 2, nextY);
          ctx.lineTo(nextSegment.x - roadWidth / 2, nextY);
          ctx.closePath();
          ctx.fill();

          // Draw center line
          if (i % 3 === 0) {
            ctx.fillStyle = '#ffff00';
            const lineWidth = 10 * scale;
            ctx.fillRect(segment.x - lineWidth / 2, y, lineWidth, nextY - y);
          }

          // Draw road edges
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3 * scale;
          ctx.beginPath();
          ctx.moveTo(segment.x - roadWidth / 2, y);
          ctx.lineTo(nextSegment.x - roadWidth / 2, nextY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(segment.x + roadWidth / 2, y);
          ctx.lineTo(nextSegment.x + roadWidth / 2, nextY);
          ctx.stroke();
        }
      }

      // Draw Player 1 (Blue)
      ctx.save();
      ctx.translate(state.player1.x, state.player1.y);
      ctx.fillStyle = state.player1.color;
      ctx.fillRect(-15, -25, 30, 50);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(-10, -15, 20, 20);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-12, 15, 10, 8);
      ctx.fillRect(2, 15, 10, 8);
      ctx.restore();

      // Draw Player 2 (Red)
      ctx.save();
      ctx.translate(state.player2.x, state.player2.y);
      ctx.fillStyle = state.player2.color;
      ctx.fillRect(-15, -25, 30, 50);
      ctx.fillStyle = '#f87171';
      ctx.fillRect(-10, -15, 20, 20);
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(-12, 15, 10, 8);
      ctx.fillRect(2, 15, 10, 8);
      ctx.restore();

      // Draw health bars
      const barWidth = 200;
      const barHeight = 20;
      const barY = 20;

      // Player 1 health bar
      ctx.fillStyle = '#333';
      ctx.fillRect(20, barY, barWidth, barHeight);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(
        20,
        barY,
        (barWidth * state.player1.health) / MAX_HEALTH,
        barHeight
      );
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, barY, barWidth, barHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(`P1: ${Math.round(state.player1.health)}`, 25, barY + 15);

      // Player 2 health bar
      ctx.fillStyle = '#333';
      ctx.fillRect(CANVAS_WIDTH - barWidth - 20, barY, barWidth, barHeight);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(
        CANVAS_WIDTH - barWidth - 20,
        barY,
        (barWidth * state.player2.health) / MAX_HEALTH,
        barHeight
      );
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(CANVAS_WIDTH - barWidth - 20, barY, barWidth, barHeight);
      ctx.fillStyle = '#fff';
      ctx.fillText(
        `P2: ${Math.round(state.player2.health)}`,
        CANVAS_WIDTH - barWidth - 15,
        barY + 15
      );

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          🏎️ 2-Player Racing Game
        </h2>
        <div className="text-gray-700 dark:text-gray-300 mb-2 space-y-1">
          <p className="font-semibold">
            Player 1 (Blue): WASD keys | Player 2 (Red): Arrow keys
          </p>
          <p className="text-sm">
            W/↑ = Forward | S/↓ = Backward | A/← = Left | D/→ = Right
          </p>
          <p className="text-sm font-bold text-red-500">
            Collide with your opponent to damage them! First to 0 health loses!
          </p>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-2xl"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <button
              onClick={resetGame}
              className="px-8 py-4 text-xl font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              Start 2-Player Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 rounded-lg">
            <h3 className="text-4xl font-bold text-yellow-400 mb-4">
              🏆 {winner} Wins! 🏆
            </h3>
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
        <p>Race on the curved track and battle your opponent!</p>
        <p>
          Health regenerates slowly when not colliding. Camera follows both
          players.
        </p>
      </div>
    </div>
  );
};

export default RacingGame;
