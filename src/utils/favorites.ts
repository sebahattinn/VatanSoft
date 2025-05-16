export const getFavorites = (): string[] => {
  const data = localStorage.getItem("favorite-exercises");
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (id: string): string[] => {
  const current = getFavorites();
  const updated = current.includes(id)
    ? current.filter((fav) => fav !== id)
    : [...current, id];

  localStorage.setItem("favorite-exercises", JSON.stringify(updated));
  return updated;
};

export const isFavorite = (id: string): boolean => getFavorites().includes(id);
