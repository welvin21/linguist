export const generateRandomData = () =>
  Array(28)
    .fill(null)
    .map(() =>
      Array(28)
        .fill(null)
        .map(() => [Math.random()])
    );
