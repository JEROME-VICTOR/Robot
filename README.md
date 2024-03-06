# Getting Started with React Robot App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The application is a simulation of a toy robot moving on a square tabletop, of dimensions
  5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table and prevented from
  falling to destruction. Any movement that would result in the robot falling from the table
  will be prevented, however further valid movement commands will be allowed.
- The application can read commands in following form -
  - PLACE X,Y,F
  - MOVE
  - LEFT
  - RIGHT
  - REPORT
- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH,
  EAST or WEST.
- The origin (0,0) is be considered as the SOUTH WEST most corner.
- The first valid command to the robot should be a PLACE command, after that, any sequence of
  commands can be issued, in any order, including another PLACE command. The
  application will discard all commands in the sequence until a valid PLACE command
  has been executed.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without
  changing the position of the robot.
- REPORT will announce the X,Y and F of the robot on the ui.
