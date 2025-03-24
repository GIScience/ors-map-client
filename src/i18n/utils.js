export const addComponentKeys = (localeSharedPartsMessages, translationsObj) => {
  for (let messages in localeSharedPartsMessages) {
    let translations = localeSharedPartsMessages[messages]
    for (let key in translations.default) {
      // Skip loop if the property is from prototype
      if (!Object.prototype.hasOwnProperty.call(translations.default, key)) continue
      translationsObj[key] = translations.default[key]
    }
  }
}
