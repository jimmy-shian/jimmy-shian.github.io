document.addEventListener('DOMContentLoaded', function() {
    // 全局變量
    let datasets = [{
        name: '數據集1',
        data: [],
        color: '#4299e1'
    }];
    let chart = null;
    let currentDatasetIndex = 0;
    
    // DOM 元素
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const fileInfo = document.getElementById('fileInfo');
    const inputGrid = document.querySelector('.input-grid');
    const addRowBtn = document.getElementById('addRow');
    const clearDataBtn = document.getElementById('clearData');
    const generateChartBtn = document.getElementById('generateChart');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const chartType = document.getElementById('chartType');
    const showPoints = document.getElementById('showPoints');
    const smoothLine = document.getElementById('smoothLine');
    const dataTable = document.querySelector('#dataTable tbody');
    
    // 更新UI的函數
    function updateUI() {
        updateInputGrid();
        updateDataTable();
        generateChart();
        updateStatistics();
        updateDatasetTabs();
    }
    
    // 下載範例數據
    function downloadExampleFile(filename, content) {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 載入範例數據
    async function loadExampleFile(filename) {
        try {
            const response = await fetch(filename);
            if (!response.ok) throw new Error('無法載入範例文件');
            const content = await response.text();
            return content;
        } catch (error) {
            console.error('載入範例文件時出錯:', error);
            alert('無法載入範例文件: ' + error.message);
            return null;
        }
    }

    // 初始化事件監聽器
    function initEventListeners() {
        // 圖表選項變更事件
        document.getElementById('showPoints').addEventListener('change', updateChart);
        document.getElementById('smoothLine').addEventListener('change', updateChart);
        document.getElementById('showLegend').addEventListener('change', updateChart);
        document.getElementById('chartType').addEventListener('change', updateChart);
        
        // 下載單一數據集範例
        document.getElementById('downloadSingleExample').addEventListener('click', async () => {
            const content = await loadExampleFile('test_single.csv');
            if (content) {
                downloadExampleFile('example_single_dataset.csv', content);
            }
        });

        // 下載多數據集範例
        document.getElementById('downloadMultipleExample').addEventListener('click', async () => {
            const content = await loadExampleFile('test_multiple.csv');
            if (content) {
                downloadExampleFile('example_multiple_datasets.csv', content);
            }
        });
    }

    // 初始化
    init();
    initEventListeners();
    
    function switchTab(tabName) {
        // 顯示加載動畫
        $.LoadingOverlay('show');
        
        // 短暫延遲以顯示加載動畫
        setTimeout(() => {
            // 隱藏所有標籤內容
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 移除所有標籤按鈕的 active 類
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 顯示選中的標籤內容
            document.getElementById(`${tabName}-pane`).classList.add('active');
            
            // 為選中的標籤按鈕添加 active 類
            document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
            
            // 隱藏加載動畫
            $.LoadingOverlay('hide');
        }, 100);
        
        // 如果是數據集標籤，更新數據集列表
        if (tabName === 'datasets') {
            updateDatasetTabs();
        }
    }

    function updateDatasetTabs() {
        const tabsContainer = $('.dataset-tabs').first();
        const addButton = tabsContainer.find('.dataset-tab-add').detach();
        tabsContainer.empty();
        
        datasets.forEach((dataset, index) => {
            const isActive = index === currentDatasetIndex;
            const tab = $(`
                <button class="dataset-tab ${isActive ? 'active' : ''}" data-dataset="${index}">
                    ${dataset.name}
                    <span class="dataset-tab-remove">&times;</span>
                </button>
            `);
            
            // 設置顏色指示器
            tab.css('border-left', `3px solid ${dataset.color}`);
            
            tabsContainer.append(tab);
        });
        
        tabsContainer.append(addButton);
    }

    function removeDataset(index) {
        if (datasets.length > 1) {
            datasets.splice(index, 1);
            currentDatasetIndex = Math.min(currentDatasetIndex, datasets.length - 1);
            updateDatasetTabs();
            updateInputGrid();
            updateDataTable();
            updateStatistics();
            generateChart();
        }
    }

    // 預定義的柔和且對比度高的顏色調色板
    const COLOR_PALETTE = [
        '#4E79A7', // 深藍
        '#F28E2B', // 橙色
        '#E15759', // 紅色
        '#76B7B2', // 藍綠色
        '#59A14F', // 綠色
        '#EDC948', // 黃色
        '#B07AA1', // 紫色
        '#FF9DA7', // 粉紅
        '#9C755F', // 棕色
        '#BAB0AC', // 灰色
        '#17BECF', // 青色
        '#BC80BD', // 紫羅蘭
        '#8CD17D', // 淺綠
        '#FABFD2', // 淺粉
        '#B6992D', // 橄欖綠
        '#AEC7E8', // 淺藍
        '#FFBB78', // 淺橙
        '#98DF8A', // 淺綠
        '#FF9896', // 淺紅
        '#C5B0D5'  // 淺紫
    ];

    
    let colorIndex = 0;
    
    function generateRandomColor() {
        // 循環使用預定義的顏色
        const color = COLOR_PALETTE[colorIndex % COLOR_PALETTE.length];
        colorIndex++;
        return color;
    }
    
    // 重置顏色索引，當清空數據時調用
    function resetColorIndex() {
        colorIndex = 0;
    }
    
    function init() {
        // 添加初始行
        addNewRow();
        
        // 設置事件監聽器
        setupEventListeners();
        
        // 數據集切換事件
        $(document).on('click', '.dataset-tab:not(.dataset-tab-add)', function() {
            const index = parseInt($(this).data('dataset'));
            if (index !== currentDatasetIndex) {
                // 顯示加載動畫
                $.LoadingOverlay('show');
                
                // 短暫延遲以顯示加載動畫
                setTimeout(() => {
                    currentDatasetIndex = index;
                    
                    // 更新所有UI組件
                    updateInputGrid();
                    updateDataTable();
                    generateChart();
                    updateStatistics();
                    
                    // 更新活動標籤
                    $('.dataset-tab').removeClass('active');
                    $(`.dataset-tab[data-dataset="${index}"]`).addClass('active');
                    
                    // 隱藏加載動畫
                    $.LoadingOverlay('hide');
                }, 100);
            }
        });
        
        // 添加新數據集
        $('#addDataset').on('click', function() {
            const newDataset = {
                name: `數據集 ${datasets.length + 1}`,
                data: [],
                color: generateRandomColor()
            };
            
            datasets.push(newDataset);
            currentDatasetIndex = datasets.length - 1;
            
            // 更新UI
            updateUI();
        });
        
        // 刪除數據集
        $(document).on('click', '.dataset-tab-remove', function(e) {
            e.stopPropagation();
            const index = $(this).closest('.dataset-tab').data('dataset');
            
            if (datasets.length <= 1) {
                alert('至少需要保留一個數據集');
                return;
            }
            
            if (confirm('確定要刪除此數據集嗎？')) {
                datasets.splice(index, 1);
                
                // 如果刪除的是當前數據集或當前數據集是最後一個，則切換到前一個
                if (currentDatasetIndex >= index) {
                    currentDatasetIndex = Math.max(0, currentDatasetIndex - 1);
                }
                
                // 更新UI
                updateDatasetTabs();
                updateInputGrid();
                updateDataTable();
                generateChart();
                updateStatistics();
            }
        });
        
        // 初始化加載動畫
        $.LoadingOverlaySetup({
            background: 'rgba(255, 255, 255, 0.8)',
            image: '',
            fontawesome: 'fas fa-spinner fa-spin'
        });
    }
    
    function setupEventListeners() {
        // 拖放區域事件
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
        
        // 文件上傳
        browseBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileSelect);
        
        // 數據操作
        addRowBtn.addEventListener('click', addNewRow);
        clearDataBtn.addEventListener('click', clearAllData);
        generateChartBtn.addEventListener('click', generateChart);
        
        // 標籤頁切換
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
        
        // 圖表選項變化
        chartType.addEventListener('change', updateChart);
        showPoints.addEventListener('change', updateChart);
        smoothLine.addEventListener('change', updateChart);
        
        // 委派事件處理動態添加的元素
        inputGrid.addEventListener('click', handleGridClick);
        inputGrid.addEventListener('input', handleGridInput);
    }
    
    // 拖放處理函數
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // 創建一個模擬的 event 對象，使其與 input[type="file"] 的 change 事件兼容
            const event = {
                target: {
                    files: files
                },
                preventDefault: () => {},
                stopPropagation: () => {}
            };
            handleFileSelect(event);
        }
    }
    
    // 用於存儲已上傳文件的信息
    const fileCache = new Map();

    async function handleFileSelect(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        const file = files[0];
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.textContent = `已選擇: ${file.name}`;
        fileInfo.parentElement.classList.add('file-uploaded');
        
        try {
            // 檢查文件是否已緩存且未修改
            const fileKey = `${file.name}_${file.lastModified}`;
            const cachedData = fileCache.get(fileKey);
            
            let parsedData;
            if (cachedData) {
                parsedData = cachedData;
            } else {
                const fileData = await readFile(file);
                parsedData = parseFile(file.name, fileData);
                // 緩存解析後的數據
                fileCache.set(fileKey, parsedData);
            }
            
            if (parsedData && parsedData.length > 0) {
                // 清空現有數據集
                datasets = [];
                
                // 檢查是否為多數據集格式（包含 dataset 字段）
                if (parsedData[0].dataset !== undefined) {
                    const groupedData = {};
                    
                    // 按 dataset 分組數據
                    parsedData.forEach(item => {
                        const datasetId = item.dataset;
                        if (!groupedData[datasetId]) {
                            groupedData[datasetId] = [];
                        }
                        groupedData[datasetId].push({
                            x: parseFloat(item.x),
                            y: parseFloat(item.y)
                        });
                    });
                    
                    // 為每個數據集創建新的數據集，保留原始數據集名稱
                    Object.entries(groupedData).forEach(([datasetId, dataPoints]) => {
                        // 過濾掉無效的數據點
                        const validDataPoints = dataPoints.filter(point => 
                            !isNaN(point.x) && !isNaN(point.y)
                        );
                        
                        if (validDataPoints.length > 0) {
                            datasets.push({
                                name: datasetId, // 使用原始數據集名稱
                                data: validDataPoints,
                                color: generateRandomColor()
                            });
                        }
                    });
                } else {
                    // 單數據集的情況
                    const validData = parsedData
                        .filter(item => !isNaN(parseFloat(item.x)) && !isNaN(parseFloat(item.y)))
                        .map(item => ({
                            x: parseFloat(item.x),
                            y: parseFloat(item.y)
                        }));
                    
                    if (validData.length > 0) {
                        datasets = [{
                            name: file.name.replace(/\.[^/.]+$/, ''), // 使用文件名作為數據集名稱
                            data: validData,
                            color: generateRandomColor()
                        }];
                    }
                }
                
                if (datasets.length > 0) {
                    // 設置當前數據集索引並更新UI
                    currentDatasetIndex = 0;
                    updateUI();
                    switchTab('chart');
                } else {
                    throw new Error('文件中沒有找到有效的數據點');
                }
            } else {
                throw new Error('文件中沒有找到有效的數據');
            }
        } catch (error) {
            console.error('處理文件時出錯:', error);
            alert(`處理文件時出錯: ${error.message || '請確保文件格式正確'}`);
            fileInfo.textContent = '文件處理失敗';
            fileInfo.parentElement.classList.remove('file-uploaded');
        }
    }
    
    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('文件讀取失敗'));
            
            if (file.name.endsWith('.csv')) {
                reader.readAsText(file);
            } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                reader.readAsArrayBuffer(file);
            } else {
                reject(new Error('不支援的文件格式'));
            }
        });
    }
    
    function parseFile(filename, content) {
        try {
            if (filename.endsWith('.csv')) {
                return parseCSV(content);
            } else if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) {
                return parseExcel(content);
            }
        } catch (error) {
            console.error('解析文件時出錯:', error);
            throw new Error('解析文件失敗，請檢查文件格式是否正確。');
        }
    }
    
    function parseCSV(csvText) {
        // 處理不同換行符和BOM(Byte Order Mark)
        let csvContent = csvText.replace(/\ufeff/g, '');
        const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
        
        if (lines.length < 2) {
            throw new Error('CSV文件內容過少或格式不正確');
        }
        
        // 檢查是否有標題行
        const headers = lines[0].split(',').map(h => h.trim());
        const hasHeader = headers.some(header => isNaN(header.trim()) && header.trim() !== '');
        
        // 檢查列名，不區分大小寫
        const headerMap = {};
        headers.forEach((h, index) => {
            const lowerH = h.toLowerCase();
            if (['x', 'y', 'dataset'].includes(lowerH)) {
                headerMap[lowerH] = index;
            }
        });
        
        // 檢查必要的列是否存在
        if (!('x' in headerMap) || !('y' in headerMap)) {
            throw new Error('CSV文件必須包含x和y列');
        }
        
        const hasDataset = 'dataset' in headerMap;
        const result = [];
        const startRow = hasHeader ? 1 : 0;
        
        // 解析數據行
        for (let i = startRow; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const row = line.split(',');
            try {
                const x = parseFloat(row[headerMap.x].trim());
                const y = parseFloat(row[headerMap.y].trim());
                
                if (isNaN(x) || isNaN(y)) {
                    console.warn(`跳過無效的數據行 ${i + 1}:`, line);
                    continue;
                }
                
                const dataPoint = { x, y };
                
                // 如果有多數據集，添加dataset欄位
                if (hasDataset) {
                    dataPoint.dataset = row[headerMap.dataset].trim();
                }
                
                result.push(dataPoint);
            } catch (error) {
                console.warn(`解析行 ${i + 1} 時出錯:`, error);
                continue;
            }
        }
        return result;
    }
    
    function parseExcel(arrayBuffer) {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // 檢查是否有標題行
        const hasHeader = jsonData.length > 0 && 
                         jsonData[0].some(cell => typeof cell === 'string' && isNaN(cell.trim()));
        const startRow = hasHeader ? 1 : 0;
        
        const result = [];
        
        for (let i = startRow; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row && row.length >= 2) {
                const x = typeof row[0] === 'number' ? row[0] : parseFloat(row[0]);
                const y = typeof row[1] === 'number' ? row[1] : parseFloat(row[1]);
                if (!isNaN(x) && !isNaN(y)) {
                    result.push({ x, y });
                }
            }
        }
        
        return result;
    }
    
    // 數據表格操作
    function addNewRow() {
        const rowCount = document.querySelectorAll('.input-row').length;
        const row = document.createElement('div');
        row.className = 'input-row';
        row.innerHTML = `
            <input type="text" class="input-x" placeholder="X 值" data-row="${rowCount}">
            <input type="text" class="input-y" placeholder="Y 值" data-row="${rowCount}">
            <button class="btn-remove" data-row="${rowCount}"><i class="fas fa-times"></i></button>
        `;
        inputGrid.appendChild(row);
    }
    
    function clearAllData() {
        if (confirm('確定要清除所有數據嗎？')) {
            datasets = [{
                name: '數據集1',
                data: [],
                color: '#4299e1'
            }];
            currentDatasetIndex = 0;
            updateUI();
            fileInput.value = '';
            const fileInfo = document.getElementById('fileInfo');
            fileInfo.textContent = '未選擇文件';
            fileInfo.parentElement.classList.remove('file-uploaded');
        }
    }
    
    function handleGridClick(e) {
        const target = e.target.closest('.btn-remove');
        if (target) {
            const rowIndex = parseInt(target.dataset.row);
            removeRow(rowIndex);
        }
    }
    
    function handleGridInput(e) {
        if (e.target.classList.contains('input-x') || e.target.classList.contains('input-y')) {
            updateDataFromInputs();
        }
    }
    
    function removeRow(index) {
        const rows = document.querySelectorAll('.input-row');
        if (rows.length <= 1) {
            alert('至少需要保留一行數據');
            return;
        }
        
        // 從DOM中移除行
        rows[index].remove();
        
        // 更新剩餘行的data-row屬性
        const remainingRows = document.querySelectorAll('.input-row');
        remainingRows.forEach((row, i) => {
            row.querySelector('.btn-remove').dataset.row = i;
            row.querySelector('.input-x').dataset.row = i;
            row.querySelector('.input-y').dataset.row = i;
        });
        
        // 更新數據
        updateDataFromInputs();
    }
    
    function updateDataFromInputs() {
        // 確保有有效的數據集
        if (!datasets[currentDatasetIndex]) {
            return;
        }
        
        const currentData = datasets[currentDatasetIndex].data;
        currentData.length = 0; // 清空現有數據
        
        const rows = document.querySelectorAll('.input-row');
        
        rows.forEach(row => {
            const xInput = row.querySelector('.input-x');
            const yInput = row.querySelector('.input-y');
            const x = parseFloat(xInput.value);
            const y = parseFloat(yInput.value);
            
            if (!isNaN(x) && !isNaN(y)) {
                currentData.push({ x, y });
            }
        });
        
        // 如果所有行都有有效數據，添加一個新行
        if (currentData.length === rows.length && currentData.length > 0) {
            addNewRow();
        }
        
        updateDataTable();
        updateStatistics();
    }
    
    function updateInputGrid() {
        // 清空現有行
        inputGrid.innerHTML = '';
        
        // 確保有有效的數據集
        if (!datasets[currentDatasetIndex] || datasets[currentDatasetIndex].data.length === 0) {
            addNewRow();
            return;
        }
        
        // 添加數據行
        const currentData = datasets[currentDatasetIndex].data;
        currentData.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'input-row';
            row.innerHTML = `
                <input type="text" class="input-x" value="${item.x}" data-row="${index}">
                <input type="text" class="input-y" value="${item.y}" data-row="${index}">
                <button class="btn-remove" data-row="${index}"><i class="fas fa-times"></i></button>
            `;
            inputGrid.appendChild(row);
        });
        
        // 添加一個空行用於輸入新數據
        addNewRow();
    }
    
    // 數據表格更新
    function updateDataTable() {
        dataTable.innerHTML = '';
        
        // 確保有有效的數據集
        if (!datasets[currentDatasetIndex] || datasets[currentDatasetIndex].data.length === 0) {
            return;
        }
        
        const currentData = datasets[currentDatasetIndex].data;
        const datasetName = datasets[currentDatasetIndex]?.name || `數據集 ${currentDatasetIndex + 1}`;
        
        // 添加表格內容
        // 添加標題行
        const titleRow = document.createElement('tr');
        titleRow.className = 'data-table-title';
        titleRow.innerHTML = `
            <td colspan="3" style="text-align: center; font-weight: bold;">數據表: ${datasetName}</td>
        `;
        dataTable.appendChild(titleRow);
        
        // 添加數據行
        currentData.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.x}</td>
                <td>${item.y}</td>
            `;
            dataTable.appendChild(row);
        });
    }
    
    // 圖表生成與更新
    function generateChart() {
        updateDataFromInputs();
        
        if (data.length === 0) {
            alert('請輸入有效的數據');
            return;
        }
        
        // 排序數據（按x值）
        data.sort((a, b) => a.x - b.x);
        
        // 更新輸入網格以反映排序後的數據
        updateInputGrid();
        
        // 創建或更新圖表
        updateChart();
        
        // 切換到圖表標籤
        switchTab('chart');
    }
    
    function updateChart() {
        document.querySelector('.chart-container').classList.add('active');
        const ctx = document.getElementById('dataChart').getContext('2d');
        const type = document.getElementById('chartType').value;
        const showPointsValue = document.getElementById('showPoints').checked;
        const smoothLineValue = document.getElementById('smoothLine').checked;
        const showLegend = document.getElementById('showLegend').checked;
        
        // 確保有有效的數據集
        if (datasets.length === 0 || datasets.some(ds => !ds.data || ds.data.length === 0)) {
            return;
        }
        
        // 準備圖表數據
        const chartData = {
            labels: datasets[0].data.map(item => item.x.toString()),
            datasets: datasets.map((ds, index) => ({
                label: ds.name,
                data: ds.data.map(item => ({
                    x: item.x,
                    y: item.y
                })),
                borderColor: ds.color || 'rgba(74, 108, 247, 1)',
                backgroundColor: ds.color ? 
                    `${ds.color}33` : 'rgba(74, 108, 247, 0.1)',
                borderWidth: 2,
                pointRadius: showPointsValue ? 4 : 0,
                pointHoverRadius: 6,
                pointBackgroundColor: ds.color || 'rgba(74, 108, 247, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: (type === 'line' && smoothLineValue) ? 0.4 : 0,
                fill: type === 'line' && smoothLineValue,
                borderDash: index > 0 ? [5, 5] : [], // 第二個數據集開始使用虛線
                hidden: ds.hidden || false
            }))
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'X 值',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Y 值',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    display: showLegend,
                    position: 'top',
                    onClick: function(e, legendItem, legend) {
                        // 切換數據集的可見性
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        const meta = ci.getDatasetMeta(index);
                        
                        // 切換可見性
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        
                        // 更新數據集的隱藏狀態
                        datasets[index].hidden = meta.hidden === null ? false : true;
                        
                        // 更新圖表
                        ci.update();
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: (${context.parsed.x}, ${context.parsed.y})`;
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        };
        
        // 銷毀現有的圖表實例（如果存在）
        if (chart) {
            chart.destroy();
        }
        
        // 銷毀現有的圖表實例（如果存在）
        if (chart) {
            chart.destroy();
        }
        
        // 創建新圖表
        chart = new Chart(ctx, {
            type: type === 'scatter' ? 'scatter' : type,
            data: chartData,
            options: options
        });
    }
    
    // 統計計算
    // 計算百分位數
    function calculatePercentile(values, percentile) {
        if (!values.length) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        if (lower === upper) return sorted[lower];
        return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
    }

    // 計算偏度
    function calculateSkewness(values) {
        const n = values.length;
        if (n < 3) return 0;
        
        const mean = calculateMean(values);
        const std = calculateStandardDeviation(values);
        if (std === 0) return 0;
        
        const sum = values.reduce((acc, val) => {
            return acc + Math.pow((val - mean) / std, 3);
        }, 0);
        
        return (n / ((n - 1) * (n - 2))) * sum;
    }

    // 計算峰度
    function calculateKurtosis(values) {
        const n = values.length;
        if (n < 4) return 0;
        
        const mean = calculateMean(values);
        const std = calculateStandardDeviation(values);
        if (std === 0) return 0;
        
        const sum = values.reduce((acc, val) => {
            return acc + Math.pow((val - mean) / std, 4);
        }, 0);
        
        // 超額峰度（減去3，使正態分布為0）
        return (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * sum - 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
    }

    function updateStatistics() {
        const currentDataset = datasets[currentDatasetIndex];
        if (!currentDataset || currentDataset.data.length === 0) {
            // 重置統計信息
            const statsElements = document.querySelectorAll('.stat-value');
            statsElements.forEach(el => el.textContent = '-');
            return;
        }
        
        const xValues = currentDataset.data.map(d => d.x);
        const yValues = currentDataset.data.map(d => d.y);
        
        // X 值統計
        const xMean = calculateMean(xValues);
        const xStd = calculateStandardDeviation(xValues);
        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        const xQ1 = calculatePercentile(xValues, 25);
        const xMedian = calculatePercentile(xValues, 50);
        const xQ3 = calculatePercentile(xValues, 75);
        const xIQR = xQ3 - xQ1;
        const xSkewness = calculateSkewness(xValues);
        const xKurtosis = calculateKurtosis(xValues);
        
        // Y 值統計
        const yMean = calculateMean(yValues);
        const yStd = calculateStandardDeviation(yValues);
        const yMin = Math.min(...yValues);
        const yMax = Math.max(...yValues);
        const yQ1 = calculatePercentile(yValues, 25);
        const yMedian = calculatePercentile(yValues, 50);
        const yQ3 = calculatePercentile(yValues, 75);
        const yIQR = yQ3 - yQ1;
        const ySkewness = calculateSkewness(yValues);
        const yKurtosis = calculateKurtosis(yValues);
        
        // 相關係數
        const correlation = calculateCorrelation(xValues, yValues);
        
        // 更新UI - X 值
        document.getElementById('x-mean').textContent = xMean.toFixed(4);
        document.getElementById('x-std').textContent = xStd.toFixed(4);
        document.getElementById('x-min').textContent = xMin.toFixed(4);
        document.getElementById('x-max').textContent = xMax.toFixed(4);
        document.getElementById('x-q1').textContent = xQ1.toFixed(4);
        document.getElementById('x-median').textContent = xMedian.toFixed(4);
        document.getElementById('x-q3').textContent = xQ3.toFixed(4);
        document.getElementById('x-iqr').textContent = xIQR.toFixed(4);
        document.getElementById('x-skewness').textContent = xSkewness.toFixed(4);
        document.getElementById('x-kurtosis').textContent = xKurtosis.toFixed(4);
        
        // 更新UI - Y 值
        document.getElementById('y-mean').textContent = yMean.toFixed(4);
        document.getElementById('y-std').textContent = yStd.toFixed(4);
        document.getElementById('y-min').textContent = yMin.toFixed(4);
        document.getElementById('y-max').textContent = yMax.toFixed(4);
        document.getElementById('y-q1').textContent = yQ1.toFixed(4);
        document.getElementById('y-median').textContent = yMedian.toFixed(4);
        document.getElementById('y-q3').textContent = yQ3.toFixed(4);
        document.getElementById('y-iqr').textContent = yIQR.toFixed(4);
        document.getElementById('y-skewness').textContent = ySkewness.toFixed(4);
        document.getElementById('y-kurtosis').textContent = yKurtosis.toFixed(4);
        
        // 更新相關係數
        const correlationElement = document.getElementById('correlation');
        correlationElement.textContent = correlation.toFixed(4);
        
        // 根據相關係數設置顏色
        const absCorrelation = Math.abs(correlation);
        if (absCorrelation > 0.7) {
            correlationElement.style.color = '#28a745'; // 強相關
        } else if (absCorrelation > 0.3) {
            correlationElement.style.color = '#ffc107'; // 中等相關
        } else {
            correlationElement.style.color = '#dc3545'; // 弱相關
        }
    }
    
    function calculateMean(values) {
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
    
    function calculateStandardDeviation(values) {
        const mean = calculateMean(values);
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
        return Math.sqrt(variance);
    }
    
    function calculateCorrelation(xValues, yValues) {
        if (xValues.length !== yValues.length || xValues.length < 2) {
            return 0;
        }
        
        const n = xValues.length;
        const xMean = calculateMean(xValues);
        const yMean = calculateMean(yValues);
        
        let numerator = 0;
        let xDenominator = 0;
        let yDenominator = 0;
        
        for (let i = 0; i < n; i++) {
            const xDiff = xValues[i] - xMean;
            const yDiff = yValues[i] - yMean;
            
            numerator += xDiff * yDiff;
            xDenominator += xDiff * xDiff;
            yDenominator += yDiff * yDiff;
        }
        
        if (xDenominator === 0 || yDenominator === 0) {
            return 0;
        }
        
        return numerator / Math.sqrt(xDenominator * yDenominator);
    }

    function generateChart() {
        document.querySelector('.chart-container').classList.add('active');
        const ctx = document.getElementById('dataChart').getContext('2d');
        
        // 清除現有的圖表實例
        if (chart) {
            chart.destroy();
        }
        
        // 確保有有效的數據集
        if (datasets.length === 0 || datasets[0].data.length === 0) {
            return;
        }
        
        const chartType = document.getElementById('chartType').value;
        const showPoints = document.getElementById('showPoints').checked;
        const smoothLine = document.getElementById('smoothLine').checked;
        const showLegend = document.getElementById('showLegend').checked;
        
        // 確保所有數據集都有有效的數據
        const validDatasets = datasets.filter(ds => ds.data.length > 0);
        
        // 如果沒有有效數據集，返回
        if (validDatasets.length === 0) {
            return;
        }
        
        // 使用第一個有效數據集的 x 值作為標籤
        const labels = validDatasets[0].data.map(d => d.x);
        
        chart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: validDatasets.map((ds, index) => ({
                    label: ds.name,
                    data: ds.data.map(d => d.y),
                    borderColor: ds.color,
                    backgroundColor: `rgba(${parseInt(ds.color.slice(1, 3), 16)}, ${parseInt(ds.color.slice(3, 5), 16)}, ${parseInt(ds.color.slice(5, 7), 16)}, 0.1)`,
                    pointRadius: showPoints ? 4 : 0,
                    tension: smoothLine ? 0.4 : 0,
                    fill: true,
                    borderDash: index === 0 ? [] : [5, 5] // 使用虛線來顯示突變
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: showLegend,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'X 值'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Y 值'
                        }
                    }
                }
            }
        });
    }
    
function updateStatistics() {
    const currentDataset = datasets[currentDatasetIndex];
    
    // 更新標題顯示當前數據集名稱
    const datasetName = currentDataset?.name || `數據集 ${currentDatasetIndex + 1}`;
    
    // 更新 X 值統計標題
    const xTitle = document.querySelector('.x-stats-title');
    xTitle.childNodes[0].nodeValue = `X 值統計 (${datasetName}) `;
    
    // 更新 Y 值統計標題
    const yTitle = document.querySelector('.y-stats-title');
    yTitle.childNodes[0].nodeValue = `Y 值統計 (${datasetName}) `;
    
    // 更新相關性分析標題
    const corrTitle = document.querySelector('.correlation-title');
    corrTitle.childNodes[0].nodeValue = `相關性分析 (${datasetName}) `;
    
    if (!currentDataset || currentDataset.data.length === 0) {
        // 重置統計信息
        document.getElementById('x-mean').textContent = '-';
        document.getElementById('x-std').textContent = '-';
        document.getElementById('x-min').textContent = '-';
        document.getElementById('x-max').textContent = '-';
        document.getElementById('y-mean').textContent = '-';
        document.getElementById('y-std').textContent = '-';
        document.getElementById('y-min').textContent = '-';
        document.getElementById('y-max').textContent = '-';
        document.getElementById('y-q1').textContent = '-';
        document.getElementById('y-median').textContent = '-';
        document.getElementById('y-q3').textContent = '-';
        document.getElementById('y-iqr').textContent = '-';
        document.getElementById('y-skewness').textContent = '-';
        document.getElementById('y-kurtosis').textContent = '-';
        document.getElementById('correlation').textContent = '-';
        return;
    }

    const xValues = currentDataset.data.map(d => d.x);
    const yValues = currentDataset.data.map(d => d.y);

    if (xValues.length === 0 || yValues.length === 0) {
        return;
    }

    // 計算 X 值的統計量
    const xMean = calculateMean(xValues);
    const xStd = calculateStandardDeviation(xValues);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const xQ1 = calculatePercentile(xValues, 25);
    const xMedian = calculatePercentile(xValues, 50);
    const xQ3 = calculatePercentile(xValues, 75);
    const xIQR = xQ3 - xQ1;
    const xSkewness = calculateSkewness(xValues);
    const xKurtosis = calculateKurtosis(xValues);

    // 計算 Y 值的統計量
    const yMean = calculateMean(yValues);
    const yStd = calculateStandardDeviation(yValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yQ1 = calculatePercentile(yValues, 25);
    const yMedian = calculatePercentile(yValues, 50);
    const yQ3 = calculatePercentile(yValues, 75);
    const yIQR = yQ3 - yQ1;
    const ySkewness = calculateSkewness(yValues);
    const yKurtosis = calculateKurtosis(yValues);

    // 計算相關係數
    const correlation = calculateCorrelation(xValues, yValues);

    // 更新 X 值統計
    document.getElementById('x-mean').textContent = xMean.toFixed(4);
    document.getElementById('x-std').textContent = xStd.toFixed(4);
    document.getElementById('x-min').textContent = xMin.toFixed(4);
    document.getElementById('x-max').textContent = xMax.toFixed(4);
    document.getElementById('x-q1').textContent = xQ1.toFixed(4);
    document.getElementById('x-median').textContent = xMedian.toFixed(4);
    document.getElementById('x-q3').textContent = xQ3.toFixed(4);
    document.getElementById('x-iqr').textContent = xIQR.toFixed(4);
    document.getElementById('x-skewness').textContent = xSkewness.toFixed(4);
    document.getElementById('x-kurtosis').textContent = xKurtosis.toFixed(4);

    // 更新 Y 值統計
    document.getElementById('y-mean').textContent = yMean.toFixed(4);
    document.getElementById('y-std').textContent = yStd.toFixed(4);
    document.getElementById('y-min').textContent = yMin.toFixed(4);
    document.getElementById('y-max').textContent = yMax.toFixed(4);
    document.getElementById('y-q1').textContent = yQ1.toFixed(4);
    document.getElementById('y-median').textContent = yMedian.toFixed(4);
    document.getElementById('y-q3').textContent = yQ3.toFixed(4);
    document.getElementById('y-iqr').textContent = yIQR.toFixed(4);
    document.getElementById('y-skewness').textContent = ySkewness.toFixed(4);
    document.getElementById('y-kurtosis').textContent = yKurtosis.toFixed(4);

    // 更新相關性
    const correlationElement = document.getElementById('correlation');
    const correlationValue = Math.abs(correlation).toFixed(4);
    let correlationStrength = '';
    let strengthClass = '';
    let correlationDescription = '';

    // 根據相關性強度設置顏色和描述
    const absCorrelation = Math.abs(correlation);
    if (absCorrelation >= 0.7) {
        correlationStrength = '強';
        strengthClass = 'strong';
    } else if (absCorrelation >= 0.3) {
        correlationStrength = '中等';
        strengthClass = 'medium';
    } else {
        correlationStrength = '弱或無';
        strengthClass = 'weak';
    }

    // 添加相關性方向
    const direction = correlation > 0 ? '正' : '負';
    
    // 更新元素內容
    correlationElement.innerHTML = `
        <div class="correlation-value">${direction} ${correlationValue}</div>
        <div class="correlation-strength ${strengthClass}">${correlationStrength}相關</div>
        <div class="correlation-direction">方向: ${direction}相關</div>
    `;
}

// 確保代碼正確結束
});