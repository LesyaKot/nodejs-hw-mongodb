const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const isTypes = ['work', 'home', 'personal'];
  if (isTypes.includes(contactType)) return contactType;
};


const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') return isFavourite;

  if (typeof isFavourite === 'string') {
    const value = isFavourite.toLowerCase();
    if (value === 'true') return true;
    if (value === 'false') return false;
  }

  return;
};


export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
