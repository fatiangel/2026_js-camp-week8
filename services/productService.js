// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require('../api');
const { getDiscountRate, getAllCategories, formatCurrency } = require('../utils');

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品陣列
  // 回傳格式：{ products, count: 產品數量 }
  try {
    const products = await fetchProducts();
    return { products, count: products.length };
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 取得所有產品失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '取得所有產品失敗');
    // 安全降級：發生錯誤時回傳空陣列，避免呼叫此函式的模組因為拿到 undefined 而發生連環報錯
    // return { products: [], count: 0 };
  }
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，篩選出符合 category 的產品
  // 回傳格式：篩選後的產品陣列
  try {
    const products = await fetchProducts();
    return products.filter(product => product.category === category);
  } catch (error) {
    console.error('[系統警告] 根據分類篩選產品失敗:', error.message);
    throw new Error(error.response?.data?.message || '根據分類篩選產品失敗');
  }
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，找出 id 符合的產品
  // 若找不到，回傳 null
  try {
    const products = await fetchProducts();
    const product = products.find(product => product.id === productId);
    return product || null;
  } catch (error) {
    console.error('[系統警告] 根據 ID 取得單一產品失敗:', error.message);
    throw new Error(error.response?.data?.message || '根據 ID 取得單一產品失敗');
  }
}

/**
 * 取得所有分類（不重複）
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，代入到 utils getAllCategories()
  try {
    const products = await fetchProducts();
    return getAllCategories(products);
  } catch (error) {
    console.error('[系統警告] 取得所有分類失敗:', error.message);
    throw new Error(error.response?.data?.message || '取得所有分類失敗');
  }
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  // 提示：使用 forEach 遍歷產品陣列，依序輸出每筆產品資訊
  // 會使用到 utils getDiscountRate() 計算折扣率，以及 utils formatCurrency() 格式化金額
  //
  // 預期輸出格式：
  // 產品列表：
  // ----------------------------------------
  // 1. 產品名稱
  //    分類：xxx
  //    原價：NT$ 1,000
  //    售價：NT$ 800 (8折)
  // ----------------------------------------
  try {
    console.log('產品列表：');
    console.log('----------------------------------------');
    products.forEach((product, index) => {
      const { price, origin_price, title, category } = product;
      const discountRate = getDiscountRate(product);
      console.log(`${index + 1}. ${title}`);
      console.log(`    分類：${category}`);
      console.log(`    原價：${formatCurrency(origin_price)}`);
      console.log(`    售價：${formatCurrency(price)} (${discountRate})`);
      console.log('----------------------------------------');
    });
  } catch (error) {
    console.error('[系統警告] 顯示產品列表失敗:', error.message);
    throw new Error(error.response?.data?.message || '顯示產品列表失敗');
  }
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts
};
