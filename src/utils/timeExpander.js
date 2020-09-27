export const timeExpander = (time) => {
  const hrs = Math.trunc(time / 60);
  const mins = time % 60;

  let result;
  if (mins === 0) {
    result = `${hrs}h`;
  } else {
    result = `${hrs}h ${mins}min`;
  }

  return result;
};
