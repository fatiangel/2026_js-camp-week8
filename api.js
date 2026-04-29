// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
    // 2. 發送 GET 請求
    const response = await axios.get(url);
    // 3. 成功時回傳資料陣列
    return response.data.products;

  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 取得產品列表失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '取得產品列表失敗')
    // 安全降級：發生錯誤時回傳空陣列，避免呼叫此函式的模組因為拿到 undefined 而發生連環報錯
    //return [];
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    // 2. 發送 GET 請求
    const response = await axios.get(url);
    // 3. 利用 ES6 解構賦值，直接把需要的變數從 response.data 裡抽出來
    const { carts, total, finalTotal } = response.data;
    // 4. 成功時回傳資料陣列
    return { carts, total, finalTotal };

  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 取得購物車失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '取得購物車列表失敗')
    // 或者安全降級：回傳固定格式的空物件
    // return { carts: [], total: 0, finalTotal: 0 };
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    // 2. 發送 POST 請求
    const response = await axios.post(url, { data: { productId, quantity } });
    // 3. 成功時回傳資料
    return response.data;
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 加入購物車失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '加入購物車失敗');
    // 或者安全降級：回傳 null，讓呼叫此函式的模組可以檢查回傳值是否為 null 來判斷是否成功
    // return null;
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    // 2. 發送 PATCH 請求
    const response = await axios.patch(url, 
      {
      data: {
        id: cartId,
        quantity
      }
    });
    // 3. 成功時回傳資料
    return response.data;
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 更新購物車商品數量失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '更新購物車商品數量失敗');
    // 或者安全降級：回傳 null，讓呼叫此函式的模組可以檢查回傳值是否為 null 來判斷是否成功
    // return null;
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
    // 2. 發送 DELETE 請求
    const response = await axios.delete(url);
    // 3. 成功時回傳更新後的購物車資料 (此時後端通常是回傳 HTTP 200)
    return response.data;
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 刪除購物車商品失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '刪除購物車商品失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '刪除購物車商品失敗'
    */
  };
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
 try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    // 2. 發送 DELETE 請求
    const response = await axios.delete(url);
    // 3. 成功清空購物車後回傳更新後的購物車資料 (此時後端通常是回傳 HTTP 200)
    return response.data;
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 清空購物車失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '清空購物車失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '清空購物車失敗'
    */
  };
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`;
    // 2. 發送 POST 請求
    const response = await axios.post(url, { data: { user: userInfo } });
    // 3. 成功建立訂單後回傳訂單資料
    return response.data;
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 建立訂單失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '建立訂單失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '建立訂單失敗'
    */
  };
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    // 2. 發送 GET 請求
    const response = await axios.get(url, {headers: { authorization: ADMIN_TOKEN }});
    // 3. 成功建立訂單後回傳訂單資料 利用解構賦值抽出 orders 陣列，並加上預設值 [] 保護前端不報錯
    const { orders } = response.data;
    return orders || [];
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 取得訂單列表失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '取得訂單列表失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '取得訂單列表失敗'
    */
  };
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
    // 2. 發送 PUT 請求
    const response = await axios.put(url, { data: {id: orderId, paid: isPaid } },
      { headers: { authorization: ADMIN_TOKEN } });
    // 3. 成功建立訂單後回傳訂單資料 利用解構賦值抽出 orders 陣列，並加上預設值 [] 保護前端不報錯
    const { orders } = response.data;
    return orders || [];
  } catch (error) {
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 更新訂單狀態失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '更新訂單狀態失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '更新訂單狀態失敗'
    */
  };
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
  // 1. 組裝符合六角 LiveJS 規範的完整 API 網址
    const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`;
    // 2. 發送 DELETE 請求
    const response = await axios.delete(url, { headers: { authorization: ADMIN_TOKEN } });
    // 3. 成功建立訂單後回傳訂單資料 利用解構賦值抽出 orders 陣列，並加上預設值 [] 保護前端不報錯
    const { orders } = response.data;
    return orders || [];
  } catch (error) {
    if (error.response?.data?.status === false) {
      return error.response.data;
    }
    // 記錄詳細錯誤，方便日後透過 Server Log 進行 Debug
    console.error('[系統警告] 刪除訂單失敗:', error.message);
    // 往上拋出客製化的錯誤，中止執行
    throw new Error(error.response?.data?.message || '刪除訂單失敗');
    /* return { 
    isSuccess: false, 
    errorCode: error.response?.status || 500,
    errorMessage: error.response?.data?.message || '刪除訂單失敗'
    */
  };
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
