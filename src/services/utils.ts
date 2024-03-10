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
