// 飲料、速食、素食資料庫
const SHOP_DATA = [
    {
        name: '50嵐',
        items: [
            { name: '波霸奶茶', price: 55 },
            { name: '四季春+珍波椰', price: 40 },
            { name: '紅茶拿鐵', price: 60 },
            { name: '檸檬綠茶', price: 45 },
            { name: '紅茶', price: 30 },
            { name: '綠茶', price: 30 },
            { name: '奶茶', price: 35 }
        ]
    },
    {
        name: 'CoCo都可',
        items: [
            { name: '珍珠奶茶', price: 50 },
            { name: '鮮橙綠', price: 55 },
            { name: '百香雙響炮', price: 55 },
            { name: '青茶拿鐵', price: 55 },
            { name: '紅茶', price: 30 },
            { name: '綠茶', price: 30 },
            { name: '奶茶', price: 35 }
        ]
    },
    {
        name: '麥當勞',
        items: [
            { name: '大麥克', price: 80 },
            { name: '麥香雞', price: 65 },
            { name: '薯條(大)', price: 55 },
            { name: '玉米湯', price: 35 },
            { name: '麥克雞塊(6塊)', price: 65 },
            { name: '麥脆雞(2塊)', price: 95 }
        ]
    },
    {
        name: '摩斯漢堡',
        items: [
            { name: '摩斯漢堡', price: 70 },
            { name: '燒肉珍珠堡', price: 75 },
            { name: '薯條', price: 50 },
            { name: '冰紅茶', price: 35 },
            { name: '黃金雞塊(5塊)', price: 65 },
            { name: '摩斯雞翅(2支)', price: 55 }
        ]
    },
    {
        name: '素食店',
        items: [
            { name: '素香鬆飯糰', price: 35 },
            { name: '蔬菜湯', price: 40 },
            { name: '豆漿', price: 25 },
            { name: '素食漢堡', price: 60 },
            { name: '紅茶', price: 25 },
            { name: '奶茶', price: 30 }
        ]
    }
];

// 訂單資料
let orderList = [];

// 初始化訂單列表
function initOrderList() {
    const savedOrder = localStorage.getItem('orderList');
    if (savedOrder) {
        orderList = JSON.parse(savedOrder);
    }
    renderOrderList();
}

// DOM 元素
const shopSelect = document.getElementById('shop');
const itemSelect = document.getElementById('item');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const iceLevelInput = document.getElementById('ice-level');
const sugarLevelInput = document.getElementById('sugar-level');
const iceLevelText = document.getElementById('ice-level-text');
const sugarLevelText = document.getElementById('sugar-level-text');
const noteInput = document.getElementById('note');
const quantityInput = document.getElementById('quantity');
const addBtn = document.getElementById('add-btn');
const randomBtn = document.getElementById('random-btn');
const copyOrderBtn = document.getElementById('copy-order-btn');
const orderUl = document.getElementById('order-list');
const orderSummary = document.getElementById('order-summary');
const clearBtn = document.getElementById('clear-btn');

// 複製訂單到剪貼簿
async function copyOrderToClipboard() {
    if (orderList.length === 0) {
        showStatus('訂單是空的');
        return;
    }

    // 按店家分組訂單
    const ordersByShop = {};
    orderList.forEach((o) => {
        if (!ordersByShop[o.shop]) {
            ordersByShop[o.shop] = [];
        }
        ordersByShop[o.shop].push(o);
    });

    // 構建訂單文字
    let orderText = '';
    let total = 0;
    let totalQty = 0;

    Object.entries(ordersByShop).forEach(([shop, items]) => {
        orderText += `【${shop}】\n`;
        
        // 合併相同品項的訂單
        const combinedItems = [];
        
        items.forEach(item => {
            // 檢查是否已存在相同的品項（只比較品項名稱）
            const existingItem = combinedItems.find(i => i.item === item.item);
            
            if (existingItem) {
                // 如果存在相同的品項，合併數量
                existingItem.qty += item.qty;
            } else {
                // 否則添加新項目
                combinedItems.push({
                    item: item.item,
                    name: item.name,
                    iceLevel: item.iceLevel,
                    sugarLevel: item.sugarLevel,
                    note: item.note,
                    price: item.price,
                    qty: item.qty
                });
            }
        });
        
        // 按照品項名稱排序
        const sortedItems = [...combinedItems].sort((a, b) => 
            a.item.localeCompare(b.item, 'zh-TW')
        );
        
        // 輸出合併後的訂單
        sortedItems.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            totalQty += item.qty;
            
            // 構建品項顯示：品項[訂購人] 或 品項
            let itemDisplay = item.item;
            if (item.name && item.name !== '未命名') {
                itemDisplay += `[${item.name}]`;
            }

            orderText += `- ${itemDisplay} x${item.qty}`;
            
            // 添加冰塊、甜度和備註
            const details = [];
            if (item.iceLevel !== undefined && item.iceLevel !== 0) {
                details.push(`${item.iceLevel}分冰`);
            }
            if (item.sugarLevel !== undefined && item.sugarLevel !== 10) {
                details.push(`${item.sugarLevel}分糖`);
            }
            if (item.note && item.note !== '標準') {
                details.push(item.note);
            }
            
            if (details.length > 0) {
                orderText += ` (${details.join('、')})`;
            }
            
            orderText += ` $${itemTotal}\n`;
        });
        
        orderText += '\n';
    });
    
    orderText += `\n總金額：$${total}　共 ${totalQty} 杯/份`;

    try {
        await navigator.clipboard.writeText(orderText);
        showStatus('訂單已複製到剪貼簿');
    } catch (err) {
        console.error('複製失敗:', err);
        showStatus('複製失敗，請手動複製');
    }
}

// 事件監聽
copyOrderBtn.addEventListener('click', copyOrderToClipboard);
clearBtn.addEventListener('click', () => {
    if (orderList.length === 0) {
        showStatus('訂單已經是空的了');
        return;
    }
    if (confirm('確定要清空所有訂單嗎？')) {
        orderList = [];
        saveOrderToLocal();
        renderOrderList();
        showStatus('已清空訂單');
    }
});

// 初始化
initShopSelect();
initItemSelect();
initOrderList();

// 更新冰塊顯示文本
function updateIceText(value) {
    const iceLevels = ['去冰', '微冰', '少冰', '正常冰', '多冰'];
    const index = Math.min(Math.floor(value / 2), iceLevels.length - 1);
    iceLevelText.textContent = value === '0' ? '去冰' : `${value}分冰`;
}

// 更新甜度顯示文本
function updateSugarText(value) {
    const sugarLevels = ['無糖', '微糖', '半糖', '少糖', '正常甜'];
    const index = Math.min(Math.floor((value * 4) / 10), sugarLevels.length - 1);
    sugarLevelText.textContent = value === '0' ? '無糖' : value === '10' ? '全糖' : `${value}分糖`;
}

// 初始化冰塊和甜度顯示
updateIceText(iceLevelInput.value);
updateSugarText(sugarLevelInput.value);

// 監聽冰塊和甜度變化
iceLevelInput.addEventListener('input', (e) => updateIceText(e.target.value));
sugarLevelInput.addEventListener('input', (e) => updateSugarText(e.target.value));

shopSelect.addEventListener('change', () => {
    initItemSelect();
});

addBtn.addEventListener('click', addOrder);

randomBtn.addEventListener('click', randomAdd);

clearBtn.addEventListener('click', () => {
    if (confirm('確定要清空所有訂單嗎？')) {
        orderList = [];
        saveOrderToLocal();
        renderOrderList();
    }
});

function initShopSelect() {
    shopSelect.innerHTML = '';
    SHOP_DATA.forEach((shop, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = shop.name;
        shopSelect.appendChild(opt);
    });
}

function initItemSelect() {
    const shopIdx = shopSelect.value;
    itemSelect.innerHTML = '';
    SHOP_DATA[shopIdx].items.forEach((item, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${item.name} ($${item.price})`;
        itemSelect.appendChild(opt);
    });
}

function addOrder() {
    const shopIdx = shopSelect.value;
    const itemIdx = itemSelect.value;
    const name = (nameInput.value.trim() || '未命名').replace(/\s+/g, ''); // 移除所有空白字符
    const price = parseInt(priceInput.value) || 0;
    const iceLevel = parseInt(iceLevelInput.value);
    const sugarLevel = parseInt(sugarLevelInput.value);
    const note = noteInput.value.trim();
    const quantity = parseInt(quantityInput.value) || 1;

    if (!shopIdx || !itemIdx || isNaN(quantity) || quantity <= 0) {
        //showTip('請填寫完整的訂購資訊');
        return;
    }
    
    const shop = SHOP_DATA[shopIdx];
    const item = shop.items[itemIdx];
    
    // 使用自訂價格或預設價格
    const finalPrice = price > 0 ? price : item.price;
    
    // 構建備註，包含冰塊和甜度資訊
    let finalNote = [];
    if (iceLevel !== 0) finalNote.push(`${iceLevel}分冰`);
    if (sugarLevel !== 10) finalNote.push(`${sugarLevel}分糖`);
    if (note) finalNote.push(note);
    
    orderList.push({
        shop: shop.name,
        item: item.name,
        name: name,
        price: finalPrice,
        iceLevel: iceLevel,
        sugarLevel: sugarLevel,
        note: finalNote.join('、') || '標準',
        qty: quantity,
        timestamp: Date.now()
    });
    
    // 儲存到本地
    saveOrderToLocal();
    
    // 重新渲染訂單列表
    renderOrderList();
    
    // 清空表單
    nameInput.value = '';
    priceInput.value = '';
    noteInput.value = '';
    quantityInput.value = '1';
    
    // 顯示提示
    showStatus('已加入訂單！');
}

function randomAdd() {
    const shopIdx = shopSelect.value;
    const shop = SHOP_DATA[shopIdx];
    const quantity = parseInt(quantityInput.value);
    const qty = Math.max(1, parseInt(quantityInput.value) || 1);
    let randomItems = [];
    // 隨機選擇不同品項
    let indices = Array.from({length: shop.items.length}, (_, i) => i);
    for (let i = 0; i < qty; i++) {
        if (indices.length === 0) indices = Array.from({length: shop.items.length}, (_, i) => i);
        const rand = Math.floor(Math.random() * indices.length);
        const idx = indices.splice(rand, 1)[0];
        const item = shop.items[idx];
        randomItems.push(item);
        // 加到訂單
        const exist = orderList.find(o => o.shop === shop.name && o.item === item.name);
        if (exist) {
            exist.qty += 1;
        } else {
            orderList.push({ shop: shop.name, item: item.name, price: item.price, qty: 1 });
        }
    }
    saveOrderToLocal();
    renderOrderList();
}

function renderOrderList() {
    orderUl.innerHTML = '';
    let total = 0;
    
    // 按店家分組訂單
    const ordersByShop = {};
    orderList.forEach((o, idx) => {
        total += o.price * o.qty;
        if (!ordersByShop[o.shop]) {
            ordersByShop[o.shop] = [];
        }
        ordersByShop[o.shop].push({...o, idx});
    });

    // 渲染每個店家的訂單
    Object.entries(ordersByShop).forEach(([shop, items]) => {
        const shopHeader = document.createElement('div');
        shopHeader.className = 'shop-header';
        shopHeader.textContent = `【${shop}】`;
        orderUl.appendChild(shopHeader);
        
        items.forEach((o, i) => {
            const li = document.createElement('li');
            
            // 建立訂單項目內容
            const orderContent = document.createElement('div');
            orderContent.className = 'order-content';
            
            // 訂購人和品項
            const orderInfo = document.createElement('div');
            orderInfo.className = 'order-info';
            // 構建訂單資訊
            const orderDetails = [];
            
            // 顯示品項和訂購人（如果有）
            let itemDisplay = o.item;
            if (o.name && o.name !== '未命名') {
                itemDisplay += ` [${o.name}]`;
            }
            orderDetails.push(`<strong>${itemDisplay}</strong> x${o.qty}`);
            
            // 添加冰塊和甜度資訊
            const preferences = [];
            if (o.iceLevel !== undefined && o.iceLevel !== 0) {
                preferences.push(`${o.iceLevel}分冰`);
            }
            if (o.sugarLevel !== undefined && o.sugarLevel !== 10) {
                preferences.push(`${o.sugarLevel}分糖`);
            }
            
            // 如果有特別備註，也加進去
            if (o.note && o.note !== '標準') {
                preferences.push(o.note);
            }
            
            if (preferences.length > 0) {
                orderDetails.push(`(${preferences.join('、')})`);
            }
            
            orderInfo.innerHTML = orderDetails.join(' ');
            
            // 金額
            const priceSpan = document.createElement('span');
            priceSpan.className = 'item-total';
            priceSpan.textContent = `$${o.price * o.qty}`;
            
            // 刪除按鈕
            const delBtn = document.createElement('button');
            delBtn.className = 'del-btn';
            delBtn.textContent = '❌';
            delBtn.title = '刪除';
            delBtn.onclick = () => {
                orderList.splice(o.idx - i, 1);
                saveOrderToLocal();
                renderOrderList();
            };
            
            // 組合元素
            orderContent.appendChild(orderInfo);
            orderContent.appendChild(priceSpan);
            li.appendChild(orderContent);
            li.appendChild(delBtn);
            orderUl.appendChild(li);
        });
    });

    // 更新總計
    const totalQty = orderList.reduce((sum, o) => sum + o.qty, 0);
    orderSummary.textContent = `總金額：$${total}　共 ${totalQty} 杯/份`;
}

function showTip(msg) {
    alert(msg);
}

function showStatus(message, duration = 2000) {
    const status = document.getElementById('status-notification');
    status.textContent = message;
    status.style.display = 'block';
    status.style.opacity = '1';
    
    setTimeout(() => {
        status.style.opacity = '0';
        setTimeout(() => {
            status.style.display = 'none';
        }, 300);
    }, duration);
}

function generateRandomKey() {
    return Math.random().toString(36).substr(2, 8);
}

function saveOrderToLocal() {
    localStorage.setItem('orderList', JSON.stringify(orderList));
}

