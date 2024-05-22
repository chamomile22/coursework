const BASE_LINK = 'http://localhost:3001';

export const fetchAll = (link) => {
  return fetch(BASE_LINK + link).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res.json();
    }
  })
}

export const fetchArchivateDB = (link, pathToSaveDB) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({pathToSaveDB: pathToSaveDB})
  };
  
  return fetch(BASE_LINK + link, requestOptions).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res.json();
    }
  })
}