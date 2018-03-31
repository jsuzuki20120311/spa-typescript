import Flyable from './Flyable';

class Raven implements Flyable {

  fly(): void {
    console.log('fly');
  }
}

export default Raven;
