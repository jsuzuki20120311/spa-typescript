import BlueDragon from './models/BlueDragon';
import Raven from './models/Raven';
import Flyable from './models/Flyable';

class Main {

  register(flyable: Flyable): void {
    flyable.fly();
  }
}

let main = new Main();
let raven = new Raven();
let blueDragon = new BlueDragon(); main.register(raven); main.register(blueDragon);
