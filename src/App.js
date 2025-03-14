import React, { useState, useEffect } from "react";
import "./App.css";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const BASKET_WIDTH = 80;
const BALL_SIZE = 30;

function App() {
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [ballY, setBallY] = useState(0);
  const [ballX, setBallX] = useState(Math.random() * (GAME_WIDTH - BALL_SIZE));
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && basketX > 0) {
        setBasketX((prev) => prev - 20);
      }
      if (e.key === "ArrowRight" && basketX < GAME_WIDTH - BASKET_WIDTH) {
        setBasketX((prev) => prev + 20);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [basketX]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setBallY((prev) => prev + speed);
      
      if (ballY > GAME_HEIGHT - BALL_SIZE) {
        if (ballX >= basketX && ballX <= basketX + BASKET_WIDTH) {
          setScore((prev) => prev + 1);
          setSpeed((prev) => prev + 0.2);
        }
        setBallY(0);
        setBallX(Math.random() * (GAME_WIDTH - BALL_SIZE));
      }
    }, 30);

    return () => clearInterval(gameInterval);
  }, [ballY, basketX, ballX, speed]);

  return (
    <div className="game-container">
      <h1>Catch the Ball</h1>
      <div className="game-area">
        <div className="ball" style={{ top: ballY, left: ballX }}></div>
        <div className="basket" style={{ left: basketX }}></div>
      </div>
      <h2>Score: {score}</h2>
    </div>
  );
}

export default App;
