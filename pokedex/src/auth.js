export function isLoggedIn() {
    return Boolean(localStorage.getItem('access'));
}

export function getUserId() {
    const token = localStorage.getItem('access');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return Number(payload.user_id);
    } catch {
        return null;
    }
}

export function formatErrors(err) {
    const data = err?.data;
    if (!data) {
        if (err?.status === 502) {
            return 'The API server is unavailable. Please start the backend or check the connection.';
        }
        return err?.message ?? 'Something went wrong';
    }
    if (typeof data === 'string') return data;
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.detail)) return data.detail.join('\n');
    return Object.entries(data)
        .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(' ')}`)
        .join('\n');
}
