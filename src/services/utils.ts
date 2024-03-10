
export function getToken(){
	return localStorage.getItem("token")
}

export function isDefined(value: any) {
	return value !== null && value !== undefined;
}
  