class Task implements Runnable {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(): boolean {
    let result = false;
    // do something
    return result;
  }
}
