export const idGenerator = (prefix: string) => {
  const dateId = new Date();
  return `${prefix}-${dateId.toLocaleDateString()}-${dateId.getHours()}:${dateId.getMinutes()}:${dateId.getSeconds()}`; //usually this id is unique and comes from backend. for the sake of this assignment, this id is generated with some date fields
};
