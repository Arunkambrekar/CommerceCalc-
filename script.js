// DOM Elements
const currencySelect = document.getElementById('currencySelect');
const themeToggle = document.getElementById('themeToggle');
const originalPrice = document.getElementById('originalPrice');
const discountType = document.getElementById('discountType');
const discountValue = document.getElementById('discountValue');
const discountSymbol = document.getElementById('discountSymbol');
const membershipGroup = document.getElementById('membershipGroup');
const membershipLevel = document.getElementById('membershipLevel');
const tieredDiscountGroup = document.getElementById('tieredDiscountGroup');
const quantity = document.getElementById('quantity');
const taxCheckbox = document.getElementById('taxCheckbox');
const taxRateGroup = document.getElementById('taxRateGroup');
const taxRate = document.getElementById('taxRate');
const shippingCheckbox = document.getElementById('shippingCheckbox');
const shippingCostGroup = document.getElementById('shippingCostGroup');
const shippingCost = document.getElementById('shippingCost');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const addTier = document.getElementById('addTier');
const originalPriceSymbol = document.getElementById('originalPriceSymbol');

// Result Elements
const originalPriceResult = document.getElementById('originalPriceResult');
const discountAppliedResult = document.getElementById('discountAppliedResult');
const discountedPriceResult = document.getElementById('discountedPriceResult');
const taxAmountResult = document.getElementById('taxAmountResult');
const shippingAmountResult = document.getElementById('shippingAmountResult');
const totalPriceResult = document.getElementById('totalPriceResult');
const youSaveResult = document.getElementById('youSaveResult');
const savingsPercentageResult = document.getElementById('savingsPercentageResult');
const savingsProgress = document.getElementById('savingsProgress');
const effectivePriceResult = document.getElementById('effectivePriceResult');
const taxResultRow = document.getElementById('taxResultRow');
const shippingResultRow = document.getElementById('shippingResultRow');
const totalResultRow = document.getElementById('totalResultRow');
const bestDealCard = document.getElementById('bestDealCard');
const bestDealContent = document.getElementById('bestDealContent');

// Feature Buttons
const showHistory = document.getElementById('showHistory');
const setupAlert = document.getElementById('setupAlert');
const comparePrices = document.getElementById('comparePrices');
const convertCurrency = document.getElementById('convertCurrency');

// Persistence Buttons
const saveCalculation = document.getElementById('saveCalculation');
const loadCalculation = document.getElementById('loadCalculation');
const exportPDF = document.getElementById('exportPDF');
const exportCSV = document.getElementById('exportCSV');
const shareCalculation = document.getElementById('shareCalculation');

// Modal Elements
const historyModal = document.getElementById('historyModal');
const savedCalculationsModal = document.getElementById('savedCalculationsModal');
const alertModal = document.getElementById('alertModal');
const compareModal = document.getElementById('compareModal');
const currencyModal = document.getElementById('currencyModal');
const closeModals = document.querySelectorAll('.close-modal');
const savedCalculationsList = document.getElementById('savedCalculationsList');
const clearHistory = document.getElementById('clearHistory');
const alertPrice = document.getElementById('alertPrice');
const alertEmail = document.getElementById('alertEmail');
const saveAlert = document.getElementById('saveAlert');
const comparisonResults = document.getElementById('comparisonResults');
const refreshComparison = document.getElementById('refreshComparison');
const convertAmount = document.getElementById('convertAmount');
const convertFrom = document.getElementById('convertFrom');
const convertTo = document.getElementById('convertTo');
const convertBtn = document.getElementById('convertBtn');
const convertedAmount = document.getElementById('convertedAmount');
const exchangeRate = document.getElementById('exchangeRate');
const exchangeRateDate = document.getElementById('exchangeRateDate');
const convertFromSymbol = document.getElementById('convertFromSymbol');

// Currency Symbols Map
const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'CHF',
    'CNY': '¥',
    'HKD': 'HK$',
    'NZD': 'NZ$',
    'SEK': 'kr',
    'KRW': '₩',
    'SGD': 'S$',
    'NOK': 'kr',
    'MXN': 'Mex$',
    'INR': '₹',
    'BRL': 'R$',
    'ZAR': 'R'
};

// Membership Discounts
const membershipDiscounts = {
    'basic': 5,
    'premium': 10,
    'vip': 15,
    'elite': 20
};

// Initialize the application
function init() {
    // Set theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    // Set currency from localStorage or default to USD
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    currencySelect.value = savedCurrency;
    updateCurrencySymbols(savedCurrency);
    
    // Set tax rate and shipping cost from localStorage if available
    if (localStorage.getItem('taxRate')) {
        taxRate.value = localStorage.getItem('taxRate');
    }
    
    if (localStorage.getItem('shippingCost')) {
        shippingCost.value = localStorage.getItem('shippingCost');
    }
    
    // Check API status
    checkApiStatus();
    
    // Add event listeners
    setupEventListeners();
    
    // Load any saved calculations
    loadSavedCalculations();
}

// Set up all event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('change', toggleTheme);
    
    // Currency change
    currencySelect.addEventListener('change', handleCurrencyChange);
    
    // Discount type change
    discountType.addEventListener('change', handleDiscountTypeChange);
    
    // Toggle tax and shipping sections
    taxCheckbox.addEventListener('change', () => {
        taxRateGroup.style.display = taxCheckbox.checked ? 'block' : 'none';
    });
    
    shippingCheckbox.addEventListener('change', () => {
        shippingCostGroup.style.display = shippingCheckbox.checked ? 'block' : 'none';
    });
    
    // Calculate and reset buttons
    calculateBtn.addEventListener('click', calculateSavings);
    resetBtn.addEventListener('click', resetCalculator);
    
    // Tiered discount add/remove
    addTier.addEventListener('click', addTierRule);
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-tier')) {
            removeTierRule(e.target.closest('.tier-rule'));
        }
    });
    
    // Modal openers
    showHistory.addEventListener('click', () => openModal('historyModal'));
    setupAlert.addEventListener('click', () => openModal('alertModal'));
    comparePrices.addEventListener('click', () => openModal('compareModal'));
    convertCurrency.addEventListener('click', () => openModal('currencyModal'));
    saveCalculation.addEventListener('click', saveCurrentCalculation);
    loadCalculation.addEventListener('click', () => openModal('savedCalculationsModal'));
    exportPDF.addEventListener('click', exportToPDF);
    exportCSV.addEventListener('click', exportToCSV);
    shareCalculation.addEventListener('click', shareCalculationResult);
    
    // Modal closers
    closeModals.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Alert modal
    saveAlert.addEventListener('click', savePriceAlert);
    
    // Comparison modal
    refreshComparison.addEventListener('click', refreshPriceComparison);
    
    // Currency converter
    convertBtn.addEventListener('click', convertCurrencyAmount);
    convertFrom.addEventListener('change', updateConverterSymbol);
    
    // Clear history
    clearHistory.addEventListener('click', clearSavedCalculations);
    
    // Footer links
    document.getElementById('viewCode').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Source code would be available on GitHub in a real implementation.');
    });
    
    document.getElementById('learnMore').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Learn more about how to use CommerceCalc effectively.');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Theme toggle function
function toggleTheme() {
    const theme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Handle currency change
function handleCurrencyChange() {
    const currency = currencySelect.value;
    localStorage.setItem('currency', currency);
    updateCurrencySymbols(currency);
}

// Update all currency symbols on the page
function updateCurrencySymbols(currency) {
    const symbol = currencySymbols[currency] || '$';
    document.querySelectorAll('.currency-symbol').forEach(el => {
        el.textContent = symbol;
    });
}

// Update converter symbol
function updateConverterSymbol() {
    const currency = convertFrom.value;
    convertFromSymbol.textContent = currencySymbols[currency] || '$';
}

// Handle discount type change
function handleDiscountTypeChange() {
    const type = discountType.value;
    
    // Reset discount value
    discountValue.value = '';
    
    // Show/hide appropriate sections
    membershipGroup.style.display = type === 'membership' ? 'block' : 'none';
    tieredDiscountGroup.style.display = type === 'tiered' ? 'block' : 'none';
    
    // Update discount symbol
    if (type === 'percentage') {
        discountSymbol.textContent = '%';
        discountValue.placeholder = 'Enter percentage';
    } else if (type === 'fixed') {
        discountSymbol.textContent = currencySymbols[currencySelect.value] || '$';
        discountValue.placeholder = 'Enter amount';
    } else if (type === 'bogo') {
        discountSymbol.textContent = '';
        discountValue.placeholder = 'N/A';
        discountValue.value = '50';
        discountValue.disabled = true;
    } else {
        discountSymbol.textContent = '%';
        discountValue.placeholder = 'N/A';
        discountValue.value = '';
        discountValue.disabled = false;
    }
}

// Add tier rule
function addTierRule() {
    const tierRules = document.querySelector('.tier-rules');
    const newTier = document.createElement('div');
    newTier.className = 'tier-rule';
    newTier.innerHTML = `
        <input type="number" placeholder="Min quantity" class="tier-min" min="1" value="1">
        <span>+</span>
        <input type="number" placeholder="Discount %" class="tier-discount" min="0" max="100" step="1" value="5">
        <span>% off</span>
        <button class="remove-tier"><i class="fas fa-times"></i></button>
    `;
    tierRules.appendChild(newTier);
}

// Remove tier rule
function removeTierRule(tier) {
    if (document.querySelectorAll('.tier-rule').length > 1) {
        tier.remove();
    } else {
        alert('You must have at least one tier rule.');
    }
}

// Calculate savings
function calculateSavings() {
    // Validate inputs
    if (!originalPrice.value || parseFloat(originalPrice.value) <= 0) {
        alert('Please enter a valid original price.');
        return;
    }
    
    const price = parseFloat(originalPrice.value);
    const qty = parseInt(quantity.value) || 1;
    const type = discountType.value;
    let discountAmount = 0;
    let discountPercentage = 0;
    let discountedPrice = 0;
    
    // Calculate discount based on type
    switch (type) {
        case 'percentage':
            if (!discountValue.value || parseFloat(discountValue.value) < 0 || parseFloat(discountValue.value) > 100) {
                alert('Please enter a valid discount percentage (0-100).');
                return;
            }
            discountPercentage = parseFloat(discountValue.value);
            discountAmount = price * discountPercentage / 100;
            break;
            
        case 'fixed':
            if (!discountValue.value || parseFloat(discountValue.value) < 0) {
                alert('Please enter a valid discount amount.');
                return;
            }
            discountAmount = parseFloat(discountValue.value);
            discountPercentage = (discountAmount / price) * 100;
            break;
            
        case 'bogo':
            discountPercentage = 50;
            discountAmount = price * discountPercentage / 100;
            break;
            
        case 'membership':
            const level = membershipLevel.value;
            discountPercentage = membershipDiscounts[level];
            discountAmount = price * discountPercentage / 100;
            break;
            
        case 'tiered':
            const tiers = Array.from(document.querySelectorAll('.tier-rule')).map(rule => ({
                min: parseInt(rule.querySelector('.tier-min').value),
                discount: parseInt(rule.querySelector('.tier-discount').value)
            })).sort((a, b) => b.min - a.min); // Sort descending
            
            let applicableTier = tiers.find(tier => qty >= tier.min) || tiers[tiers.length - 1];
            discountPercentage = applicableTier.discount;
            discountAmount = price * discountPercentage / 100;
            break;
    }
    
    // Calculate totals
    discountedPrice = price - discountAmount;
    
    // Apply quantity
    const totalOriginal = price * qty;
    const totalDiscount = discountAmount * qty;
    const totalDiscounted = discountedPrice * qty;
    
    // Calculate tax if applicable
    let taxAmount = 0;
    if (taxCheckbox.checked) {
        const rate = parseFloat(taxRate.value) || 0;
        taxAmount = totalDiscounted * rate / 100;
        localStorage.setItem('taxRate', rate);
    }
    
    // Calculate shipping if applicable
    let shippingAmount = 0;
    if (shippingCheckbox.checked) {
        shippingAmount = parseFloat(shippingCost.value) || 0;
        localStorage.setItem('shippingCost', shippingAmount);
    }
    
    // Calculate total
    const totalPrice = totalDiscounted + taxAmount + shippingAmount;
    
    // Calculate savings
    const savings = totalOriginal - totalDiscounted;
    const savingsPercentage = (savings / totalOriginal) * 100;
    const effectivePrice = totalDiscounted / qty;
    
    // Update results
    updateResults(
        totalOriginal,
        totalDiscount,
        discountPercentage,
        totalDiscounted,
        taxAmount,
        shippingAmount,
        totalPrice,
        savings,
        savingsPercentage,
        effectivePrice
    );
    
    // Show best deal if applicable
    showBestDeal(type, qty, discountPercentage);
}

// Update results display
function updateResults(
    original, 
    discount, 
    discountPct, 
    discounted, 
    tax, 
    shipping, 
    total, 
    savings, 
    savingsPct, 
    effectivePrice
) {
    const currency = currencySelect.value;
    const symbol = currencySymbols[currency] || '$';
    
    originalPriceResult.textContent = `${symbol}${original.toFixed(2)}`;
    discountAppliedResult.textContent = `${symbol}${discount.toFixed(2)} (${discountPct.toFixed(2)}%)`;
    discountedPriceResult.textContent = `${symbol}${discounted.toFixed(2)}`;
    
    if (taxCheckbox.checked) {
        taxAmountResult.textContent = `${symbol}${tax.toFixed(2)}`;
        taxResultRow.style.display = 'flex';
    } else {
        taxResultRow.style.display = 'none';
    }
    
    if (shippingCheckbox.checked) {
        shippingAmountResult.textContent = `${symbol}${shipping.toFixed(2)}`;
        shippingResultRow.style.display = 'flex';
    } else {
        shippingResultRow.style.display = 'none';
    }
    
    if (taxCheckbox.checked || shippingCheckbox.checked) {
        totalPriceResult.textContent = `${symbol}${total.toFixed(2)}`;
        totalResultRow.style.display = 'flex';
    } else {
        totalResultRow.style.display = 'none';
    }
    
    youSaveResult.textContent = `${symbol}${savings.toFixed(2)}`;
    savingsPercentageResult.textContent = `${savingsPct.toFixed(2)}%`;
    effectivePriceResult.textContent = `${symbol}${effectivePrice.toFixed(2)} per item`;
    
    // Update progress bar
    savingsProgress.style.width = `${Math.min(savingsPct, 100)}%`;
    savingsProgress.textContent = `${savingsPct.toFixed(2)}%`;
}

// Show best deal recommendation
function showBestDeal(type, qty, currentDiscount) {
    if (type === 'tiered') {
        const tiers = Array.from(document.querySelectorAll('.tier-rule')).map(rule => ({
            min: parseInt(rule.querySelector('.tier-min').value),
            discount: parseInt(rule.querySelector('.tier-discount').value)
        }));
        
        // Find the next tier if applicable
        const nextTier = tiers.find(tier => qty < tier.min);
        
        if (nextTier) {
            const needed = nextTier.min - qty;
            const additionalDiscount = nextTier.discount - currentDiscount;
            
            bestDealContent.innerHTML = `
                <p>Buy ${needed} more to get ${nextTier.discount}% off (${additionalDiscount}% additional)!</p>
                <p>This would save you an extra ${(additionalDiscount * parseFloat(originalPrice.value) / 100 * nextTier.min)} 
                ${currencySymbols[currencySelect.value]} on your order.</p>
            `;
            bestDealCard.style.display = 'block';
        } else {
            bestDealCard.style.display = 'none';
        }
    } else {
        bestDealCard.style.display = 'none';
    }
}

// Reset calculator
function resetCalculator() {
    originalPrice.value = '';
    discountType.value = 'percentage';
    discountValue.value = '';
    quantity.value = '1';
    taxCheckbox.checked = false;
    shippingCheckbox.checked = false;
    taxRateGroup.style.display = 'none';
    shippingCostGroup.style.display = 'none';
    membershipGroup.style.display = 'none';
    tieredDiscountGroup.style.display = 'none';
    discountSymbol.textContent = '%';
    discountValue.placeholder = 'Enter discount';
    discountValue.disabled = false;
    
    // Reset tier rules to default
    const tierRules = document.querySelector('.tier-rules');
    tierRules.innerHTML = `
        <div class="tier-rule">
            <input type="number" placeholder="Min quantity" class="tier-min" min="1" value="5">
            <span>+</span>
            <input type="number" placeholder="Discount %" class="tier-discount" min="0" max="100" step="1" value="10">
            <span>% off</span>
            <button class="remove-tier"><i class="fas fa-times"></i></button>
        </div>
        <div class="tier-rule">
            <input type="number" placeholder="Min quantity" class="tier-min" min="1" value="10">
            <span>+</span>
            <input type="number" placeholder="Discount %" class="tier-discount" min="0" max="100" step="1" value="15">
            <span>% off</span>
            <button class="remove-tier"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Reset results
    originalPriceResult.textContent = '$0.00';
    discountAppliedResult.textContent = '$0.00 (0%)';
    discountedPriceResult.textContent = '$0.00';
    taxAmountResult.textContent = '$0.00';
    shippingAmountResult.textContent = '$0.00';
    totalPriceResult.textContent = '$0.00';
    youSaveResult.textContent = '$0.00';
    savingsPercentageResult.textContent = '0%';
    effectivePriceResult.textContent = '$0.00 per item';
    savingsProgress.style.width = '0%';
    savingsProgress.textContent = '';
    
    taxResultRow.style.display = 'none';
    shippingResultRow.style.display = 'none';
    totalResultRow.style.display = 'none';
    bestDealCard.style.display = 'none';
}

// Save current calculation
function saveCurrentCalculation() {
    if (!originalPrice.value || parseFloat(originalPrice.value) <= 0) {
        alert('Please perform a calculation first before saving.');
        return;
    }
    
    const calculation = {
        timestamp: new Date().toISOString(),
        originalPrice: originalPrice.value,
        discountType: discountType.value,
        discountValue: discountValue.value,
        quantity: quantity.value,
        taxRate: taxCheckbox.checked ? taxRate.value : null,
        shippingCost: shippingCheckbox.checked ? shippingCost.value : null,
        membershipLevel: membershipLevel.value,
        tieredRules: discountType.value === 'tiered' ? 
            Array.from(document.querySelectorAll('.tier-rule')).map(rule => ({
                min: rule.querySelector('.tier-min').value,
                discount: rule.querySelector('.tier-discount').value
            })) : null
    };
    
    // Get existing calculations or initialize empty array
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    
    // Add new calculation
    savedCalculations.push(calculation);
    
    // Save to localStorage
    localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
    
    alert('Calculation saved successfully!');
    loadSavedCalculations();
}

// Load saved calculations
function loadSavedCalculations() {
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || []);
    const list = document.getElementById('savedCalculationsList');
    
    list.innerHTML = '';
    
    if (savedCalculations.length === 0) {
        list.innerHTML = '<p>No saved calculations found.</p>';
        return;
    }
    
    savedCalculations.forEach((calc, index) => {
        const item = document.createElement('div');
        item.className = 'saved-calculation-item';
        
        const date = new Date(calc.timestamp);
        const formattedDate = date.toLocaleString();
        
        item.innerHTML = `
            <div class="saved-calculation-info">
                <strong>${formattedDate}</strong>
                <p>Original: ${currencySymbols[currencySelect.value]}${calc.originalPrice} | Discount: ${calc.discountType} ${calc.discountValue}${calc.discountType === 'percentage' ? '%' : ''}</p>
            </div>
            <div class="saved-calculation-actions">
                <button class="btn-secondary load-btn" data-index="${index}">Load</button>
                <button class="btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        
        list.appendChild(item);
    });
    
    // Add event listeners to load and delete buttons
    document.querySelectorAll('.load-btn').forEach(btn => {
        btn.addEventListener('click', () => loadSpecificCalculation(parseInt(btn.dataset.index)));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteSavedCalculation(parseInt(btn.dataset.index)));
    });
}

// Load a specific saved calculation
function loadSpecificCalculation(index) {
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || []);
    
    if (index < 0 || index >= savedCalculations.length) {
        alert('Invalid calculation index.');
        return;
    }
    
    const calc = savedCalculations[index];
    
    // Set form values
    originalPrice.value = calc.originalPrice;
    discountType.value = calc.discountType;
    discountValue.value = calc.discountValue;
    quantity.value = calc.quantity;
    
    // Handle discount type specific fields
    handleDiscountTypeChange();
    
    if (calc.discountType === 'membership') {
        membershipLevel.value = calc.membershipLevel;
    }
    
    if (calc.discountType === 'tiered' && calc.tieredRules) {
        const tierRules = document.querySelector('.tier-rules');
        tierRules.innerHTML = '';
        
        calc.tieredRules.forEach(rule => {
            const tier = document.createElement('div');
            tier.className = 'tier-rule';
            tier.innerHTML = `
                <input type="number" placeholder="Min quantity" class="tier-min" min="1" value="${rule.min}">
                <span>+</span>
                <input type="number" placeholder="Discount %" class="tier-discount" min="0" max="100" step="1" value="${rule.discount}">
                <span>% off</span>
                <button class="remove-tier"><i class="fas fa-times"></i></button>
            `;
            tierRules.appendChild(tier);
        });
    }
    
    // Handle tax and shipping
    if (calc.taxRate !== null) {
        taxCheckbox.checked = true;
        taxRateGroup.style.display = 'block';
        taxRate.value = calc.taxRate;
    } else {
        taxCheckbox.checked = false;
        taxRateGroup.style.display = 'none';
    }
    
    if (calc.shippingCost !== null) {
        shippingCheckbox.checked = true;
        shippingCostGroup.style.display = 'block';
        shippingCost.value = calc.shippingCost;
    } else {
        shippingCheckbox.checked = false;
        shippingCostGroup.style.display = 'none';
    }
    
    // Close modal
    closeAllModals();
    
    // Recalculate
    calculateSavings();
}

// Delete a saved calculation
function deleteSavedCalculation(index) {
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || []);
    
    if (index < 0 || index >= savedCalculations.length) {
        alert('Invalid calculation index.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this saved calculation?')) {
        savedCalculations.splice(index, 1);
        localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));
        loadSavedCalculations();
    }
}

// Clear all saved calculations
function clearSavedCalculations() {
    if (confirm('Are you sure you want to clear all saved calculations? This cannot be undone.')) {
        localStorage.removeItem('savedCalculations');
        loadSavedCalculations();
    }
}

// Export to PDF
function exportToPDF() {
    // In a real implementation, we would use jsPDF
    alert('PDF export would be implemented with jsPDF in a real application.');
    
   
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text('CommerceCalc - Calculation Results', 10, 10);
    doc.text(`Original Price: ${originalPriceResult.textContent}`, 10, 20);
    doc.text(`Discount Applied: ${discountAppliedResult.textContent}`, 10, 30);
    doc.text(`Discounted Price: ${discountedPriceResult.textContent}`, 10, 40);
    
    if (taxResultRow.style.display !== 'none') {
        doc.text(`Tax: ${taxAmountResult.textContent}`, 10, 50);
    }
    
    if (shippingResultRow.style.display !== 'none') {
        doc.text(`Shipping: ${shippingAmountResult.textContent}`, 10, 60);
    }
    
    if (totalResultRow.style.display !== 'none') {
        doc.text(`Total Price: ${totalPriceResult.textContent}`, 10, 70);
    }
    
    doc.text(`You Save: ${youSaveResult.textContent}`, 10, 80);
    doc.text(`Savings Percentage: ${savingsPercentageResult.textContent}`, 10, 90);
    doc.text(`Effective Price: ${effectivePriceResult.textContent}`, 10, 100);
    
    doc.save('CommerceCalc_Results.pdf');
    
}

// Export to CSV
function exportToCSV() {
    if (!originalPrice.value || parseFloat(originalPrice.value) <= 0) {
        alert('Please perform a calculation first before exporting.');
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Field,Value\n";
    
    // Add data
    csvContent += `Original Price,${originalPriceResult.textContent}\n`;
    csvContent += `Discount Applied,${discountAppliedResult.textContent}\n`;
    csvContent += `Discounted Price,${discountedPriceResult.textContent}\n`;
    
    if (taxResultRow.style.display !== 'none') {
        csvContent += `Tax,${taxAmountResult.textContent}\n`;
    }
    
    if (shippingResultRow.style.display !== 'none') {
        csvContent += `Shipping,${shippingAmountResult.textContent}\n`;
    }
    
    if (totalResultRow.style.display !== 'none') {
        csvContent += `Total Price,${totalPriceResult.textContent}\n`;
    }
    
    csvContent += `You Save,${youSaveResult.textContent}\n`;
    csvContent += `Savings Percentage,${savingsPercentageResult.textContent}\n`;
    csvContent += `Effective Price,${effectivePriceResult.textContent}\n`;
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CommerceCalc_Results.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
}

// Share calculation result
function shareCalculationResult() {
    if (!originalPrice.value || parseFloat(originalPrice.value) <= 0) {
        alert('Please perform a calculation first before sharing.');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'CommerceCalc Results',
            text: `I saved ${youSaveResult.textContent} (${savingsPercentageResult.textContent}) using CommerceCalc!`,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Web Share API not supported in your browser. Here are your results:\n\n' +
              `Original Price: ${originalPriceResult.textContent}\n` +
              `Discount Applied: ${discountAppliedResult.textContent}\n` +
              `Discounted Price: ${discountedPriceResult.textContent}\n` +
              (taxResultRow.style.display !== 'none' ? `Tax: ${taxAmountResult.textContent}\n` : '') +
              (shippingResultRow.style.display !== 'none' ? `Shipping: ${shippingAmountResult.textContent}\n` : '') +
              (totalResultRow.style.display !== 'none' ? `Total Price: ${totalPriceResult.textContent}\n` : '') +
              `You Save: ${youSaveResult.textContent}\n` +
              `Savings Percentage: ${savingsPercentageResult.textContent}\n` +
              `Effective Price: ${effectivePriceResult.textContent}`);
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    
    // Special handling for specific modals
    if (modalId === 'historyModal') {
        renderPriceHistoryChart();
    } else if (modalId === 'compareModal') {
        refreshPriceComparison();
    }
    
    modal.style.display = 'block';
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Render price history chart
function renderPriceHistoryChart() {
    const ctx = document.getElementById('priceHistoryChart').getContext('2d');
    
    // In a real app, this would come from an API or localStorage
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [100, 90, 110, 95, 85, 80];
    
    // Destroy existing chart if it exists
    if (window.priceHistoryChart) {
        window.priceHistoryChart.destroy();
    }
    
    window.priceHistoryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price History',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Save price alert
function savePriceAlert() {
    if (!alertPrice.value || parseFloat(alertPrice.value) <= 0) {
        alert('Please enter a valid alert price.');
        return;
    }
    
    if (!alertEmail.value || !alertEmail.value.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const alertData = {
        price: parseFloat(alertPrice.value),
        email: alertEmail.value,
        timestamp: new Date().toISOString()
    };
    
    // In a real app, this would be saved to localStorage or sent to a server
    alert(`Price alert set for ${currencySymbols[currencySelect.value]}${alertData.price}. You will be notified at ${alertData.email} when the price drops below this amount.`);
    
    // Clear inputs and close modal
    alertPrice.value = '';
    alertEmail.value = '';
    closeAllModals();
}

// Refresh price comparison
function refreshPriceComparison() {
    const selectedRetailers = Array.from(document.querySelectorAll('input[name="retailer"]:checked')).map(el => el.value);
    
    // In a real app, this would fetch data from an API
    const mockData = {
        amazon: { price: 85, shipping: 5, rating: 4.5 },
        walmart: { price: 90, shipping: 0, rating: 4.2 },
        target: { price: 95, shipping: 0, rating: 4.0 },
        bestbuy: { price: 100, shipping: 0, rating: 4.3 },
        ebay: { price: 80, shipping: 8, rating: 4.1 }
    };
    
    const symbol = currencySymbols[currencySelect.value] || '$';
    
    let html = '';
    
    selectedRetailers.forEach(retailer => {
        if (mockData[retailer]) {
            const data = mockData[retailer];
            const total = data.price + data.shipping;
            
            html += `
                <div class="comparison-item">
                    <div>
                        <strong>${retailer.charAt(0).toUpperCase() + retailer.slice(1)}</strong>
                        <div class="stars">${'★'.repeat(Math.floor(data.rating))}${'☆'.repeat(5 - Math.floor(data.rating))} ${data.rating}</div>
                    </div>
                    <div>
                        <div>Price: ${symbol}${data.price.toFixed(2)}</div>
                        <div>Shipping: ${symbol}${data.shipping.toFixed(2)}</div>
                        <div class="highlight">Total: ${symbol}${total.toFixed(2)}</div>
                    </div>
                </div>
            `;
        }
    });
    
    comparisonResults.innerHTML = html || '<p>No retailers selected for comparison.</p>';
}

// Convert currency amount
function convertCurrencyAmount() {
    if (!convertAmount.value || parseFloat(convertAmount.value) <= 0) {
        alert('Please enter a valid amount to convert.');
        return;
    }
    
    const fromCurrency = convertFrom.value;
    const toCurrency = convertTo.value;
    const amount = parseFloat(convertAmount.value);
    
    // In a real app, this would fetch exchange rates from an API
    const mockRates = {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, AUD: 1.30, CAD: 1.25 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129.53, AUD: 1.53, CAD: 1.47 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 150.75, AUD: 1.78, CAD: 1.71 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, AUD: 0.0118, CAD: 0.0113 },
        AUD: { USD: 0.77, EUR: 0.65, GBP: 0.56, JPY: 84.75, CAD: 0.96 },
        CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.50, AUD: 1.04 }
    };
    
    // Default to 1:1 if we don't have mock data
    let rate = 1;
    let converted = amount;
    
    if (mockRates[fromCurrency] && mockRates[fromCurrency][toCurrency]) {
        rate = mockRates[fromCurrency][toCurrency];
        converted = amount * rate;
    } else if (fromCurrency !== toCurrency) {
        alert('Currency conversion not available in this demo.');
        return;
    }
    
    convertedAmount.textContent = `${currencySymbols[toCurrency] || ''}${converted.toFixed(2)}`;
    exchangeRate.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    exchangeRateDate.textContent = new Date().toLocaleString();
}

// Check API status (mock)
function checkApiStatus() {
    // In a real app, this would check the status of any APIs we're using
    setTimeout(() => {
        document.getElementById('apiStatusText').textContent = 'Online';
        document.getElementById('apiStatusText').style.color = 'green';
    }, 1500);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


















