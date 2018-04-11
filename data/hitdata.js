export const data = [
  {
    id: 1,
    name: "柱",
    hitData: {
      slash: 80,
      1: 30,
      2: 30,
      3: 30,
      4: 30,
      5: 30
    }
  }
];

export const find = id => data.find(d => d.id === Number(id));
