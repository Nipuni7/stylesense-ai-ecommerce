// frontend/src/utils/recommendations.js
export const getRecommendations = (catalog, { category, query }) => {
  if (!Array.isArray(catalog)) return [];
  
  return catalog.filter(item => {
    const matchCat = category === 'all' || (item.category && item.category.toLowerCase() === category.toLowerCase());
    return matchCat;
  }).slice(0, 4);
};