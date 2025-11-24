const DEFAULT_ERROR_MESSAGE = 'Failed to load movies';

export const getErrorMessage = (error: Error | undefined): string =>
    error?.message ?? DEFAULT_ERROR_MESSAGE;
