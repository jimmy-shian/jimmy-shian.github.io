document.addEventListener('DOMContentLoaded', () => {
    // 獲取DOM元素
    const passwordInput = document.getElementById('password');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const customCharsInput = document.getElementById('custom-chars');
    const savePrefsBtn = document.getElementById('save-prefs');
    const warningMessage = document.getElementById('warning-message');

    // 字元集
    const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$#.*';

    // 載入儲存的設定
    function loadPreferences() {
        const prefs = JSON.parse(localStorage.getItem('passwordGeneratorPrefs') || '{}');
        
        if (prefs.customChars !== undefined) customCharsInput.value = prefs.customChars;
        adjustLengthSliderMin();
        if (prefs.length) lengthSlider.value = Math.max(lengthSlider.min, prefs.length);
        if (prefs.uppercase !== undefined) uppercaseCheck.checked = prefs.uppercase;
        if (prefs.lowercase !== undefined) lowercaseCheck.checked = prefs.lowercase;
        if (prefs.numbers !== undefined) numbersCheck.checked = prefs.numbers;
        if (prefs.symbols !== undefined) symbolsCheck.checked = prefs.symbols;
        
        lengthValue.textContent = lengthSlider.value;
    }

    // 儲存設定
    function savePreferences(showTip = true) {
        const prefs = {
            length: parseInt(lengthSlider.value),
            uppercase: uppercaseCheck.checked,
            lowercase: lowercaseCheck.checked,
            numbers: numbersCheck.checked,
            symbols: symbolsCheck.checked,
            customChars: customCharsInput.value
        };
        localStorage.setItem('passwordGeneratorPrefs', JSON.stringify(prefs));
        if (showTip) {
            // 顯示儲存成功的提示
            const originalText = savePrefsBtn.textContent;
            savePrefsBtn.textContent = '已儲存！';
            savePrefsBtn.style.backgroundColor = '#4caf50';
            setTimeout(() => {
                savePrefsBtn.textContent = originalText;
                savePrefsBtn.style.backgroundColor = '';
            }, 2000);
        }
        adjustLengthSliderMin();
    }

    // 生成密碼
    function generatePassword() {
        // 檢查選中的字元類型
        let selectedTypes = [];
        let charSets = [];
        
        if (uppercaseCheck.checked) {
            selectedTypes.push('uppercase');
            charSets.push(UPPERCASE);
        }
        if (lowercaseCheck.checked) {
            selectedTypes.push('lowercase');
            charSets.push(LOWERCASE);
        }
        if (numbersCheck.checked) {
            selectedTypes.push('numbers');
            charSets.push(NUMBERS);
        }
        if (symbolsCheck.checked) {
            selectedTypes.push('symbols');
            charSets.push(SYMBOLS);
        }
        
        // 確保至少選擇一種字元集
        if (selectedTypes.length === 0) {
            alert('請至少選擇一種字元類型！');
            return;
        }
        
        // 組合所有字元集
        let allChars = '';
        for (const charSet of charSets) {
            allChars += charSet;
        }
        
        const length = parseInt(lengthSlider.value);
        const customChars = customCharsInput.value || '';
        

        
        // 檢查並顯示警告
        checkAndShowWarnings(length, customChars, selectedTypes);
        
        // 如果長度小於自訂字元數，使用自訂字元的前 length 個字元
        if (length < customChars.length) {
            customChars = customChars.substring(0, length);
        }
        
        // 1. 先生成「總長度-自訂字元長度」的密碼
        let remainingLength = length - customChars.length;
        let passwordArr = [];
        
        // 確保每種選中的字元類型都至少出現一次
        for (let i = 0; i < selectedTypes.length && i < remainingLength; i++) {
            const charSet = charSets[i];
            passwordArr.push(getRandomChar(charSet));
        }
        
        // 剩下的長度用隨機字元填滿
        for (let i = passwordArr.length; i < remainingLength; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            passwordArr.push(allChars[randomIndex]);
        }
        
        // 打亂隨機生成的部分
        passwordArr = shuffleString(passwordArr.join('')).split('');
        
        // 2. 如果有自訂字元，找一個隨機位置插入
        if (customChars) {
            // 計算可以插入的起始位置範圍
            const maxStartPos = remainingLength - 0;
            const startPos = Math.floor(Math.random() * (maxStartPos + 1));
            
            // 將密碼分成兩部分
            const firstPart = passwordArr.slice(0, startPos);
            const secondPart = passwordArr.slice(startPos);
            
            // 將自訂字元插入到中間
            const customCharsArr = customChars.split('');
            passwordArr = [...firstPart, ...customCharsArr, ...secondPart];
        }
        
        passwordInput.value = passwordArr.join('');
    }

    // 輔助函數：獲取隨機字元
    function getRandomChar(chars) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        return chars[randomIndex];
    }
    
    // 輔助函數：打亂字串順序
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }
    
    // 複製密碼到剪貼簿
    function copyToClipboard() {
        if (!passwordInput.value) return;
        
        passwordInput.select();
        document.execCommand('copy');
        
        // 顯示複製成功的提示
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已複製！';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }

    // 密碼長度最小值需為自訂字元長度+1
    function adjustLengthSliderMin() {
        const minLen = customCharsInput.value.length + 1;
        lengthSlider.min = minLen;
        if (parseInt(lengthSlider.value) < minLen) {
            lengthSlider.value = minLen;
            lengthValue.textContent = minLen;
        }
        // 若當前長度大於最大值，修正
        if (parseInt(lengthSlider.value) > 50) {
            lengthSlider.value = 50;
            lengthValue.textContent = 50;
        }
        lengthValue.textContent = lengthSlider.value;
    }

    // 檢查並顯示警告
    function checkAndShowWarnings(length, customChars, selectedTypes) {
        // 清除之前的警告
        warningMessage.textContent = '';
        warningMessage.classList.remove('show');
        
        // 檢查長度是否足夠
        if (length < customChars.length) {
            showWarning('警告：密碼長度小於自訂字元數 (' + customChars.length + ')，自訂字元可能不完整出現！');
            return false;
        }
        
        // 檢查長度是否足夠包含所有選中的字元類型和自訂字元
        const requiredLength = selectedTypes.length + customChars.length;
        if (length < requiredLength) {
            showWarning('警告：密碼長度至少需要 ' + requiredLength + ' 才能包含所有選中的字元類型和自訂字元！\n\n部分字元類型可能缺失。');
            return false;
        }
        
        return true;
    }
    
    // 顯示警告消息
    function showWarning(message) {
        warningMessage.textContent = message;
        warningMessage.classList.add('show');
    }
    
    // 事件監聽器
    lengthSlider.addEventListener('input', () => {
        const length = parseInt(lengthSlider.value);
        lengthValue.textContent = length;
        savePreferences(false);
        
        // 檢查並顯示警告
        const customChars = customCharsInput.value || '';
        const selectedTypes = [];
        if (uppercaseCheck.checked) selectedTypes.push('uppercase');
        if (lowercaseCheck.checked) selectedTypes.push('lowercase');
        if (numbersCheck.checked) selectedTypes.push('numbers');
        if (symbolsCheck.checked) selectedTypes.push('symbols');
        
        checkAndShowWarnings(length, customChars, selectedTypes);
    });
    
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    savePrefsBtn.addEventListener('click', () => savePreferences(true));
    customCharsInput.addEventListener('input', () => {
        savePreferences(false);
        adjustLengthSliderMin();
        // 清除警告
        // warningMessage.textContent = '';
        // warningMessage.classList.remove('show');
    });
    
    // 載入儲存的設定並生成初始密碼
    loadPreferences();
    generatePassword();
});
