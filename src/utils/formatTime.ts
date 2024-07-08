export function formatTime(timeMs: number) {
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}