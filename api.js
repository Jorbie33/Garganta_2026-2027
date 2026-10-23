export const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

const getAccess = () => localStorage.getItem('access');
const getRefresh = () => localStorage.getItem('refresh');

export function saveTokens({ access, refresh }) {
    if (access) localStorage.setItem('access', access);
    if (refresh) localStorage.setItem('refresh', refresh);
}

export function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}


export const mediaUrl = (path) =>
    !path ? '' : path.startsWith('http') ? path : `${API_URL}${path}`;

    async function refreshAccess() {
    const refresh = getRefresh();
    if (!refresh) return false;
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return false;
    saveTokens(await res.json());
    return true;
}


export async function request(path, { method = 'GET', body, auth = true } = {}, retry = true) {
    const headers = {};
    const isForm = body instanceof FormData;
    if (body && !isForm) headers['Content-Type'] = 'application/json';
    if (auth && getAccess()) headers.Authorization = `Bearer ${getAccess()}`;

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers, 
        body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });

    if (res.status === 401 && auth && retry && (await refreshAccess())) {
        return request(path, { method, body, auth }, false);
    }
    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        err.data = data; 
        throw err;
    }
    return data;
}


export const login = async (username, password) => {
    const tokens = await request('/api/token/', { method: 'POST', body: { username, password }, auth: false });
    saveTokens(tokens);
    return tokens;
};
export const register = (data) =>
    request('/api/users/', { method: 'POST', body: data, auth: false });


export const getUsers = () => request('/api/users/', { auth: false });
export const getUser = (id) => request(`/api/users/${id}/`, { auth: false });
export const updateUser = (id, data) => request(`/api/users/${id}/`, { method: 'PATCH', body: data });
export const deleteUser = (id) => request(`/api/users/${id}/`, { method: 'DELETE' });

export const getPokemons = () => request('/api/pokemons/');
export const getPokemon = (id) => request(`/api/pokemons/${id}/`);
export const createPokemon = (formData) => request('/api/pokemons/', { method: 'POST', body: formData });
export const updatePokemon = (id, data) => request(`/api/pokemons/${id}/`, { method: 'PATCH', body: data });
export const deletePokemon = (id) => request(`/api/pokemons/${id}/`, { method: 'DELETE' });
