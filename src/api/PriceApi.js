import axios from 'axios';

/**
 * Parses either JSON or XML response from the AstroVed Product API
 * into a standardized ProductPriceList array.
 */
export const parsePriceData = (data) => {
  if (!data) return [];

  // 1. If data is an Object or Array (JSON response)
  if (typeof data === 'object') {
    const item = Array.isArray(data) ? data[0] : (data?.value?.[0] || data);
    if (item?.ProductPriceList && Array.isArray(item.ProductPriceList)) {
      return item.ProductPriceList;
    }
  }

  // 2. If data is an XML string
  if (typeof data === 'string') {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const nodes = xmlDoc.getElementsByTagName('ProductPriceAllCurrencies');
      const list = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const code = node.getElementsByTagName('CurrencyCode')[0]?.textContent?.trim();
        const id = node.getElementsByTagName('CurrencyId')[0]?.textContent?.trim();
        const sellingPrice = node.getElementsByTagName('SellingPrice')[0]?.textContent?.trim();
        const listPrice = node.getElementsByTagName('ListPrice')[0]?.textContent?.trim();

        if (code && sellingPrice) {
          list.push({
            CurrencyCode: code.toUpperCase(),
            CurrencyId: id ? parseInt(id, 10) : undefined,
            SellingPrice: parseFloat(sellingPrice),
            ListPrice: listPrice ? parseFloat(listPrice) : parseFloat(sellingPrice),
          });
        }
      }

      if (list.length > 0) return list;
    } catch (e) {
      console.warn('XML price parsing error:', e);
    }
  }

  return [];
};

const fetchPriceList = async () => {
  try {
    const response = await axios.get(
      'https://webservice.astroved.com/api/Product/GetProdsByProdIdForAllCurrency/399/en-US/1',
      {
        headers: {
          Accept: 'application/json, text/xml, */*',
        },
      }
    );
    return parsePriceData(response.data);
  } catch (error) {
    console.error('Price list Fetching failed', error);
    throw error;
  }
};

export default fetchPriceList;
