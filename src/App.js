import React, { useState } from 'react';
import './App.scss';

function App() {
  const [xValue,setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [directionValue, setDirectionValue] = useState('NORTH');
  const [position, setPosition] = useState({ x: null, y: null, direction: '' });
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  const placeRobot = (x, y, direction) => {
    if(error) { setError('') }
    if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
      setPosition({ x, y, direction });
    } else {
      setError('Invalid Placement')
    }
    setReport('');
  };

  const moveRobot = () => {
    if(error) { setError('') }
    setReport('');
    const { x, y, direction } = position;
    switch (direction) {
      case 'NORTH':
        if (y < 4) {
          setPosition({ x, y: y + 1, direction });
        } else {
          setError('Invalid Movement')
        }
        break;
      case 'SOUTH':
        if (y > 0) {
          setPosition({ x, y: y - 1, direction });
        } else {
          setError('Invalid Movement')
        }
        break;
      case 'EAST':
        if (x < 4) {
          setPosition({ x: x + 1, y, direction });
        } else {
          setError('Invalid Movement')
        }
        break;
      case 'WEST':
        if (x > 0) {
          setPosition({ x: x - 1, y, direction });
        } else {
          setError('Invalid Movement')
        }
        break;
      default:
        break;
    }
  };

  const rotateRobot = (direction) => {
    if(error) { setError('') }
    setReport('');
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentDirectionIndex = directions.indexOf(position.direction);
    let newDirectionIndex;
    if (direction === 'LEFT') {
      newDirectionIndex = (currentDirectionIndex + 3) % 4;
    } else if (direction === 'RIGHT') {
      newDirectionIndex = (currentDirectionIndex + 1) % 4;
    }
    setPosition({ ...position, direction: directions[newDirectionIndex] });
  };

  const reportPosition = () => {
    if(error) { setError('') }
    const { x, y, direction } = position;
    setReport(`Current position: X=${x}, Y=${y}, Direction=${direction}`);
  };

  const handleXValue = (e) => {
    const value = e.target.value
    if(!(value >= 0 && value <= 4)) {
      return
    }
    setXValue(Number(value))
  }

  const handleYValue = (e) => {
    const value = e.target.value
    if(!(value >= 0 && value <= 4)) {
      return
    }
    setYValue(Number(value))
  }

  return (
    <div className="toy-robot-container">
      <div className="table-robot-section">
        {position.x !== null && position.y !== null && position.direction !== "" && (
          <div
          className="robot"
            style={{
              top: `${50 * (4 - position.y)}px`,
              left: `${50 * position.x}px`,
            }}
          >
            <span style={{ fontSize: '20px' }}>
              {position.direction === 'NORTH' && '↑'}
              {position.direction === 'SOUTH' && '↓'}
              {position.direction === 'EAST' && '→'}
              {position.direction === 'WEST' && '←'}
            </span>
          </div>
        )}
      </div>
      <div className="controls-container">
        <div className="place-control">
          <label>X: </label><input type="number" min="0" max="4" value={xValue} onChange={(e) => handleXValue(e) } />
          <label>Y: </label><input type="number"  min="0" max="4" value={yValue} onChange={(e) => handleYValue(e)}/>
          <label>Direction: </label>
          <select value={directionValue} onChange={(e) => setDirectionValue(e.target.value)}>
            <option value="NORTH">NORTH</option>
            <option value="SOUTH">SOUTH</option>
            <option value="EAST">EAST</option>
            <option value="WEST">WEST</option>
          </select>
          <button onClick={() => placeRobot(xValue, yValue, directionValue)}>PLACE</button>
        </div>
        <button className={(position.x == null && position.y == null && position.direction == "") ? 'disabled' : ''} onClick={() => moveRobot()}>MOVE</button>
        <button className={(position.x == null && position.y == null && position.direction == "") ? 'disabled' : ''} onClick={() => rotateRobot('LEFT')}>LEFT</button>
        <button className={(position.x == null && position.y == null && position.direction == "") ? 'disabled' : ''} onClick={() => rotateRobot('RIGHT')}>RIGHT</button>
        <button className={(position.x == null && position.y == null && position.direction == "") ? 'disabled' : ''} onClick={() => reportPosition()}>REPORT</button>
      </div>
      <div className="error-text">
        {error}
      </div>
      <div className="report">{report}</div>
    </div>
  );
}

export default App;
