/** Capitalize the first letter and lowercase the rest. */
export function capitalize(text: string): string {
    if (!text) {
        return "";
    }
    const first: string = text.charAt(0).toUpperCase();
    const rest: string = text.slice(1).toLowerCase();
    return first + rest;
}