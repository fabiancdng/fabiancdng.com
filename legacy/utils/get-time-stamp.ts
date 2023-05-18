/**
 * Utility to quickly create a timestamp in the desired format.
 *
 * @returns - Current timestamp in the format of YYYY-MM-DD HH:MM:SS
 */
const GetCurrentTimestamp = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  const seconds = `${now.getSeconds()}`.padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default GetCurrentTimestamp;
