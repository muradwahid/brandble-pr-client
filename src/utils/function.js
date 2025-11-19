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