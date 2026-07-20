export const formatPrice = (price) => {
  // return `€ ${Number(price).toLocaleString("en-US").replaceAll(",", "'")},00`;
  return `${price},00`;
};

export const formattedLocation = (location) => {
  return location
    ? location.split(", ")
      .reverse()
      .join(", ")
    : "";
};

export const formatBadgeText = (text) => {
  if (!text) return "";
  const customMappings = {
    panelTruck: "Panel Van",
    fullyIntegrated: "Fully Integrated",
    alcove: "Alcove",
    automatic: "Automatic",
    manual: "Manual",
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
  };
  return customMappings[text] || text.charAt(0).toUpperCase() + text.slice(1);
};
