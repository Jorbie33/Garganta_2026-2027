import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, tokens } from "./api.js";

const Ctx = createContext(null);
export const useShop = () => useContext(Ctx);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [ready, setReady] = useState(false);

  const loadSession = useCallback(async () => {
    if (!tokens.access) { setUser(null); setCart(null); return; }
    try {
      const [me, c] = await Promise.all([api.me(), api.cart()]);
      setUser(me);
      setCart(c);
    } catch {
      tokens.clear();
      setUser(null);
      setCart(null);
    }
  }, []);

  useEffect(() => { loadSession().finally(() => setReady(true)); }, [loadSession]);

  const login = async (username, password) => {
    tokens.set(await api.login(username, password));
    await loadSession();
  };

  const register = async (form) => {
    await api.register(form);
    await login(form.username, form.password);
  };

  const logout = () => { tokens.clear(); setUser(null); setCart(null); };

  const addToCart = async (productId, qty = 1) => setCart(await api.addToCart(productId, qty));
  const setQuantity = async (itemId, qty) => setCart(await api.setQuantity(itemId, qty));
  const removeItem = async (itemId) => setCart(await api.removeItem(itemId));
  const checkout = async () => {
    const order = await api.checkout();
    setCart(await api.cart());
    return order;
  };

  const count = cart ? cart.items.reduce((n, i) => n + i.quantity, 0) : 0;

  return (
    <Ctx.Provider value={{ user, cart, count, ready, login, register, logout, addToCart, setQuantity, removeItem, checkout }}>
      {children}
    </Ctx.Provider>
  );
}
