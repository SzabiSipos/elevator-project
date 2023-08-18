import "./App.css";
import { useState } from "react";

const sleep = async (milliseconds) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

const elevatorA = {
  name: "A",
  currentFloor: 0,
  destination: undefined,
  direction: "stopped",
};

const elevatorB = {
  name: "B",
  currentFloor: 6,
  destination: undefined,
  direction: "stopped",
};

const callElevator = (floor) => {
  const distanceElevatorA = Math.abs(floor - elevatorA.currentFloor);
  const distanceElevatorB = Math.abs(floor - elevatorB.currentFloor);
  let closestElevator;
  if (distanceElevatorA < distanceElevatorB) {
    closestElevator = elevatorA;
  } else if (distanceElevatorA > distanceElevatorB) {
    closestElevator = elevatorB;
  } else {
    if (elevatorB.currentFloor < elevatorA.currentFloor) {
      closestElevator = elevatorB;
    } else {
      closestElevator = elevatorA;
    }
  }
  if (closestElevator == elevatorA) {
    elevatorA.destination = floor;
    if (elevatorA.currentFloor > floor) {
      elevatorA.direction = "down";
    } else {
      elevatorA.direction = "up";
    }
    return "A";
  } else {
    elevatorB.destination = floor;
    if (elevatorB.currentFloor > floor) {
      elevatorB.direction = "down";
    } else {
      elevatorB.direction = "up";
    }
    return "B";
  }
};

const App = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [destinationFloor, setDestinationFloor] = useState(currentFloor);
  const [closestElevator, setClosestElevator] = useState();
  const [elevatorAPosition, setElevatorAPosition] = useState(0);
  const [elevatorBPosition, setElevatorBPosition] = useState(6);

  const handleCurrentFloorChange = (event) => {
    const value = event.target.value;
    setCurrentFloor(value);
    setDestinationFloor(value);
  };

  const handleCallElevatorClick = async (event) => {
    event.preventDefault();
    const elevator = callElevator(currentFloor);
    if (elevator === "A") {
      setClosestElevator(elevatorA);
      if (elevatorA.currentFloor < currentFloor) {
        for (var i = elevatorA.currentFloor; i <= currentFloor; i++) {
          setElevatorAPosition(i);
          await sleep(1000);
        }
      } else {
        for (var i = elevatorA.currentFloor; i >= currentFloor; i--) {
          setElevatorAPosition(i);
          await sleep(1000);
        }
      }
      elevatorA.currentFloor = currentFloor;
    } else {
      setClosestElevator(elevatorB);
      if (elevatorB.currentFloor < currentFloor) {
        for (var i = elevatorB.currentFloor; i <= currentFloor; i++) {
          setElevatorBPosition(i);
          await sleep(1000);
        }
      } else {
        for (var i = elevatorB.currentFloor; i >= currentFloor; i--) {
          setElevatorBPosition(i);
          await sleep(1000);
        }
      }
      elevatorB.currentFloor = destinationFloor;
    }
  };

  const moveElevator = (event) => {
    event.preventDefault();
    if (closestElevator.name == "A") {
      if (elevatorA.currentFloor < destinationFloor) {
        for (var i = elevatorA.currentFloor; i <= destinationFloor; i++) {
          setElevatorAPosition(i);
          sleep(1000);
        }
      } else {
        for (var i = elevatorA.currentFloor; i >= destinationFloor; i--) {
          setElevatorAPosition(i);
          sleep(1000);
        }
      }
      elevatorA.currentFloor = destinationFloor;
    } else {
      if (elevatorB.currentFloor < destinationFloor) {
        for (var i = elevatorB.currentFloor; i <= destinationFloor; i++) {
          setElevatorBPosition(i);
          sleep(1000);
        }
      } else {
        for (var i = elevatorB.currentFloor; i >= destinationFloor; i--) {
          setElevatorBPosition(i);
          sleep(1000);
        }
      }
      elevatorB.currentFloor = destinationFloor;
    }
  };

  return (
    <div className="App">
      <div className="floor-navigation">
        <button
          onClick={() => setDestinationFloor(destinationFloor - 1)}
          disabled={destinationFloor === 0}
        >
          &darr; Down
        </button>
        <button
          onClick={() => setDestinationFloor(Number(destinationFloor) + 1)}
          disabled={destinationFloor === 6}
        >
          &uarr; Up
        </button>
        <p>{destinationFloor}</p>
        {closestElevator != undefined && (
          <button onClick={moveElevator}>Start Elevator</button>
        )}
      </div>

      <div>
        <p>You are on the floor:</p>
        <input
          type="number"
          min={0}
          max={6}
          onChange={(event) => {
            handleCurrentFloorChange(event);
          }}
          value={currentFloor}
        />
        <button
          type="button"
          class="btn btn-danger"
          onClick={handleCallElevatorClick}
        >
          Call Elevator
        </button>

        {closestElevator != undefined && (
          <p>The elevator {closestElevator.name} is on the way</p>
        )}
      </div>

      <div>Elevator A: {elevatorAPosition}</div>

      <div>Elevator B: {elevatorBPosition}</div>
    </div>
  );
};

export default App;
