import { DELAY_RETRY_FETCH } from './constants';

const dollarCurrency = { style: 'currency', currency: 'ARS' };
const dollarFormat = new Intl.NumberFormat('es-ES', dollarCurrency);

export function formatDate(fullDate) {
  var year = fullDate.getUTCFullYear();
  var month = (fullDate.getUTCMonth() + 1).toString().padStart(2, '0');
  var day = fullDate.getUTCDate().toString().padStart(2, '0');
  var datePublish = day + '/' + month + '/' + year;
  return datePublish;
}

export function numToDollar(number) {
  return '$'.concat(dollarFormat.format(number).replace('ARS', ''));
}

export function numToDollarRounded(number) {
  let val = '$'.concat(
    dollarFormat.format(Math.ceil(number)).replace('ARS', '')
  );
  return val.substr(0, val.length - 4);
}

export function getEntries(entries) {
  let result = {};
  for (let entry of entries) {
    let [key, val] = entry;
    if (key.endsWith('[]')) {
      key = key.slice(0, -2);
      (result[key] || (result[key] = [])).push(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function fetchRetry(url, delay, tries, fetchOptions = {}) {
  function onError(err) {
    let triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(delay).then(() =>
      fetchRetry(url, delay, triesLeft, fetchOptions)
    );
  }
  return fetch(url, fetchOptions).catch(onError);
}

/**
 * This function will retry the call as much times as it was specified in the `tries` parameter.
 * @param  query Fetch function to run with retry
 * @param  data Parameters for the fetch function
 * @param  tries Attempts to retry running the function received.
 * @returns 
 */
export function retryQuery(query, data, tries) {
  function onError(err) {
    console.log('Retrying fetch...');
    let triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(DELAY_RETRY_FETCH).then(() => retryQuery(query, data, triesLeft));
  }
  return query(data).catch(onError);
}
