export const back = window.navigation.back;

export const formattedDate = (date) => { 
  const newDate = new Date(date);

  const mm = String(newDate.getMonth() + 1).padStart(2, '0');
  const dd = String(newDate.getDate()).padStart(2, '0');
  const yyyy = newDate.getFullYear();

  return `${mm}/${dd}/${yyyy}`;

}


export const formattedTime = (date) => { 
  const newDate = new Date(date);

  const hh = String(newDate.getHours()).padStart(2, '0');
  const mm = String(newDate.getMinutes()).padStart(2, '0');

  return `${hh}:${mm}`;

}

export function formatDateSmart(isoString, now = new Date()) {
  const created = new Date(isoString);
  const diffMs = now - created;
  const msPerMin = 60 * 1000;
  const msPerHour = 60 * msPerMin;
  const msPerDay = 24 * msPerHour;

  if (diffMs < msPerHour) {
    const minutes = Math.floor(diffMs / msPerMin);
    if (minutes <= 1) return "1m ago"; // or "just now"
    return `${minutes}m ago`;
  }

  if (diffMs < msPerDay) {
    const hours = Math.floor(diffMs / msPerHour);
    if (hours <= 1) return "1h ago";
    return `${hours}h ago`;
  }

  // Older than 24h: format as MM/DD/YYYY
  const mm = String(created.getUTCMonth() + 1).padStart(2, '0'); // 0-based month
  const dd = String(created.getUTCDate()).padStart(2, '0');
  const yyyy = created.getUTCFullYear();
  return `${mm}/${dd}/${yyyy}`;
}