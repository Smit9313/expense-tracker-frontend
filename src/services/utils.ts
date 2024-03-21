export function getToken() {
  return localStorage.getItem("token");
}

export function isDefined(value: any) {
  return value !== null && value !== undefined;
}

// Access a specific cookie value
export function getCookie(name: string) {
  const cookieArr = document.cookie.split(";");
  console.log(cookieArr);
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (cookiePair[0].trim() === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

// export function formatISODate(dateString: string) {
//   const dateObj = new Date(dateString);
//   const options: any = { year: 'numeric', month: 'short', day: '2-digit' };
//   return dateObj.toLocaleDateString('en-IN', options);
// }

export function formatISODate(dateString: string) {
  const dateObj = new Date(dateString);
  
  // Define Indian month names
  const indianMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = dateObj.getDate();
  const month = indianMonthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
}
