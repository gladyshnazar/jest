/**
 * Search params are held as an array of two elements arrays where member 0 is the key and member 1 is value
 * This function extracts the values from the array and returns an object with the key as the property name and the value as the property value
 * Where a key has multiple values, the value is an array of values
 *
 * Return example:
 * {
 *   "name": ["John", "Jane"],
 *   "age": ["30"],
 *   "city": ["New York"]
 * }
 * @param {URLSearchParams} searchParams
 */
export function extractExistingParams(searchParams: URLSearchParams) {
  const entries = Array.from(searchParams.entries());
  return entries.reduce<{ [key: string]: string[] }>(
    (acc, a) => ((acc[a[0]] = acc[a[0]] || []).push(a[1]), acc),
    {}
  );
}

/**
 * Add a value to an existing parameter where the parameter can occur multiple times
 * If the value is the first value, the parameter is added
 *
 * @param {URLSearchParams} searchParams
 * @param {string} key
 * @param {string} value
 */
export function augmentExistingParams(
  searchParams: URLSearchParams,
  key: string,
  value: string
) {
  const existingParams = extractExistingParams(searchParams);
  const updatedParams = { ...existingParams };

  if (updatedParams[key]) {
    updatedParams[key].push(value);
  } else {
    updatedParams[key] = [value];
  }

  return updatedParams;
}

/**
 * Remove values from an existing parameter where the parameter can occur multiple times
 * If the value is the last value, the parameter is removed
 *
 * @param {URLSearchParams} searchParams
 * @param {string} key
 * @param {array} values
 */

export function removeExistingParamsArrayValue(
  searchParams: URLSearchParams,
  key: string,
  value: string
) {
  const existingParams = extractExistingParams(searchParams);
  if (existingParams[key]) {
    existingParams[key] = existingParams[key].filter(v => v !== value);
  }
  if (existingParams[key].length === 0) {
    delete existingParams[key];
  }
  return existingParams;
}

/**
 * Update specified params by overwriting previous ones
 *
 * @param {URLSearchParams} searchParams
 * @param {object} newParams
 */
export function updateParams(
  searchParams: URLSearchParams,
  newParams: Record<string, any>
) {
  const existingParams = extractExistingParams(searchParams);
  const updatedParams = { ...existingParams };

  for (const key in newParams) {
    updatedParams[key] = newParams[key];
  }

  return updatedParams;
}

/**
 * Delete params specified in an array
 *
 * @param {URLSearchParams} searchParams
 * @param {array} paramsToRemove
 */
export function deleteParams(
  searchParams: URLSearchParams,
  paramsToRemove: ("sort" | "priceRange" | "tags")[]
) {
  const existingParams = extractExistingParams(searchParams);
  const updatedParams = { ...existingParams };

  if (Array.isArray(paramsToRemove)) {
    paramsToRemove.forEach(param => {
      delete updatedParams[param];
    });
  } else {
    delete updatedParams[paramsToRemove];
  }

  return updatedParams;
}
