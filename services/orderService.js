// ========================================
// 訂單服務
// ========================================

const { createOrder, fetchOrders, updateOrderStatus, deleteOrder } = require('../api');
const { validateOrderUser, formatDate, getDaysAgo, formatCurrency } = require('../utils');

/**
 * 建立新訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function placeOrder(userInfo) {
  // 請實作此函式
  // 提示：先用 utils validateOrderUser() 驗證使用者資料，驗證失敗時回傳 { success: false, errors: [...] }
  // 驗證通過後，呼叫 createOrder() 建立訂單
  // 回傳格式：{ success: true, data: ... } / { success: false, errors: [...] }
  const validationResult = validateOrderUser(userInfo);
  if (!validationResult.isValid) {
    return { success: false, errors: validationResult.errors };
  }
  try {
    const order = await createOrder(userInfo);
    return { success: true, data: order };
  } catch (error) {
    console.error('[系統警告] 建立新訂單失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '建立新訂單失敗' };
  }
}

/**
 * 取得所有訂單
 * @returns {Promise<Array>}
 */
async function getOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 取得訂單陣列並回傳
  try {
    const orders = await fetchOrders();
    return orders;
  } catch (error) {
    console.error('[系統警告] 取得訂單列表失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '取得訂單列表失敗' };
  }
}

/**
 * 取得未付款訂單
 * @returns {Promise<Array>}
 */
async function getUnpaidOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 後，篩選出 paid 為 false 的訂單
  try {
    const orders = await fetchOrders();
    return orders.filter(order => !order.paid);
  } catch (error) {
    console.error('[系統警告] 取得未付款訂單失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '取得未付款訂單失敗' };
  }
}

/**
 * 取得已付款訂單
 * @returns {Promise<Array>}
 */
async function getPaidOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 後，篩選出 paid 為 true 的訂單
  try {
    const orders = await fetchOrders();
    return orders.filter(order => order.paid);
  } catch (error) {
    console.error('[系統警告] 取得已付款訂單失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '取得已付款訂單失敗' };
  }
}

/**
 * 更新訂單付款狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updatePaymentStatus(orderId, isPaid) {
  // 請實作此函式
  // 提示：呼叫 updateOrderStatus()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const order = await updateOrderStatus(orderId, isPaid);
    return { success: true, data: order };
  } catch (error) {
    console.error('[系統警告] 更新訂單付款狀態失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '更新訂單付款狀態失敗' };
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function removeOrder(orderId) {
  // 請實作此函式
  // 提示：呼叫 deleteOrder()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const order = await deleteOrder(orderId);
    return { success: true, data: order };
  } catch (error) {
    console.error('[系統警告] 刪除訂單失敗:', error.message);
    return { success: false, error: error.response?.data?.message || '刪除訂單失敗' };
  }
}

/**
 * 格式化訂單資訊
 * @param {Object} order - 訂單物件
 * @returns {Object} - 格式化後的訂單
 *
 * 回傳物件包含以下欄位：
 * - id: 訂單 ID
 * - user: 使用者資料
 * - products: 商品陣列
 * - total: 總金額（原始數字）
 * - totalFormatted: 格式化金額，使用 utils formatCurrency()
 * - paid: 付款狀態（布林值）
 * - paidText: 付款狀態文字，true → '已付款'，false → '未付款'
 * - createdAt: 格式化後的建立時間，使用 utils formatDate()
 * - daysAgo: 距離今天為幾天前，使用 utils getDaysAgo()
 */
function formatOrder(order) {
  // 請實作此函式
  const { id, user, products, total, totalFormatted, paid, createdAt } = order;
  return {
    id: id,
    user: user,
    products: products,
    total: total,
    totalFormatted: formatCurrency(total),
    paid: paid,
    paidText: paid ? '已付款' : '未付款',
    createdAt: formatDate(createdAt),
    daysAgo: getDaysAgo(createdAt)
  };
}

/**
 * 顯示訂單列表
 * @param {Array} orders - 訂單陣列
 */
function displayOrders(orders) {
  if (!orders || orders.length === 0) {
    console.log('沒有訂單');
    return;
  }
  
  console.log('訂單列表：');
  console.log('========================================');
  
  orders.forEach((order, index) => {
    const { id, user, products, totalFormatted, paidText, createdAt, daysAgo } = formatOrder(order);
    console.log(`訂單 ${index + 1}`);
    console.log('----------------------------------------');
    console.log(`訂單編號：${id}`);
    console.log(`顧客姓名：${user?.name || '未知'}`);
    console.log(`聯絡電話：${user?.tel || '未知'}`);
    console.log(`寄送地址：${user?.address || '未知'}`);
    console.log(`付款方式：${user?.payment || '未知'}`);
    console.log(`訂單金額：${totalFormatted}`);
    console.log(`付款狀態：${paidText}`);
    console.log(`建立時間：${createdAt} (${daysAgo})`);
    console.log('----------------------------------------');
    console.log('商品明細：');
      const productsList = Array.isArray(products) ? products : Object.values(products || {});
      productsList.forEach(item => {
        const title = item.title || '未知產品';
        const qty = order.quantity ?? 0; // 顯示原始 quantity 欄位
        console.log(`  - ${title} x ${qty} (產品數量)`);
      });
    console.log('========================================');
  });
}

module.exports = {
  placeOrder,
  getOrders,
  getUnpaidOrders,
  getPaidOrders,
  updatePaymentStatus,
  removeOrder,
  formatOrder,
  displayOrders
};
