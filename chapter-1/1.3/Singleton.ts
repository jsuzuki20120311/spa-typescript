class Singleton {

  private static instance: Singleton;

  private constructor() {
    // do nothing
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

}
