const styleMock = new Proxy(
  {},
  {
    get: (_, className) => className,
  }
);

export default styleMock;
