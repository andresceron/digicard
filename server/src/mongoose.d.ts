declare namespace mongoose {
  namespace Types {
    class Collection<T> extends mongoose.Types.Array<T> {
      public id: (_id: string) => T | null;
    }
  }
}
