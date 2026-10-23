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
    if (!data) return err?.message ?? 'Something went wrong';
    if (typeof data === 'string') return data;
    return Object.entries(data)
    .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(' ')}`)
    .join('\n');
}
