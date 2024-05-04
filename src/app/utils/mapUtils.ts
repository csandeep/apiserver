/**
 * deepMap - Recursively map an object to a Map
 * @param obj Object
 * @returns Map<string, any>
 */
export function deepMap(obj: Object): Map<string, any> {
    return new Map(
        Object.entries(obj).map(([key, value]) => [
            key,
            value && typeof value === 'object' ? deepMap(value) : value,
        ]),
    );
}
