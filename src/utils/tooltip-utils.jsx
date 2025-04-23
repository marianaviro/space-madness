export const prepareTooltip = (slide, info) => {
  console.log(info);
  if (slide.chapter == 0) {
    return {
      x: info.x,
      y: info.y,
      items: info.object.items,
      text: {
        name: info.object.name,
        status: info.object.status == "D" ? "Decayed" : "Active",
        owner: info.object.owner,
        launched: info.object.year,
      },
    };
  } else if (slide.chapter == 1) {
    return {
      x: info.x,
      y: info.y,
      items: info.object.items,
      text: {
        name: info.object.name,
        country: info.object.country,
        use: info.object.use,
        contractor: info.object.contractor,
        launched: info.object.year,
      },
    };
  } else if (slide.chapter == 2) {
    return {
      x: info.x,
      y: info.y,
      items: info.object.items,
      text: {
        name: info.object.name,
        category: info.object.category,
        role: info.object.role,
        mission: info.object.mission,
        launched: info.object.year,
      },
    };
  }
};
