const STORAGE_KEY = "favorite-exercises";

export const getFavorites = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (id: string): string[] => {
  const current = getFavorites();
  const updated = current.includes(id)
    ? current.filter((fav) => fav !== id)
    : [...current, id];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("favoritesUpdated"));
  return updated;
};

export const isFavorite = (id: string): boolean => getFavorites().includes(id);
