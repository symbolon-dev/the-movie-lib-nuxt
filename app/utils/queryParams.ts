import type { LocationQuery } from 'vue-router';

export function getQueryString(value: LocationQuery[string]): string {
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value) && value.length > 0) {
        return value[0] ?? '';
    }
    return '';
}

export function getQueryNumber(value: LocationQuery[string], defaultValue = 0): number {
    const str = getQueryString(value);
    const num = Number.parseInt(str, 10);
    return Number.isNaN(num) ? defaultValue : num;
}

export function parseGenresQuery(value: unknown): number[] {
    if (!value) {
        return [];
    }
    const rawValue = Array.isArray(value) ? value.join(',') : String(value);
    if (!rawValue) {
        return [];
    }
    return rawValue
        .split(',')
        .reduce<number[]>((acc, part) => {
            const id = Number.parseInt(part, 10);
            if (!Number.isNaN(id)) {
                acc.push(id);
            }
            return acc;
        }, []);
}
