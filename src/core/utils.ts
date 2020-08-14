export function wordSet(str: string): Set<string> {
    const set = new Set<string>();
    let tmp = "";
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode <= 32) {
            if (tmp) set.add(tmp);
        } else {
            tmp += String.fromCharCode(charCode);
        }
    }
    if (tmp) set.add(tmp);
    return set;
}
export function charSet(str: string): Set<string> {
    const set = new Set<string>();
    for (let i = 0; i < str.length; i++) {
        set.add(str.charAt(i));
    }
    return set;
}
export function arraySet(arr: string[]): Set<string> {
    const set = new Set<string>();
    for (let element of arr) {
        set.add(element);
    }
    return set;
}
