// static/parser_tabs.js - Modularized JS for parser_tabs.html

function showTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(function(pane) {
        pane.style.display = 'none';
    });
    
    // Only set data-active for elements that exist (data table tabs)
    const btnElement = document.getElementById('btn-' + tabId);
    if (btnElement) {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.removeAttribute('data-active');
    });
        btnElement.setAttribute('data-active','1');
    }
    
    document.getElementById('pane-' + tabId).style.display = 'block';

    // --- Helper to populate dropdowns ---
    function populateDropdown(endpoint, selectId) {
        fetch(endpoint, { method: 'GET' })
            .then(resp => resp.json())
            .then(data => {
                const select = document.getElementById(selectId);
                if (!select) return;
                let key = 'bank_codes';
                let defaultText = '-- Select Bank --';
                
                if (selectId.includes('acct-no')) {
                    key = 'acct_nos';
                    defaultText = '-- Select Account --';
                } else if (selectId.includes('month')) {
                    key = 'months';
                    defaultText = '-- Select Month --';
                } else if (selectId.includes('year')) {
                    key = 'years';
                    defaultText = '-- Select Year --';
                }
                
                select.innerHTML = `<option value="">${defaultText}</option>`;
                if (data.success && data[key] && data[key].length) {
                    data[key].forEach(val => {
                        const opt = document.createElement('option');
                        opt.value = val;
                        opt.text = val;
                        select.appendChild(opt);
                    });
                }
                
                // Update button states after populating dropdowns
                updateReportButtonStates();
            })
            .catch(error => {
                console.error('Error fetching dropdown data:', error);
            });
    }
    
    // --- Helper to add event listeners to report dropdowns ---
    function addReportDropdownListeners() {
        // Add change event listeners to all report dropdowns
        const allReportSelects = [
            // Unmatched Bank Report
            'unmatched-bank-code-select',
            'unmatched-acct-no-select',
            'unmatched-statement-month-select',
            'unmatched-statement-year-select',
            // Unmatched Tally Report
            'unmatched-tally-bank-code-select',
            'unmatched-tally-acct-no-select',
            'unmatched-tally-statement-month-select',
            'unmatched-tally-statement-year-select',
            // Bank-Fin Matched Report
            'bank-fin-matched-bank-code-select',
            'bank-fin-matched-acct-no-select',
            'bank-fin-matched-statement-month-select',
            'bank-fin-matched-statement-year-select',
            // Bank-Fin-Tally Matched Report
            'bank-fin-tally-matched-bank-code-select',
            'bank-fin-tally-matched-acct-no-select',
            'bank-fin-tally-matched-statement-month-select',
            'bank-fin-tally-matched-statement-year-select',
            // Bank-Tally Matched Report
            'bank-tally-matched-bank-code-select',
            'bank-tally-matched-acct-no-select',
            'bank-tally-matched-statement-month-select',
            'bank-tally-matched-statement-year-select'
        ];
        
        allReportSelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.addEventListener('change', updateReportButtonStates);
            }
        });
    }
    
    // --- Helper to update report button states ---
    function updateReportButtonStates() {
        // Update Unmatched Bank Report buttons
        const unmatchedBankSelects = [
            'unmatched-bank-code-select',
            'unmatched-acct-no-select', 
            'unmatched-statement-month-select',
            'unmatched-statement-year-select'
        ];
        const unmatchedBankBtn = document.getElementById('unmatched-bank-btn');
        const unmatchedBankExcelBtn = document.getElementById('unmatched-bank-excel-btn');
        if (unmatchedBankBtn && unmatchedBankExcelBtn) {
            const allPopulated = unmatchedBankSelects.every(id => {
                const select = document.getElementById(id);
                return select && select.value;
            });
            unmatchedBankBtn.disabled = !allPopulated;
            unmatchedBankExcelBtn.disabled = !allPopulated;
        }
        
        // Update Unmatched Tally Report buttons
        const unmatchedTallySelects = [
            'unmatched-tally-bank-code-select',
            'unmatched-tally-acct-no-select',
            'unmatched-tally-statement-month-select', 
            'unmatched-tally-statement-year-select'
        ];
        const unmatchedTallyBtn = document.getElementById('unmatched-tally-btn');
        const unmatchedTallyExcelBtn = document.getElementById('unmatched-tally-excel-btn');
        if (unmatchedTallyBtn && unmatchedTallyExcelBtn) {
            const allPopulated = unmatchedTallySelects.every(id => {
                const select = document.getElementById(id);
                return select && select.value;
            });
            unmatchedTallyBtn.disabled = !allPopulated;
            unmatchedTallyExcelBtn.disabled = !allPopulated;
        }
        
        // Update Bank-Fin Matched Report buttons
        const bankFinMatchedSelects = [
            'bank-fin-matched-bank-code-select',
            'bank-fin-matched-acct-no-select',
            'bank-fin-matched-statement-month-select',
            'bank-fin-matched-statement-year-select'
        ];
        const bankFinMatchedBtn = document.getElementById('bank-fin-matched-btn');
        const bankFinMatchedExcelBtn = document.getElementById('bank-fin-matched-excel-btn');
        if (bankFinMatchedBtn && bankFinMatchedExcelBtn) {
            const allPopulated = bankFinMatchedSelects.every(id => {
                const select = document.getElementById(id);
                return select && select.value;
            });
            bankFinMatchedBtn.disabled = !allPopulated;
            bankFinMatchedExcelBtn.disabled = !allPopulated;
        }
        
        // Update Bank-Fin-Tally Matched Report buttons
        const bankFinTallyMatchedSelects = [
            'bank-fin-tally-matched-bank-code-select',
            'bank-fin-tally-matched-acct-no-select',
            'bank-fin-tally-matched-statement-month-select',
            'bank-fin-tally-matched-statement-year-select'
        ];
        const bankFinTallyMatchedBtn = document.getElementById('bank-fin-tally-matched-btn');
        const bankFinTallyMatchedExcelBtn = document.getElementById('bank-fin-tally-matched-excel-btn');
        if (bankFinTallyMatchedBtn && bankFinTallyMatchedExcelBtn) {
            const allPopulated = bankFinTallyMatchedSelects.every(id => {
                const select = document.getElementById(id);
                return select && select.value;
            });
            bankFinTallyMatchedBtn.disabled = !allPopulated;
            bankFinTallyMatchedExcelBtn.disabled = !allPopulated;
        }
        
        // Update Bank-Tally Matched Report buttons
        const bankTallyMatchedSelects = [
            'bank-tally-matched-bank-code-select',
            'bank-tally-matched-acct-no-select',
            'bank-tally-matched-statement-month-select',
            'bank-tally-matched-statement-year-select'
        ];
        const bankTallyMatchedBtn = document.getElementById('bank-tally-matched-btn');
        const bankTallyMatchedExcelBtn = document.getElementById('bank-tally-matched-excel-btn');
        if (bankTallyMatchedBtn && bankTallyMatchedExcelBtn) {
            const allPopulated = bankTallyMatchedSelects.every(id => {
                const select = document.getElementById(id);
                return select && select.value;
            });
            bankTallyMatchedBtn.disabled = !allPopulated;
            bankTallyMatchedExcelBtn.disabled = !allPopulated;
        }
    }

    // --- Bank-Fin Match Tab ---
    if (tabId === 'reconcile') {
        // Populate bank codes dropdown
        populateDropdown('/get_bank_codes', 'bank-code-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('account-number-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    // --- Bank-Fin-Tally Match Tab ---
    if (tabId === 'bft-reconcile') {
        // Populate bank codes dropdown
        populateDropdown('/get_bank_codes', 'bft-bank-code-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('bft-account-number-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    // --- Bank-Tally Match Tab ---
    if (tabId === 'bank-tally-reconcile') {
        // Populate bank codes dropdown
        populateDropdown('/get_bank_codes', 'bank-tally-bank-code-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('bank-tally-account-number-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    // --- Bank Data Table ---
    if (tabId === 'bank-data-table') {
        // Populate all filters
        populateDropdown('/get_bank_codes', 'bank-data-table-bank-code-select');
        populateDropdown('/get_bank_data_acct_nos', 'bank-data-table-acct-no-select');
        populateDropdown('/get_bank_data_statement_months', 'bank-data-table-statement-month-select');
        populateDropdown('/get_bank_data_statement_years', 'bank-data-table-statement-year-select');
        
            // Add event listeners to update button states
    addReportDropdownListeners();
    
    // Initialize button states
    updateReportButtonStates();
        
        const resultDiv = document.getElementById('bank-data-table-result');
        function getFilters() {
            return {
                bank_code: document.getElementById('bank-data-table-bank-code-select').value,
                acct_no: document.getElementById('bank-data-table-acct-no-select').value,
                statement_month: document.getElementById('bank-data-table-statement-month-select').value,
                statement_year: document.getElementById('bank-data-table-statement-year-select').value,
                bf_is_matched: document.getElementById('bank-data-table-bf-is-matched-select').value,
                bft_is_matched: document.getElementById('bank-data-table-bft-is-matched-select').value,
                bt_is_matched: document.getElementById('bank-data-table-bt-is-matched-select').value
            };
        }
        function loadBankDataTable() {
            resultDiv.textContent = 'Loading...';
            fetch('/data_table/bank_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getFilters())
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.success && data.data.length) {
                    const rows = data.data;
                    const columns = data.columns;
                    let html = `<div class='report-table-wrapper'><table class="report-table"><tr>`;
                    columns.forEach(col => { html += `<th>${col}</th>`; });
                    html += '</tr>';
                    rows.forEach(row => {
                        html += '<tr>';
                        columns.forEach(col => { html += `<td>${row[col] === null ? '' : row[col]}</td>`; });
                        html += '</tr>';
                    });
                    html += '</table></div>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                } else if (data.success && data.data.length === 0) {
                    resultDiv.textContent = 'No records found.';
                } else {
                    resultDiv.textContent = data.msg || 'Failed to fetch data.';
                }
            })
            .catch(() => {
                resultDiv.textContent = 'Error fetching data.';
            });
        }
        // Initial load
        loadBankDataTable();
        // Add event listeners to all filters
        [
            'bank-data-table-bank-code-select',
            'bank-data-table-acct-no-select',
            'bank-data-table-statement-month-select',
            'bank-data-table-statement-year-select',
            'bank-data-table-bf-is-matched-select',
            'bank-data-table-bft-is-matched-select',
            'bank-data-table-bt-is-matched-select'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.onchange = loadBankDataTable;
        });
        window.loadBankDataTable = loadBankDataTable;
    }
    // --- Tally Data Table ---
    if (tabId === 'tally-data-table') {
        populateDropdown('/get_tally_bank_codes', 'tally-data-table-bank-code-select');
        populateDropdown('/get_tally_data_acct_nos', 'tally-data-table-acct-no-select');
        populateDropdown('/get_tally_data_statement_months', 'tally-data-table-statement-month-select');
        populateDropdown('/get_tally_data_statement_years', 'tally-data-table-statement-year-select');
        const resultDiv = document.getElementById('tally-data-table-result');
        function getFilters() {
            return {
                bank_code: document.getElementById('tally-data-table-bank-code-select').value,
                acct_no: document.getElementById('tally-data-table-acct-no-select').value,
                statement_month: document.getElementById('tally-data-table-statement-month-select').value,
                statement_year: document.getElementById('tally-data-table-statement-year-select').value,
                bft_is_matched: document.getElementById('tally-data-table-bft-is-matched-select').value,
                bt_is_matched: document.getElementById('tally-data-table-bt-is-matched-select').value
            };
        }
        function loadTallyDataTable() {
            resultDiv.textContent = 'Loading...';
            fetch('/data_table/tally_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getFilters())
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.success && data.data.length) {
                    const rows = data.data;
                    const columns = data.columns;
                    let html = `<div class='report-table-wrapper'><table class="report-table"><tr>`;
                    columns.forEach(col => { html += `<th>${col}</th>`; });
                    html += '</tr>';
                    rows.forEach(row => {
                        html += '<tr>';
                        columns.forEach(col => { html += `<td>${row[col] === null ? '' : row[col]}</td>`; });
                        html += '</tr>';
                    });
                    html += '</table></div>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                } else if (data.success && data.data.length === 0) {
                    resultDiv.textContent = 'No records found.';
                } else {
                    resultDiv.textContent = data.msg || 'Failed to fetch data.';
                }
            })
            .catch(() => {
                resultDiv.textContent = 'Error fetching data.';
            });
        }
        loadTallyDataTable();
        [
            'tally-data-table-bank-code-select',
            'tally-data-table-acct-no-select',
            'tally-data-table-statement-month-select',
            'tally-data-table-statement-year-select',
            'tally-data-table-bft-is-matched-select',
            'tally-data-table-bt-is-matched-select'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.onchange = loadTallyDataTable;
        });
        window.loadTallyDataTable = loadTallyDataTable;
    }
    // --- Finance Data Table ---
    if (tabId === 'finance-data-table') {
        populateDropdown('/get_fin_bank_codes', 'finance-data-table-bank-code-select');
        populateDropdown('/get_fin_data_acct_nos', 'finance-data-table-acct-no-select');
        populateDropdown('/get_fin_data_statement_months', 'finance-data-table-statement-month-select');
        populateDropdown('/get_fin_data_statement_years', 'finance-data-table-statement-year-select');
        const resultDiv = document.getElementById('finance-data-table-result');
        function getFilters() {
            return {
                bank_code: document.getElementById('finance-data-table-bank-code-select').value,
                acct_no: document.getElementById('finance-data-table-acct-no-select').value,
                statement_month: document.getElementById('finance-data-table-statement-month-select').value,
                statement_year: document.getElementById('finance-data-table-statement-year-select').value,
                bf_is_matched: document.getElementById('finance-data-table-bf-is-matched-select').value,
                bft_is_matched: document.getElementById('finance-data-table-bft-is-matched-select').value,
                bt_is_matched: document.getElementById('finance-data-table-bt-is-matched-select').value
            };
        }
        function loadFinanceDataTable() {
            resultDiv.textContent = 'Loading...';
            fetch('/data_table/finance_data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(getFilters())
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.success && data.data.length) {
                    const rows = data.data;
                    const columns = data.columns;
                    let html = `<div class='report-table-wrapper'><table class="report-table"><tr>`;
                    columns.forEach(col => { html += `<th>${col}</th>`; });
                    html += '</tr>';
                    rows.forEach(row => {
                        html += '<tr>';
                        columns.forEach(col => { html += `<td>${row[col] === null ? '' : row[col]}</td>`; });
                        html += '</tr>';
                    });
                    html += '</table></div>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                } else if (data.success && data.data.length === 0) {
                    resultDiv.textContent = 'No records found.';
                } else {
                    resultDiv.textContent = data.msg || 'Failed to fetch data.';
                }
            })
            .catch(() => {
                resultDiv.textContent = 'Error fetching data.';
            });
        }
        loadFinanceDataTable();
        [
            'finance-data-table-bank-code-select',
            'finance-data-table-acct-no-select',
            'finance-data-table-statement-month-select',
            'finance-data-table-statement-year-select',
            'finance-data-table-bf-is-matched-select',
            'finance-data-table-bft-is-matched-select',
            'finance-data-table-bt-is-matched-select'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.onchange = loadFinanceDataTable;
        });
        window.loadFinanceDataTable = loadFinanceDataTable;
    }

    // --- Reports Tabs ---
    if (tabId === 'unmatched-bank-report') {
        populateDropdown('/get_bank_codes', 'unmatched-bank-code-select');
        populateDropdown('/get_statement_years', 'unmatched-statement-year-select');
        populateDropdown('/get_statement_months', 'unmatched-statement-month-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('unmatched-acct-no-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    if (tabId === 'unmatched-tally-report') {
        populateDropdown('/get_tally_bank_codes', 'unmatched-tally-bank-code-select');
        populateDropdown('/get_tally_statement_years', 'unmatched-tally-statement-year-select');
        populateDropdown('/get_tally_statement_months', 'unmatched-tally-statement-month-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('unmatched-tally-acct-no-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    if (tabId === 'bank-fin-matched-report') {
        populateDropdown('/get_bank_codes', 'bank-fin-matched-bank-code-select');
        populateDropdown('/get_statement_years', 'bank-fin-matched-statement-year-select');
        populateDropdown('/get_statement_months', 'bank-fin-matched-statement-month-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('bank-fin-matched-acct-no-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    if (tabId === 'bank-fin-tally-matched-report') {
        populateDropdown('/get_bank_codes', 'bank-fin-tally-matched-bank-code-select');
        populateDropdown('/get_statement_years', 'bank-fin-tally-matched-statement-year-select');
        populateDropdown('/get_statement_months', 'bank-fin-tally-matched-statement-month-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('bank-fin-tally-matched-acct-no-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }

    if (tabId === 'bank-tally-matched-report') {
        populateDropdown('/get_bank_codes', 'bank-tally-matched-bank-code-select');
        populateDropdown('/get_statement_years', 'bank-tally-matched-statement-year-select');
        populateDropdown('/get_statement_months', 'bank-tally-matched-statement-month-select');
        // Clear account dropdown initially
        const accountSelect = document.getElementById('bank-tally-matched-acct-no-select');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">-- Select Account --</option>';
        }
    }
}



document.querySelectorAll('.parser-form').forEach(function(form) {
    if(form.id === "reconcile-form" || form.id === "bft-reconcile-form" || form.id === "bank-tally-reconcile-form") return;

    const fileInput = form.querySelector('.file-input');
    const sheetRow = form.querySelector('[id$="-sheetRow"]');
    const sheetSelect = form.querySelector('.sheet-select');
    const parseBtn = form.querySelector('button[type="submit"]');
    const msgDiv = form.nextElementSibling;
    const uploadedDiv = msgDiv.nextElementSibling;
    let sheetNames = [];
    const parserId = form.id.replace('form-','');

    let bankSelect = null;
    if (parserId === "bank") {
        bankSelect = form.querySelector('#bank-bankSelect');
    }

    function updateParseButtonState() {
        if (parserId === "bank") {
            parseBtn.disabled = !(fileInput && fileInput.files.length && bankSelect && bankSelect.value);
        } else {
            if (sheetSelect && sheetSelect.style.display !== 'none') {
                parseBtn.disabled = !(fileInput && fileInput.files.length && sheetSelect.value);
            } else {
                parseBtn.disabled = !(fileInput && fileInput.files.length);
            }
        }
    }

    if (parserId === "bank" && bankSelect) {
        bankSelect.addEventListener('change', updateParseButtonState);
    }

    if (fileInput) {
    fileInput.addEventListener('change', function(e) {
            if (sheetSelect) sheetSelect.innerHTML = "";
            if (msgDiv) msgDiv.textContent = "";
            if (uploadedDiv) uploadedDiv.textContent = "";
            if (parseBtn) parseBtn.disabled = true;
            if (sheetRow) sheetRow.style.display = "none";
            
            // Update file name display
            const fileChosenSpan = fileInput.nextElementSibling;
            if (fileChosenSpan && fileChosenSpan.classList.contains('file-chosen')) {
                fileChosenSpan.textContent = fileInput.files[0] ? fileInput.files[0].name : 'No file chosen';
            }
            
        if (!fileInput.files.length) {
            updateParseButtonState();
            return;
        }

        const file = fileInput.files[0];
        if (parserId === "bank" && file.name.endsWith('.csv')) {
                if (sheetRow) sheetRow.style.display = "none";
            updateParseButtonState();
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            sheetNames = workbook.SheetNames;

            if (sheetNames.length === 1 && parserId === "bank") {
                    if (sheetRow) sheetRow.style.display = "none";
                    if (sheetSelect) {
                sheetSelect.innerHTML = "";
                var opt = document.createElement('option');
                opt.value = sheetNames[0];
                opt.text = sheetNames[0];
                sheetSelect.appendChild(opt);
                sheetSelect.value = sheetNames[0];
                    }
                updateParseButtonState();
            } else if (sheetNames.length) {
                    if (sheetSelect) {
                sheetSelect.innerHTML = "";
                sheetNames.forEach(function(name) {
                    var opt = document.createElement('option');
                    opt.value = name;
                    opt.text = name;
                    sheetSelect.appendChild(opt);
                });
                    }
                    if (sheetRow) sheetRow.style.display = "flex";
                updateParseButtonState();
            }
        };
        reader.readAsArrayBuffer(file);
    });
    }

    if (sheetSelect) {
        sheetSelect.addEventListener('change', function() {
        updateParseButtonState();
    });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (parseBtn) parseBtn.disabled = true;
        if (msgDiv) msgDiv.textContent = "";
        if (uploadedDiv) uploadedDiv.textContent = "";

        var fileField = fileInput ? fileInput.name : null;
        var sheetName = (sheetSelect && sheetSelect.style.display !== "none") ? sheetSelect.value : "";
        var file = fileInput ? fileInput.files[0] : null;

        var bankName = "";
        if (parserId === "bank" && bankSelect) {
            bankName = bankSelect.value;
            if (!bankName) {
                msgDiv.innerText = "Please select a bank.";
                if (parseBtn) parseBtn.disabled = false;
                return;
            }
        }

        if (!file || (sheetSelect && sheetSelect.style.display !== "none" && !sheetName)) {
            msgDiv.innerText = "Please select file and sheet.";
            if (parseBtn) parseBtn.disabled = false;
            return;
        }
        var formData = new FormData();
        if (fileField && file) formData.append(fileField, file);
        if (sheetName) formData.append('sheet_name', sheetName);
        if (parserId === "bank" && bankName) formData.append('bank_name', bankName);

        var parserRoute = {
            finance: '/parse_finance',
            bank: '/parse_bank',
            tally: '/parse_tally'
        }[parserId];

        fetch(parserRoute, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(resp => {
            if (msgDiv) msgDiv.textContent = resp.msg || "";
            if (resp.success && resp.uploaded_filename) {
                if (uploadedDiv) uploadedDiv.innerHTML = "<b>Uploaded Filename:</b> " + resp.uploaded_filename;
            } else {
                if (uploadedDiv) uploadedDiv.innerHTML = "";
            }
            if (parseBtn) parseBtn.disabled = false;
        })
        .catch(err => {
            if (msgDiv) msgDiv.textContent = "Error uploading or parsing file.";
            if (parseBtn) parseBtn.disabled = false;
        });
    });

    updateParseButtonState();
});





const bankCodeSelect = document.getElementById('bank-code-select');
const accountNumberSelect = document.getElementById('account-number-select');

function fetchAndSetAccounts() {
    const bank_code = bankCodeSelect.value;
    accountNumberSelect.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_accounts', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `bank_code=${encodeURIComponent(bank_code)}`
    })
    .then(resp => resp.json())
    .then(data => {
        accountNumberSelect.innerHTML = '';
        if(data.success && data.accounts.length > 0){
            accountNumberSelect.innerHTML = '<option value="">-- Select Account --</option>';
            data.accounts.forEach(function(acct){
                const opt = document.createElement('option');
                opt.value = acct;
                opt.text = acct;
                accountNumberSelect.appendChild(opt);
            });
        } else {
            accountNumberSelect.innerHTML = '<option value="">No accounts found</option>';
        }
    })
    .catch(() => {
        accountNumberSelect.innerHTML = '<option value="">Error</option>';
    });
}

if (bankCodeSelect) {
    fetchAndSetAccounts();
    bankCodeSelect.addEventListener('change', fetchAndSetAccounts);
}


document.getElementById('reconcile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('reconcile-btn');
    btn.disabled = true;
    btn.textContent = 'Matching...';
    const resultDiv = document.getElementById('reconcile-result');
    resultDiv.textContent = 'Working...';

    const bank_code = document.getElementById('bank-code-select').value;
    const account_number = document.getElementById('account-number-select').value;

    const formData = new URLSearchParams();
    formData.append('bank_code', bank_code);
    formData.append('account_number', account_number);

    fetch('/reconcile', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formData.toString()
    })
    .then(resp => resp.json())
    .then(data => {
        if(data.success) {
            resultDiv.innerText =
                `Matched: ${data.matched_count}\n` +
                `Unmatched (Bank): ${data.unmatched_bank_count}\n` +
                `Unmatched (Finance): ${data.unmatched_finance_count}`;
        } else {
            resultDiv.innerText = data.msg || 'Unknown error';
        }
    })
    .catch(err => {
        resultDiv.innerText = 'Error: ' + err;
    })
    .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Match Transactions';
    });
});




// --- Account dropdown logic for Bank-Fin-Tally Match ---
const bftBankSelect = document.getElementById('bft-bank-code-select');
const bftAcctSelect = document.getElementById('bft-account-number-select');

function fetchBFTAccounts() {
    bftAcctSelect.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_bft_accounts', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `bank_code=${encodeURIComponent(bftBankSelect.value)}`
    })
    .then(r => r.json())
    .then(d => {
        bftAcctSelect.innerHTML = '';
        if(d.success && d.accounts.length) {
            bftAcctSelect.innerHTML = '<option value="">-- Select Account --</option>';
            d.accounts.forEach(a => {
                const opt = document.createElement('option');
                opt.value = a;
                opt.text = a;
                bftAcctSelect.appendChild(opt);
            });
        } else {
            bftAcctSelect.innerHTML = '<option value="">No accounts found</option>';
        }
    })
    .catch(() => {
        bftAcctSelect.innerHTML = '<option value="">Error</option>';
    });
}

if (bftBankSelect) {
    fetchBFTAccounts();
    bftBankSelect.addEventListener('change', fetchBFTAccounts);
}

document.getElementById('bft-reconcile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('bft-reconcile-btn');
    btn.disabled = true;
    btn.textContent = 'Matching...';
    const resultDiv = document.getElementById('bft-reconcile-result');
    resultDiv.textContent = 'Working...';

    const bank_code = bftBankSelect.value;
    const account_number = bftAcctSelect.value;

    const formData = new URLSearchParams();
    formData.append('bank_code', bank_code);
    formData.append('account_number', account_number);

    fetch('/reconcile_bft', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: formData
    })
    .then(resp => resp.json())
    .then(data => {
        if(data.success) {
            resultDiv.innerText =
                `Matched: ${data.matched_count}\n` +
                `Unmatched (BF): ${data.unmatched_bf_count}\n` +
                `Unmatched (Tally): ${data.unmatched_tally_count}`;
        } else {
            resultDiv.innerText = data.msg || 'Unknown error';
        }
    })
    .catch(err => {
        resultDiv.innerText = `Error: ${err}`;
    })
    .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Match Transactions';
    });
});

// --- Account dropdown logic for Bank-Tally Match ---
const btBankSelect = document.getElementById('bank-tally-bank-code-select');
const btAcctSelect = document.getElementById('bank-tally-account-number-select');

function fetchBTAccounts() {
    btAcctSelect.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_accounts', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        // body: `bank_table=${btBankSelect.value === "MDB" ? "mdb_data" : "mtb_data"}`
        body: `bank_code=${encodeURIComponent(btBankSelect.value)}`

    })
    .then(r => r.json())
    .then(d => {
        btAcctSelect.innerHTML = '';
        if(d.success && d.accounts.length) {
            btAcctSelect.innerHTML = '<option value="">-- Select Account --</option>';
            d.accounts.forEach(a => {
                const opt = document.createElement('option');
                opt.value = a;
                opt.text = a;
                btAcctSelect.appendChild(opt);
            });
        } else {
            btAcctSelect.innerHTML = '<option value="">No accounts found</option>';
        }
    })
    .catch(() => {
        btAcctSelect.innerHTML = '<option value="">Error</option>';
    });
}

if (btBankSelect) {
    fetchBTAccounts();
    btBankSelect.addEventListener('change', fetchBTAccounts);
}

document.getElementById('bank-tally-reconcile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('bank-tally-reconcile-btn');
    btn.disabled = true;
    btn.textContent = 'Matching...';
    const resultDiv = document.getElementById('bank-tally-reconcile-result');
    resultDiv.textContent = 'Working...';

    const bank_code = btBankSelect.value;
    const account_number = btAcctSelect.value;

    const formData = new URLSearchParams();
    formData.append('bank_code', bank_code);
    formData.append('account_number', account_number);

    fetch('/bank_tally/reconcile', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: formData
    })
    .then(resp => resp.json())
    .then(data => {
        if(data.success) {
            resultDiv.innerText = `Matched: ${data.matched_count}`;
        } else {
            resultDiv.innerText = data.msg || 'Unknown error';
        }
    })
    .catch(err => {
        resultDiv.innerText = `Error: ${err}`;
    })
    .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Match Transactions';
    });

});

// --- Universal Bank/Account Dropdown Logic (all tabs) ---

function populateBankDropdown(selectId, callback) {
    const bankSelect = document.getElementById(selectId);
    if (!bankSelect) return;
    bankSelect.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_bank_codes', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            bankSelect.innerHTML = '<option value="">-- Select Bank --</option>';
            if (data.success && data.bank_codes.length > 0) {
                data.bank_codes.forEach(function(code) {
                    const opt = document.createElement('option');
                    opt.value = code;
                    opt.text = code;
                    bankSelect.appendChild(opt);
                });
            } else {
                bankSelect.innerHTML = '<option value="">No banks found</option>';
            }
            if (callback) callback();
        })
        .catch(() => {
            bankSelect.innerHTML = '<option value="">Error</option>';
        });
}

function populateAccountDropdown(selectId, bankCode, endpointOverride) {
    const acctSelect = document.getElementById(selectId);
    if (!acctSelect) return;
    if (!bankCode) {
        acctSelect.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    acctSelect.innerHTML = '<option value="">Loading...</option>';
    const endpoint = endpointOverride || `/get_acct_nos?bank_code=${encodeURIComponent(bankCode)}`;
    fetch(endpoint, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            acctSelect.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length > 0) {
                data.acct_nos.forEach(function(acct) {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    acctSelect.appendChild(opt);
                });
            } else {
                acctSelect.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            acctSelect.innerHTML = '<option value="">Error</option>';
        });
}

function populateMonthDropdown(selectId, bankCode, endpointOverride) {
    const monthSelect = document.getElementById(selectId);
    if (!monthSelect) return;
    if (!bankCode) {
        monthSelect.innerHTML = '<option value="">-- Select Month --</option>';
        return;
    }
    monthSelect.innerHTML = '<option value="">Loading...</option>';
    const endpoint = endpointOverride || `/get_statement_months?bank_code=${encodeURIComponent(bankCode)}`;
    fetch(endpoint, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            monthSelect.innerHTML = '<option value="">-- Select Month --</option>';
            if (data.success && data.months.length > 0) {
                data.months.forEach(function(month) {
                    const opt = document.createElement('option');
                    opt.value = month;
                    opt.text = month;
                    monthSelect.appendChild(opt);
                });
            } else {
                monthSelect.innerHTML = '<option value="">No months found</option>';
            }
        })
        .catch(() => {
            monthSelect.innerHTML = '<option value="">Error</option>';
        });
}

function populateYearDropdown(selectId, bankCode, endpointOverride) {
    const yearSelect = document.getElementById(selectId);
    if (!yearSelect) return;
    if (!bankCode) {
        yearSelect.innerHTML = '<option value="">-- Select Year --</option>';
        return;
    }
    yearSelect.innerHTML = '<option value="">Loading...</option>';
    const endpoint = endpointOverride || `/get_statement_years?bank_code=${encodeURIComponent(bankCode)}`;
    fetch(endpoint, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            yearSelect.innerHTML = '<option value="">-- Select Year --</option>';
            if (data.success && data.years.length > 0) {
                data.years.forEach(function(year) {
                    const opt = document.createElement('option');
                    opt.value = year;
                    opt.text = year;
                    yearSelect.appendChild(opt);
                });
            } else {
                yearSelect.innerHTML = '<option value="">No years found</option>';
            }
        })
        .catch(() => {
            yearSelect.innerHTML = '<option value="">Error</option>';
        });
}

// --- Bank-Fin Match Tab ---
if (document.getElementById('bank-code-select')) {
    document.getElementById('bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('account-number-select', bankCode);
    });
}

// --- Bank-Fin-Tally Match Tab ---
if (document.getElementById('bft-bank-code-select')) {
    document.getElementById('bft-bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('bft-account-number-select', bankCode);
    });
}

// --- Bank-Tally Match Tab ---
if (document.getElementById('bank-tally-bank-code-select')) {
    document.getElementById('bank-tally-bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('bank-tally-account-number-select', bankCode);
    });
}

// --- Reports Tab: Unmatched Bank Report ---

// Helper: Fetch unique account numbers for selected bank code
function fetchUnmatchedAcctNos() {
    const bankCode = document.getElementById('unmatched-bank-code-select').value;
    const select = document.getElementById('unmatched-acct-no-select');
    select.innerHTML = '<option value="">Loading...</option>';
    if (!bankCode) {
        select.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    fetch(`/get_acct_nos?bank_code=${encodeURIComponent(bankCode)}`, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length) {
                data.acct_nos.forEach(acct => {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}

// Populate filters on tab show - now handled in showTab function
if (document.getElementById('unmatched-bank-code-select')) {
    document.getElementById('unmatched-bank-code-select').addEventListener('change', fetchUnmatchedAcctNos);
}

// --- Column order for unmatched bank report (custom subset) ---
const unmatchedBankColumnOrder = [
    'S/N', 'bank_uid', 'bank_code', 'acct_no', 'statement_month', 'statement_year',
    'B_Date', 'B_Particulars', 'B_Ref_Cheque', 'B_Withdrawal', 'B_Deposit', 'bank_ven'
];



// Handle form submission
const unmatchedForm = document.getElementById('unmatched-bank-form');
if (unmatchedForm) {
    unmatchedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('unmatched-bank-btn');
    btn.disabled = true;
        btn.textContent = 'Generating...';
        const resultDiv = document.getElementById('unmatched-bank-result');
        resultDiv.textContent = 'Generating report...';

        const bank_code = document.getElementById('unmatched-bank-code-select').value;
        const acct_no = document.getElementById('unmatched-acct-no-select').value;
        const statement_month = document.getElementById('unmatched-statement-month-select').value;
        const statement_year = document.getElementById('unmatched-statement-year-select').value;

        fetch('/reports/unmatched_bank', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bank_code, acct_no, statement_month, statement_year })
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.success) {
                if (data.data.length === 0) {
                    resultDiv.textContent = 'No unmatched records found.';
                } else {
                    // Add serial number to each row
                    const rowsWithSN = data.data.map((row, idx) => ({...row, 'S/N': idx + 1}));
                    // Only display the specified columns, in order
                    const columns = unmatchedBankColumnOrder.filter(col => rowsWithSN[0].hasOwnProperty(col));
                    let html = `<b>Unmatched Records:</b><br><div class='report-table-wrapper'><table class="report-table"><tr>`;
                    // Table headers
                    columns.forEach(key => {
                        html += `<th>${key}</th>`;
                    });
                    html += '</tr></div>';
                    // Table rows
                    rowsWithSN.forEach(row => {
                        html += '<tr>';
                        columns.forEach(key => {
                            let val = row[key];
                            html += `<td>${val === null ? '' : val}</td>`;
                        });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                }
        } else {
                resultDiv.textContent = 'Error: ' + (data.msg || 'Failed to generate report');
        }
    })
    .catch(err => {
        resultDiv.textContent = 'Error: ' + err;
    })
    .finally(() => {
        btn.disabled = false;
            btn.textContent = 'Generate Report';
        });
    });
}

// --- Enable/Disable Generate Report button in Reports tab ---
function updateUnmatchedReportBtnState() {
    const bank = document.getElementById('unmatched-bank-code-select').value;
    const acct = document.getElementById('unmatched-acct-no-select').value;
    const month = document.getElementById('unmatched-statement-month-select').value;
    const year = document.getElementById('unmatched-statement-year-select').value;
    const btn = document.getElementById('unmatched-bank-btn');
    btn.disabled = !(bank && acct && month && year);
}

if (document.getElementById('unmatched-bank-form')) {
    // Disable button by default
    document.getElementById('unmatched-bank-btn').disabled = true;
    // Attach to dropdowns
    document.getElementById('unmatched-bank-code-select').addEventListener('change', updateUnmatchedReportBtnState);
    document.getElementById('unmatched-acct-no-select').addEventListener('change', updateUnmatchedReportBtnState);
    document.getElementById('unmatched-statement-month-select').addEventListener('change', updateUnmatchedReportBtnState);
    document.getElementById('unmatched-statement-year-select').addEventListener('change', updateUnmatchedReportBtnState);
}

// --- Download Excel for Unmatched Bank Report ---
if (document.getElementById('unmatched-bank-form')) {
    // Add Download Excel button if not present
    if (!document.getElementById('unmatched-bank-excel-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'parser-parse-btn';
        btn.id = 'unmatched-bank-excel-btn';
        btn.textContent = 'Download Excel';
    btn.disabled = true;
        document.querySelector('#unmatched-bank-form .parser-row-parse').appendChild(btn);
    }
    // Enable/disable Download Excel button with same logic as Generate Report
    function updateUnmatchedExcelBtnState() {
        const bank = document.getElementById('unmatched-bank-code-select').value;
        const acct = document.getElementById('unmatched-acct-no-select').value;
        const month = document.getElementById('unmatched-statement-month-select').value;
        const year = document.getElementById('unmatched-statement-year-select').value;
        const btn = document.getElementById('unmatched-bank-excel-btn');
        btn.disabled = !(bank && acct && month && year);
    }
    document.getElementById('unmatched-bank-code-select').addEventListener('change', updateUnmatchedExcelBtnState);
    document.getElementById('unmatched-acct-no-select').addEventListener('change', updateUnmatchedExcelBtnState);
    document.getElementById('unmatched-statement-month-select').addEventListener('change', updateUnmatchedExcelBtnState);
    document.getElementById('unmatched-statement-year-select').addEventListener('change', updateUnmatchedExcelBtnState);
    // Download logic
    document.getElementById('unmatched-bank-excel-btn').addEventListener('click', function() {
        const bank_code = document.getElementById('unmatched-bank-code-select').value;
        const acct_no = document.getElementById('unmatched-acct-no-select').value;
        const statement_month = document.getElementById('unmatched-statement-month-select').value;
        const statement_year = document.getElementById('unmatched-statement-year-select').value;
        const payload = { bank_code, acct_no, statement_month, statement_year };
        const btn = this;
    btn.disabled = true;
        btn.textContent = 'Preparing...';
        fetch('/reports/unmatched_bank_excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to download Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'unmatched_bank_report.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            alert('Failed to download Excel report.');
        })
        .finally(() => {
        btn.disabled = false;
            btn.textContent = 'Download Excel';
        });
    });
}

// --- Column order for unmatched tally report (custom subset) ---
const unmatchedTallyColumnOrder = [
    'S/N', 'tally_uid', 'bank_code', 'acct_no', 'statement_month', 'statement_year', 'unit_name',
    'T_Date', 'dr_cr', 'T_Particulars', 'T_Vch_Type', 'T_Vch_No', 'T_Debit', 'T_Credit', 'tally_ven'
];

// --- Helper functions for tally_data dropdowns ---
function fetchUnmatchedTallyBankCodes() {
    const select = document.getElementById('unmatched-tally-bank-code-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_tally_bank_codes', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Bank --</option>';
            if (data.success && data.bank_codes.length) {
                data.bank_codes.forEach(code => {
                    const opt = document.createElement('option');
                    opt.value = code;
                    opt.text = code;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No banks found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchUnmatchedTallyAcctNos() {
    const bankCode = document.getElementById('unmatched-tally-bank-code-select').value;
    const select = document.getElementById('unmatched-tally-acct-no-select');
    select.innerHTML = '<option value="">Loading...</option>';
    if (!bankCode) {
        select.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    fetch(`/get_tally_acct_nos?bank_code=${encodeURIComponent(bankCode)}`, { method: 'GET' })
    .then(resp => resp.json())
    .then(data => {
            select.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length) {
                data.acct_nos.forEach(acct => {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchUnmatchedTallyStatementYears() {
    const select = document.getElementById('unmatched-tally-statement-year-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_tally_statement_years', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Year --</option>';
            if (data.success && data.years.length) {
                data.years.forEach(year => {
                    const opt = document.createElement('option');
                    opt.value = year;
                    opt.text = year;
                    select.appendChild(opt);
                });
        } else {
                select.innerHTML = '<option value="">No years found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchUnmatchedTallyStatementMonths() {
    const select = document.getElementById('unmatched-tally-statement-month-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_tally_statement_months', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Month --</option>';
            if (data.success && data.months.length) {
                data.months.forEach(month => {
                    const opt = document.createElement('option');
                    opt.value = month;
                    opt.text = month;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No months found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}



// Populate filters on tab show for tally - now handled in showTab function
if (document.getElementById('unmatched-tally-bank-code-select')) {
    document.getElementById('unmatched-tally-bank-code-select').addEventListener('change', fetchUnmatchedTallyAcctNos);
}

// Enable/Disable Generate Report button in Tally Reports tab
function updateUnmatchedTallyReportBtnState() {
    const bank = document.getElementById('unmatched-tally-bank-code-select').value;
    const acct = document.getElementById('unmatched-tally-acct-no-select').value;
    const month = document.getElementById('unmatched-tally-statement-month-select').value;
    const year = document.getElementById('unmatched-tally-statement-year-select').value;
    const btn = document.getElementById('unmatched-tally-btn');
    btn.disabled = !(bank && acct && month && year);
}
if (document.getElementById('unmatched-tally-form')) {
    document.getElementById('unmatched-tally-btn').disabled = true;
    document.getElementById('unmatched-tally-bank-code-select').addEventListener('change', updateUnmatchedTallyReportBtnState);
    document.getElementById('unmatched-tally-acct-no-select').addEventListener('change', updateUnmatchedTallyReportBtnState);
    document.getElementById('unmatched-tally-statement-month-select').addEventListener('change', updateUnmatchedTallyReportBtnState);
    document.getElementById('unmatched-tally-statement-year-select').addEventListener('change', updateUnmatchedTallyReportBtnState);
}

// Download Excel button for Tally
if (document.getElementById('unmatched-tally-form')) {
    if (!document.getElementById('unmatched-tally-excel-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'parser-parse-btn';
        btn.id = 'unmatched-tally-excel-btn';
        btn.textContent = 'Download Excel';
    btn.disabled = true;
        document.querySelector('#unmatched-tally-form .parser-row-parse').appendChild(btn);
    }
    function updateUnmatchedTallyExcelBtnState() {
        const bank = document.getElementById('unmatched-tally-bank-code-select').value;
        const acct = document.getElementById('unmatched-tally-acct-no-select').value;
        const month = document.getElementById('unmatched-tally-statement-month-select').value;
        const year = document.getElementById('unmatched-tally-statement-year-select').value;
        const btn = document.getElementById('unmatched-tally-excel-btn');
        btn.disabled = !(bank && acct && month && year);
    }
    document.getElementById('unmatched-tally-bank-code-select').addEventListener('change', updateUnmatchedTallyExcelBtnState);
    document.getElementById('unmatched-tally-acct-no-select').addEventListener('change', updateUnmatchedTallyExcelBtnState);
    document.getElementById('unmatched-tally-statement-month-select').addEventListener('change', updateUnmatchedTallyExcelBtnState);
    document.getElementById('unmatched-tally-statement-year-select').addEventListener('change', updateUnmatchedTallyExcelBtnState);
    document.getElementById('unmatched-tally-excel-btn').addEventListener('click', function() {
        const bank_code = document.getElementById('unmatched-tally-bank-code-select').value;
        const acct_no = document.getElementById('unmatched-tally-acct-no-select').value;
        const statement_month = document.getElementById('unmatched-tally-statement-month-select').value;
        const statement_year = document.getElementById('unmatched-tally-statement-year-select').value;
        const payload = { bank_code, acct_no, statement_month, statement_year };
        const btn = this;
        btn.disabled = true;
        btn.textContent = 'Preparing...';
        fetch('/reports/unmatched_tally_excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to download Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'unmatched_tally_report.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            alert('Failed to download Excel report.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Download Excel';
        });
    });
}

// Handle form submission for Tally
const unmatchedTallyForm = document.getElementById('unmatched-tally-form');
if (unmatchedTallyForm) {
    unmatchedTallyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('unmatched-tally-btn');
        btn.disabled = true;
        btn.textContent = 'Generating...';
        const resultDiv = document.getElementById('unmatched-tally-result');
        resultDiv.textContent = 'Generating report...';
        const bank_code = document.getElementById('unmatched-tally-bank-code-select').value;
        const acct_no = document.getElementById('unmatched-tally-acct-no-select').value;
        const statement_month = document.getElementById('unmatched-tally-statement-month-select').value;
        const statement_year = document.getElementById('unmatched-tally-statement-year-select').value;
        fetch('/reports/unmatched_tally', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bank_code, acct_no, statement_month, statement_year })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                if (data.data.length === 0) {
                    resultDiv.textContent = 'No unmatched records found.';
                } else {
                    // Add serial number to each row
                    const rowsWithSN = data.data.map((row, idx) => ({...row, 'S/N': idx + 1}));
                    // Only display the specified columns, in order
                    const columns = unmatchedTallyColumnOrder.filter(col => rowsWithSN[0].hasOwnProperty(col));
                    let html = `<b>Unmatched Records:</b><br><div class='report-table-wrapper'><table class="report-table"><tr>`;
                    // Table headers
                    columns.forEach(key => {
                        html += `<th>${key}</th>`;
                    });
                    html += '</tr></div>';
                    // Table rows
                    rowsWithSN.forEach(row => {
                        html += '<tr>';
                        columns.forEach(key => {
                            let val = row[key];
                            html += `<td>${val === null ? '' : val}</td>`;
                        });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                }
            } else {
                resultDiv.textContent = 'Error: ' + (data.msg || 'Failed to generate report');
            }
        })
        .catch(err => {
            resultDiv.textContent = 'Error: ' + err;
        })
        .finally(() => {
        btn.disabled = false;
            btn.textContent = 'Generate Report';
        });
    });
}

// --- Bank-Fin Matched Report Tab Logic ---

function fetchBFMatchedBankCodes() {
    const select = document.getElementById('bank-fin-matched-bank-code-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_bank_codes', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Bank --</option>';
            if (data.success && data.bank_codes.length) {
                data.bank_codes.forEach(code => {
                    const opt = document.createElement('option');
                    opt.value = code;
                    opt.text = code;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No banks found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}

function fetchBFMatchedAcctNos() {
    const bankCode = document.getElementById('bank-fin-matched-bank-code-select').value;
    const select = document.getElementById('bank-fin-matched-acct-no-select');
    select.innerHTML = '<option value="">Loading...</option>';
    if (!bankCode) {
        select.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    fetch(`/get_acct_nos?bank_code=${encodeURIComponent(bankCode)}`, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length) {
                data.acct_nos.forEach(acct => {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}

function fetchBFMatchedStatementYears() {
    const select = document.getElementById('bank-fin-matched-statement-year-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_years', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Year --</option>';
            if (data.success && data.years.length) {
                data.years.forEach(year => {
                    const opt = document.createElement('option');
                    opt.value = year;
                    opt.text = year;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No years found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}

function fetchBFMatchedStatementMonths() {
    const select = document.getElementById('bank-fin-matched-statement-month-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_months', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Month --</option>';
            if (data.success && data.months.length) {
                data.months.forEach(month => {
                    const opt = document.createElement('option');
                    opt.value = month;
                    opt.text = month;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No months found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}

// Populate filters on tab show - now handled in showTab function
if (document.getElementById('bank-fin-matched-bank-code-select')) {
    document.getElementById('bank-fin-matched-bank-code-select').addEventListener('change', fetchBFMatchedAcctNos);
}

// Enable/Disable Generate Report button
function updateBFMatchedReportBtnState() {
    const bank = document.getElementById('bank-fin-matched-bank-code-select').value;
    const acct = document.getElementById('bank-fin-matched-acct-no-select').value;
    const month = document.getElementById('bank-fin-matched-statement-month-select').value;
    const year = document.getElementById('bank-fin-matched-statement-year-select').value;
    const btn = document.getElementById('bank-fin-matched-btn');
    btn.disabled = !(bank && acct && month && year);
}
if (document.getElementById('bank-fin-matched-form')) {
    document.getElementById('bank-fin-matched-btn').disabled = true;
    document.getElementById('bank-fin-matched-bank-code-select').addEventListener('change', updateBFMatchedReportBtnState);
    document.getElementById('bank-fin-matched-acct-no-select').addEventListener('change', updateBFMatchedReportBtnState);
    document.getElementById('bank-fin-matched-statement-month-select').addEventListener('change', updateBFMatchedReportBtnState);
    document.getElementById('bank-fin-matched-statement-year-select').addEventListener('change', updateBFMatchedReportBtnState);
}

// --- Column order for Bank-Fin Matched report (custom subset) ---
const bfMatchedColumnOrder = [
    'S/N', 'bf_match_id', 'bf_source', 'bf_match_type', 'bank_uid', 'bank_code', 'acct_no',
    'B_Date', 'B_Particulars', 'B_Ref_Cheque', 'B_Withdrawal', 'B_Deposit', 'bank_ven',
    'statement_month', 'statement_year', 'fin_uid', 'F_Credit_Amount', 'F_Receiver_Name', 'F_Voucher_No', 'fin_ven'
];

// Handle form submission
const bfMatchedForm = document.getElementById('bank-fin-matched-form');
if (bfMatchedForm) {
    bfMatchedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('bank-fin-matched-btn');
        btn.disabled = true;
        btn.textContent = 'Generating...';
        const resultDiv = document.getElementById('bank-fin-matched-result');
        resultDiv.textContent = 'Generating report...';
        const bank_code = document.getElementById('bank-fin-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-fin-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-fin-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-fin-matched-statement-year-select').value;
        fetch('/reports/bank_fin_matched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bank_code, acct_no, statement_month, statement_year })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                if (data.data.length === 0) {
                    resultDiv.textContent = 'No matched records found.';
                } else {
                    // Add serial number to each row
                    const rowsWithSN = data.data.map((row, idx) => ({...row, 'S/N': idx + 1}));
                    // Only display the specified columns, in order
                    const columns = bfMatchedColumnOrder.filter(col => rowsWithSN[0].hasOwnProperty(col));
                    let html = `<b>Matched Records:</b><br><div class='report-table-wrapper'><table class="report-table"><tr>`;
                    // Table headers
                    columns.forEach(key => {
                        html += `<th>${key}</th>`;
                    });
                    html += '</tr></div>';
                    // Table rows
                    rowsWithSN.forEach(row => {
                        html += '<tr>';
                        columns.forEach(key => {
                            let val = row[key];
                            html += `<td>${val === null ? '' : val}</td>`;
                        });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                }
            } else {
                resultDiv.textContent = 'Error: ' + (data.msg || 'Failed to generate report');
            }
        })
        .catch(err => {
            resultDiv.textContent = 'Error: ' + err;
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Generate Report';
        });
    });
}

// --- Bank-Fin Matched Excel Download ---
if (document.getElementById('bank-fin-matched-form')) {
    const excelBtn = document.getElementById('bank-fin-matched-excel-btn');
    excelBtn.disabled = true;
    function updateExcelBtnState() {
        const bank = document.getElementById('bank-fin-matched-bank-code-select').value;
        const acct = document.getElementById('bank-fin-matched-acct-no-select').value;
        const month = document.getElementById('bank-fin-matched-statement-month-select').value;
        const year = document.getElementById('bank-fin-matched-statement-year-select').value;
        excelBtn.disabled = !(bank && acct && month && year);
    }
    document.getElementById('bank-fin-matched-bank-code-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-matched-acct-no-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-matched-statement-month-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-matched-statement-year-select').addEventListener('change', updateExcelBtnState);
    excelBtn.addEventListener('click', function() {
        const bank_code = document.getElementById('bank-fin-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-fin-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-fin-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-fin-matched-statement-year-select').value;
        const payload = { bank_code, acct_no, statement_month, statement_year };
        excelBtn.disabled = true;
        excelBtn.textContent = 'Preparing...';
        fetch('/reports/bank_fin_matched_excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to download Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bank_fin_matched_report.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            alert('Failed to download Excel report.');
        })
        .finally(() => {
            excelBtn.disabled = false;
            excelBtn.textContent = 'Download Excel';
        });
    });
}

// --- Bank-Fin-Tally Matched Report Tab Logic ---
function fetchBFTMatchedBankCodes() {
    const select = document.getElementById('bank-fin-tally-matched-bank-code-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_bank_codes', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Bank --</option>';
            if (data.success && data.bank_codes.length) {
                data.bank_codes.forEach(code => {
                    const opt = document.createElement('option');
                    opt.value = code;
                    opt.text = code;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No banks found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBFTMatchedAcctNos() {
    const bankCode = document.getElementById('bank-fin-tally-matched-bank-code-select').value;
    const select = document.getElementById('bank-fin-tally-matched-acct-no-select');
    select.innerHTML = '<option value="">Loading...</option>';
    if (!bankCode) {
        select.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    fetch(`/get_acct_nos?bank_code=${encodeURIComponent(bankCode)}`, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length) {
                data.acct_nos.forEach(acct => {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBFTMatchedStatementYears() {
    const select = document.getElementById('bank-fin-tally-matched-statement-year-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_years', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Year --</option>';
            if (data.success && data.years.length) {
                data.years.forEach(year => {
                    const opt = document.createElement('option');
                    opt.value = year;
                    opt.text = year;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No years found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBFTMatchedStatementMonths() {
    const select = document.getElementById('bank-fin-tally-matched-statement-month-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_months', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Month --</option>';
            if (data.success && data.months.length) {
                data.months.forEach(month => {
                    const opt = document.createElement('option');
                    opt.value = month;
                    opt.text = month;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No months found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
if (document.getElementById('bank-fin-tally-matched-bank-code-select')) {
    document.getElementById('bank-fin-tally-matched-bank-code-select').addEventListener('change', fetchBFTMatchedAcctNos);
}
function updateBFTMatchedReportBtnState() {
    const bank = document.getElementById('bank-fin-tally-matched-bank-code-select').value;
    const acct = document.getElementById('bank-fin-tally-matched-acct-no-select').value;
    const month = document.getElementById('bank-fin-tally-matched-statement-month-select').value;
    const year = document.getElementById('bank-fin-tally-matched-statement-year-select').value;
    const btn = document.getElementById('bank-fin-tally-matched-btn');
    btn.disabled = !(bank && acct && month && year);
}
if (document.getElementById('bank-fin-tally-matched-form')) {
    document.getElementById('bank-fin-tally-matched-btn').disabled = true;
    document.getElementById('bank-fin-tally-matched-bank-code-select').addEventListener('change', updateBFTMatchedReportBtnState);
    document.getElementById('bank-fin-tally-matched-acct-no-select').addEventListener('change', updateBFTMatchedReportBtnState);
    document.getElementById('bank-fin-tally-matched-statement-month-select').addEventListener('change', updateBFTMatchedReportBtnState);
    document.getElementById('bank-fin-tally-matched-statement-year-select').addEventListener('change', updateBFTMatchedReportBtnState);
}
const bftMatchedColumnOrder = [
    'S/N', 'bft_match_id', 'bft_source', 'bft_match_type', 'bank_uid', 'bank_code', 'acct_no',
    'B_Date', 'B_Particulars', 'B_Ref_Cheque', 'B_Withdrawal', 'B_Deposit', 'bank_ven',
    'fin_uid', 'F_Credit_Amount', 'F_Receiver_Name', 'F_Voucher_No', 'fin_ven',
    'tally_uid', 'T_Date', 'dr_cr', 'T_Particulars', 'T_Vch_No', 'T_Debit', 'T_Credit',
    'tally_ven', 'statement_month', 'statement_year'
];
const bftMatchedForm = document.getElementById('bank-fin-tally-matched-form');
if (bftMatchedForm) {
    bftMatchedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('bank-fin-tally-matched-btn');
        btn.disabled = true;
        btn.textContent = 'Generating...';
        const resultDiv = document.getElementById('bank-fin-tally-matched-result');
        resultDiv.textContent = 'Generating report...';
        const bank_code = document.getElementById('bank-fin-tally-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-fin-tally-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-fin-tally-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-fin-tally-matched-statement-year-select').value;
        fetch('/reports/bank_fin_tally_matched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bank_code, acct_no, statement_month, statement_year })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                if (data.data.length === 0) {
                    resultDiv.textContent = 'No matched records found.';
                } else {
                    const rowsWithSN = data.data.map((row, idx) => ({...row, 'S/N': idx + 1}));
                    const columns = bftMatchedColumnOrder.filter(col => rowsWithSN[0].hasOwnProperty(col));
                    let html = `<b>Matched Records:</b><br><div class='report-table-wrapper'><table class="report-table"><tr>`;
                    columns.forEach(key => { html += `<th>${key}</th>`; });
                    html += '</tr></div>';
                    rowsWithSN.forEach(row => {
                        html += '<tr>';
                        columns.forEach(key => { let val = row[key]; html += `<td>${val === null ? '' : val}</td>`; });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                }
            } else {
                resultDiv.textContent = 'Error: ' + (data.msg || 'Failed to generate report');
            }
        })
        .catch(err => { resultDiv.textContent = 'Error: ' + err; })
        .finally(() => { btn.disabled = false; btn.textContent = 'Generate Report'; });
    });
    // Excel download
    const excelBtn = document.getElementById('bank-fin-tally-matched-excel-btn');
    excelBtn.disabled = true;
    function updateExcelBtnState() {
        const bank = document.getElementById('bank-fin-tally-matched-bank-code-select').value;
        const acct = document.getElementById('bank-fin-tally-matched-acct-no-select').value;
        const month = document.getElementById('bank-fin-tally-matched-statement-month-select').value;
        const year = document.getElementById('bank-fin-tally-matched-statement-year-select').value;
        excelBtn.disabled = !(bank && acct && month && year);
    }
    document.getElementById('bank-fin-tally-matched-bank-code-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-tally-matched-acct-no-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-tally-matched-statement-month-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-fin-tally-matched-statement-year-select').addEventListener('change', updateExcelBtnState);
    excelBtn.addEventListener('click', function() {
        const bank_code = document.getElementById('bank-fin-tally-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-fin-tally-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-fin-tally-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-fin-tally-matched-statement-year-select').value;
        const payload = { bank_code, acct_no, statement_month, statement_year };
        excelBtn.disabled = true;
        excelBtn.textContent = 'Preparing...';
        fetch('/reports/bank_fin_tally_matched_excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to download Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bank_fin_tally_matched_report.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => { alert('Failed to download Excel report.'); })
        .finally(() => { excelBtn.disabled = false; excelBtn.textContent = 'Download Excel'; });
    });
}

// --- Bank-Tally Matched Report Tab Logic ---
function fetchBTMatchedBankCodes() {
    const select = document.getElementById('bank-tally-matched-bank-code-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_bank_codes', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Bank --</option>';
            if (data.success && data.bank_codes.length) {
                data.bank_codes.forEach(code => {
                    const opt = document.createElement('option');
                    opt.value = code;
                    opt.text = code;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No banks found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBTMatchedAcctNos() {
    const bankCode = document.getElementById('bank-tally-matched-bank-code-select').value;
    const select = document.getElementById('bank-tally-matched-acct-no-select');
    select.innerHTML = '<option value="">Loading...</option>';
    if (!bankCode) {
        select.innerHTML = '<option value="">-- Select Account --</option>';
        return;
    }
    fetch(`/get_acct_nos?bank_code=${encodeURIComponent(bankCode)}`, { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Account --</option>';
            if (data.success && data.acct_nos.length) {
                data.acct_nos.forEach(acct => {
                    const opt = document.createElement('option');
                    opt.value = acct;
                    opt.text = acct;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No accounts found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBTMatchedStatementYears() {
    const select = document.getElementById('bank-tally-matched-statement-year-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_years', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Year --</option>';
            if (data.success && data.years.length) {
                data.years.forEach(year => {
                    const opt = document.createElement('option');
                    opt.value = year;
                    opt.text = year;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No years found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
function fetchBTMatchedStatementMonths() {
    const select = document.getElementById('bank-tally-matched-statement-month-select');
    select.innerHTML = '<option value="">Loading...</option>';
    fetch('/get_statement_months', { method: 'GET' })
        .then(resp => resp.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Select Month --</option>';
            if (data.success && data.months.length) {
                data.months.forEach(month => {
                    const opt = document.createElement('option');
                    opt.value = month;
                    opt.text = month;
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option value="">No months found</option>';
            }
        })
        .catch(() => {
            select.innerHTML = '<option value="">Error</option>';
        });
}
if (document.getElementById('bank-tally-matched-bank-code-select')) {
    document.getElementById('bank-tally-matched-bank-code-select').addEventListener('change', fetchBTMatchedAcctNos);
}
function updateBTMatchedReportBtnState() {
    const bank = document.getElementById('bank-tally-matched-bank-code-select').value;
    const acct = document.getElementById('bank-tally-matched-acct-no-select').value;
    const month = document.getElementById('bank-tally-matched-statement-month-select').value;
    const year = document.getElementById('bank-tally-matched-statement-year-select').value;
    const btn = document.getElementById('bank-tally-matched-btn');
    btn.disabled = !(bank && acct && month && year);
}
if (document.getElementById('bank-tally-matched-form')) {
    document.getElementById('bank-tally-matched-btn').disabled = true;
    document.getElementById('bank-tally-matched-bank-code-select').addEventListener('change', updateBTMatchedReportBtnState);
    document.getElementById('bank-tally-matched-acct-no-select').addEventListener('change', updateBTMatchedReportBtnState);
    document.getElementById('bank-tally-matched-statement-month-select').addEventListener('change', updateBTMatchedReportBtnState);
    document.getElementById('bank-tally-matched-statement-year-select').addEventListener('change', updateBTMatchedReportBtnState);
}
const btMatchedColumnOrder = [
    'S/N', 'bt_match_id', 'bt_source', 'bank_uid', 'acct_no', 'bank_code', 'B_Date',
    'B_Particulars', 'B_Ref_Cheque', 'B_Withdrawal', 'B_Deposit', 'bank_ven',
    'tally_uid', 'T_Date', 'dr_cr', 'T_Particulars', 'T_Vch_No', 'T_Debit', 'T_Credit',
    'tally_ven', 'statement_month', 'statement_year'
];
const btMatchedForm = document.getElementById('bank-tally-matched-form');
if (btMatchedForm) {
    btMatchedForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('bank-tally-matched-btn');
        btn.disabled = true;
        btn.textContent = 'Generating...';
        const resultDiv = document.getElementById('bank-tally-matched-result');
        resultDiv.textContent = 'Generating report...';
        const bank_code = document.getElementById('bank-tally-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-tally-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-tally-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-tally-matched-statement-year-select').value;
        fetch('/reports/bank_tally_matched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bank_code, acct_no, statement_month, statement_year })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                if (data.data.length === 0) {
                    resultDiv.textContent = 'No matched records found.';
                } else {
                    const rowsWithSN = data.data.map((row, idx) => ({...row, 'S/N': idx + 1}));
                    const columns = btMatchedColumnOrder.filter(col => rowsWithSN[0].hasOwnProperty(col));
                    let html = `<b>Matched Records:</b><br><div class='report-table-wrapper'><table class="report-table"><tr>`;
                    columns.forEach(key => { html += `<th>${key}</th>`; });
                    html += '</tr></div>';
                    rowsWithSN.forEach(row => {
                        html += '<tr>';
                        columns.forEach(key => { let val = row[key]; html += `<td>${val === null ? '' : val}</td>`; });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                    
                    // Ensure the newly created table fits within viewport
                    const newTable = resultDiv.querySelector('table');
                    if (newTable) {
                        ensureTableFitViewport(newTable);
                    }
                }
            } else {
                resultDiv.textContent = 'Error: ' + (data.msg || 'Failed to generate report');
            }
        })
        .catch(err => { resultDiv.textContent = 'Error: ' + err; })
        .finally(() => { btn.disabled = false; btn.textContent = 'Generate Report'; });
    });
    // Excel download
    const excelBtn = document.getElementById('bank-tally-matched-excel-btn');
    excelBtn.disabled = true;
    function updateExcelBtnState() {
        const bank = document.getElementById('bank-tally-matched-bank-code-select').value;
        const acct = document.getElementById('bank-tally-matched-acct-no-select').value;
        const month = document.getElementById('bank-tally-matched-statement-month-select').value;
        const year = document.getElementById('bank-tally-matched-statement-year-select').value;
        excelBtn.disabled = !(bank && acct && month && year);
    }
    document.getElementById('bank-tally-matched-bank-code-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-tally-matched-acct-no-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-tally-matched-statement-month-select').addEventListener('change', updateExcelBtnState);
    document.getElementById('bank-tally-matched-statement-year-select').addEventListener('change', updateExcelBtnState);
    excelBtn.addEventListener('click', function() {
        const bank_code = document.getElementById('bank-tally-matched-bank-code-select').value;
        const acct_no = document.getElementById('bank-tally-matched-acct-no-select').value;
        const statement_month = document.getElementById('bank-tally-matched-statement-month-select').value;
        const statement_year = document.getElementById('bank-tally-matched-statement-year-select').value;
        const payload = { bank_code, acct_no, statement_month, statement_year };
        excelBtn.disabled = true;
        excelBtn.textContent = 'Preparing...';
        fetch('/reports/bank_tally_matched_excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to download Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bank_tally_matched_report.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => { alert('Failed to download Excel report.'); })
        .finally(() => { excelBtn.disabled = false; excelBtn.textContent = 'Download Excel'; });
    });
}

// --- Data Tables: Bank Data Table ---
if (document.getElementById('bank-data-table-bank-code-select')) {
    document.getElementById('bank-data-table-bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('bank-data-table-acct-no-select', bankCode);
        });
}
// --- Data Tables: Tally Data Table ---
if (document.getElementById('tally-data-table-bank-code-select')) {
    document.getElementById('tally-data-table-bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('tally-data-table-acct-no-select', bankCode);
        });
}
// --- Data Tables: Finance Data Table ---
if (document.getElementById('finance-data-table-bank-code-select')) {
    document.getElementById('finance-data-table-bank-code-select').addEventListener('change', function() {
        const bankCode = this.value;
        populateAccountDropdown('finance-data-table-acct-no-select', bankCode, `/get_fin_data_acct_nos?bank_code=${encodeURIComponent(bankCode)}`);
        populateMonthDropdown('finance-data-table-statement-month-select', bankCode, `/get_fin_data_statement_months?bank_code=${encodeURIComponent(bankCode)}`);
        populateYearDropdown('finance-data-table-statement-year-select', bankCode, `/get_fin_data_statement_years?bank_code=${encodeURIComponent(bankCode)}`);
        });
}

// --- Data Tables: Bank Data Table Form Submission ---
const bankDataTableForm = document.getElementById('bank-data-table-form');
if (bankDataTableForm) {
    bankDataTableForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('bank-data-table-btn');
        btn.disabled = true;
        btn.textContent = 'Loading...';
        const resultDiv = document.getElementById('bank-data-table-result');
        resultDiv.textContent = 'Loading...';
        fetch('/data_table/bank_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success && data.data.length) {
                // Render table
                const rows = data.data;
                const columns = Object.keys(rows[0]);
                let html = `<div class='report-table-wrapper'><table class="report-table"><tr>`;
                columns.forEach(col => { html += `<th>${col}</th>`; });
                html += '</tr>';
                rows.forEach(row => {
                    html += '<tr>';
                    columns.forEach(col => { html += `<td>${row[col] === null ? '' : row[col]}</td>`; });
                    html += '</tr>';
                });
                html += '</table></div>';
                resultDiv.innerHTML = html;
            } else if (data.success && data.data.length === 0) {
                resultDiv.textContent = 'No records found.';
            } else {
                resultDiv.textContent = data.msg || 'Failed to fetch data.';
            }
        })
        .catch(err => {
            resultDiv.textContent = 'Error: ' + err;
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Generate Report';
        });
    });
}

// Add Reset Filters button logic for Bank Data Table
if (document.getElementById('bank-data-table-reset-btn')) {
    document.getElementById('bank-data-table-reset-btn').onclick = function() {
        [
            'bank-data-table-bank-code-select',
            'bank-data-table-acct-no-select',
            'bank-data-table-statement-month-select',
            'bank-data-table-statement-year-select',
            'bank-data-table-bf-is-matched-select',
            'bank-data-table-bft-is-matched-select',
            'bank-data-table-bt-is-matched-select'
        ].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
        });
        if (typeof loadBankDataTable === 'function') loadBankDataTable();
    };
}
// Add Reset Filters button logic for Tally Data Table
if (document.getElementById('tally-data-table-reset-btn')) {
    document.getElementById('tally-data-table-reset-btn').onclick = function() {
        [
            'tally-data-table-bank-code-select',
            'tally-data-table-acct-no-select',
            'tally-data-table-statement-month-select',
            'tally-data-table-statement-year-select',
            'tally-data-table-bft-is-matched-select',
            'tally-data-table-bt-is-matched-select'
        ].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
        });
        if (typeof loadTallyDataTable === 'function') loadTallyDataTable();
    };
}
// Add Reset Filters button logic for Finance Data Table
if (document.getElementById('finance-data-table-reset-btn')) {
    document.getElementById('finance-data-table-reset-btn').onclick = function() {
        [
            'finance-data-table-bank-code-select',
            'finance-data-table-acct-no-select',
            'finance-data-table-statement-month-select',
            'finance-data-table-statement-year-select',
            'finance-data-table-bf-is-matched-select',
            'finance-data-table-bft-is-matched-select',
            'finance-data-table-bt-is-matched-select'
        ].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = '';
        });
        if (typeof loadFinanceDataTable === 'function') loadFinanceDataTable();
    };
}

// Initialize report dropdown listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addReportDropdownListeners();
    updateReportButtonStates();
    
    // Handle window resize to ensure tables fit viewport
    window.addEventListener('resize', function() {
        const allTables = document.querySelectorAll('.report-table');
        allTables.forEach(table => {
            ensureTableFitViewport(table);
        });
    });
});

// --- Helper to ensure tables fit within viewport ---
function ensureTableFitViewport(tableElement) {
    if (!tableElement) return;
    
    // Get the table wrapper
    const wrapper = tableElement.closest('.report-table-wrapper');
    if (wrapper) {
        // Ensure wrapper doesn't exceed viewport width
        const viewportWidth = window.innerWidth;
        const wrapperWidth = wrapper.offsetWidth;
        
        if (wrapperWidth > viewportWidth) {
            wrapper.style.maxWidth = `${viewportWidth - 100}px`; // Leave some margin
            wrapper.style.overflowX = 'auto';
        }
    }
    
    // Add responsive class for mobile
    if (window.innerWidth <= 768) {
        tableElement.classList.add('table-responsive');
    }
}

// --- Data Management Functions ---

// Confirm and execute table truncation
function confirmTruncate(tableType, tableName) {
    const message = tableType === 'all' 
        ? `Are you sure you want to truncate ALL data tables? This will permanently delete all data including:\n\n• Bank Data\n• Finance Data\n• Tally Data\n• All Match Results\n\nThis action CANNOT be undone!`
        : `Are you sure you want to truncate the ${tableName} table? This will permanently delete all data in this table.\n\nThis action CANNOT be undone!`;
    
    if (confirm(message)) {
        if (tableType === 'all') {
            const finalConfirm = confirm('⚠️ FINAL WARNING ⚠️\n\nYou are about to delete ALL DATA from ALL TABLES.\n\nClick OK only if you are absolutely certain you want to proceed.');
            if (!finalConfirm) return;
        }
        
        executeTruncate(tableType, tableName);
    }
}

// Execute truncation request
function executeTruncate(tableType, tableName) {
    const resultDiv = document.getElementById('truncate-result');
    resultDiv.innerHTML = '<div class="alert alert-info">Processing truncation request...</div>';
    
    fetch('/truncate_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table_type: tableType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = `<div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>
                <strong>Success:</strong> ${data.message}
            </div>`;
        } else {
            resultDiv.innerHTML = `<div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Error:</strong> ${data.message}
            </div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Error:</strong> Failed to communicate with server
        </div>`;
    });
}

// Confirm and execute match flag reset
function confirmResetMatches(matchType, matchName) {
    const message = matchType === 'all'
        ? `Are you sure you want to reset ALL match flags? This will:\n\n• Clear all match flags from Bank, Finance, and Tally data tables\n• Delete all entries from match result tables (bf_matched, bft_matched, bt_matched)\n\nOriginal data will be preserved, but all matching work will be lost.`
        : `Are you sure you want to reset ${matchName}? This will clear the match flags and delete related match results.\n\nOriginal data will be preserved, but matching work for this type will be lost.`;
    
    if (confirm(message)) {
        executeResetMatches(matchType, matchName);
    }
}

// Execute reset matches request
function executeResetMatches(matchType, matchName) {
    const resultDiv = document.getElementById('reset-matches-result');
    resultDiv.innerHTML = '<div class="alert alert-info">Processing reset request...</div>';
    
    fetch('/reset_matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            match_type: matchType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = `<div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>
                <strong>Success:</strong> ${data.message}
            </div>`;
        } else {
            resultDiv.innerHTML = `<div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Error:</strong> ${data.message}
            </div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Error:</strong> Failed to communicate with server
        </div>`;
    });
}

