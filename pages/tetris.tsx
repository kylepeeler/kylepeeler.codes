import Container from '../components/Container';
import TetrisGame from '../components/TetrisGame';

const Tetris = () => (
  <Container
    title="Tetris"
    subtitle="Classic Tetris game - use arrow keys to play!"
  >
    <TetrisGame />
  </Container>
);

export default Tetris;
