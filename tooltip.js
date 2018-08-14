var tooltipCanvas = document.createElement("div"),
    tooltipMain = document.createElement("div"),
    dlFormTable = document.createElement("table");
    dlFormTable.id = 'deeplearningFormTable';

var dlVariablesTable = document.createElement("table"),
    title1 = document.createElement('h3'); title1.innerText = 'Inputs',
    newTr = addTr(dlVariablesTable),
    appendTd(newTr, title1);
    addVariableDiv = document.createElement('div'),
    addVariableRowIndex = 0;
    appendTd(newTr, addVariableDiv, '');
    addVariableDiv.style.padding = '2px';
    addVariableDiv.innerHTML = 'Add Variable<br />';
    addVariableDiv.id = 'addVariable';
    addVariableDiv.addEventListener('click', function (e) {e.stopPropagation(); addVariablesRow(addVariableRowIndex, dlVariablesTable); addVariableRowIndex++;});
    newTr = addTr(dlVariablesTable);
    appendTd(newTr, appendInput('text', 'Name', 'dlVariable', 'Target', 23, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'Transform', 'dlVariable', '', 10, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'NullHandling', 'dlVariable', '', 18, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'Agg', 'dlVariable', '', 6, 'padding: 2px;'), '');
    for (addVariableRowIndex = 1; addVariableRowIndex <= 1; addVariableRowIndex++) {
        dlVariablesTable = addVariablesRow(addVariableRowIndex, dlVariablesTable);
    };
    dlVariablesTable.id = 'deeplearningVariablesTable';

var dlOutputTable = document.createElement("table"),
    title3 = document.createElement('h3'); title3.innerText = 'Output',
    spacer = document.createElement('b');
    spacer.innerHTML = '&nbsp;&nbsp;&nbsp;';
    newTr = addTr(dlOutputTable);
    appendTd(newTr, title3);
    appendTd(newTr, spacer);
    appendTd(newTr, appendInput('text', 'Output', 'dlVariable', '', 23, 'padding: 2px;'));
    spacer = document.createElement('b');
    spacer.innerHTML = '&nbsp;&nbsp;&nbsp;';
    appendTd(newTr, spacer);
    appendTd(newTr, createButton('copyMetric', 'Copy Metric Expression', 'CopyFormula'));
    dlOutputTable.id = 'deeplearningOutputTable';

var dlParametersTable = document.createElement("table");
var title2 = document.createElement('h3'); title2.innerText = 'Parameters';
var addButton = document.create;
var challengersDiv = document.createElement('div');
challengersDiv.id = 'challengersCount';
challengersDiv.style.padding = '2px';
challengersDiv.innerHTML = '1 Challenger<br />';

newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, title2, '', 2);
appendTd(newTr, challengersDiv, '');
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, undefined, '', 1);
appendTdColSpan(newTr, appendInput('text', 'RScriptFile', 'dlParameter', 'DeepLearning-v1B', 63, 'padding: 2px;'), '', 3);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, undefined, '', 1);
appendTdColSpan(newTr, appendInput('text', 'FileName', 'dlParameter', 'IMDB', 63, 'padding: 2px;'), '', 3);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, undefined, '', 1);
appendTdColSpan(newTr, appendInput('text', 'TrainMode', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'ChampQstat', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'Verbose', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addNetwork', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'Network', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addLossFunction', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'LossFunction', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addOptimizer', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'Optimizer', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addMetrics', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'Metrics', 'dlParameter', '', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addNumEpochs', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'NumEpochs', 'dlParameter', '20', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addBatchSize', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'BatchSize', 'dlParameter', '32', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addKfold', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'Kfold', 'dlParameter', '5', 19, 'padding: 2px;'), 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addPartitionValid', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'PartitionValid', 'dlParameter', '0.3', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addPartitionTest', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'PartitionTest', 'dlParameter', '0.2', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addMaxLen', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'MaxLen', 'dlParameter', '100', 19, 'padding: 2px;'), 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addEmbeddingDim', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'EmbeddingDim', 'dlParameter', '100', 19, 'padding: 2px;'), '', 1);
newTr = addTr(dlParametersTable);
appendTdColSpan(newTr, createButton('addMaxWords', 'Add', 'addField'), '', 1);
appendTdColSpan(newTr, appendInput('text', 'MaxWords', 'dlParameter', '10000', 19, 'padding: 2px;'), '', 1);
dlParametersTable.id = 'deeplearningParametersTable';

var massImport = document.createElement('input');
massImport.id = 'massImport';
massImport.addEventListener('paste', importForm);
massImport.placeholder = 'Paste JSON Function here to import';
massImport.style.width = '100%';

var dlFormTableLeft = document.createElement('table');
newTr = addTr(dlFormTableLeft);
appendTd(newTr, dlVariablesTable, 'vertical-align: top;')
newTr = addTr(dlFormTableLeft);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTableLeft);
appendTdColSpan(newTr, document.createTextNode(''), 'vertical-align: top; border-top: 1pt solid black;', 2);
newTr = addTr(dlFormTableLeft);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTableLeft);
appendTd(newTr, dlOutputTable, 'vertical-align: top;')

var dlFormTableRight = document.createElement('table');
newTr = addTr(dlFormTableRight);
appendTd(newTr, dlParametersTable, 'vertical-align: top;')

spacer = document.createElement('b');
spacer.innerHTML = '&nbsp;&nbsp;&nbsp;';
newTr = addTr(dlFormTable);
appendTd(newTr, dlFormTableLeft, 'vertical-align: top;');
appendTd(newTr, spacer, '');
appendTd(newTr, dlFormTableRight, 'vertical-align: top;');
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createTextNode(''), 'vertical-align: top; border-top: 1pt solid black;', 3);
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, massImport, 'width: 100%', 3)
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createElement('br'));
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createTextNode(''), 'vertical-align: top; border-top: 1pt solid black;', 3);
newTr = addTr(dlFormTable);
appendTdColSpan(newTr, document.createElement('br'));

tooltipCanvas.id = 'dl_wizard_tooltipCanvas';
tooltipCanvas.style.position = "absolute";
tooltipCanvas.style.zIndex = "1000000";
tooltipCanvas.style.padding = "0px";
tooltipCanvas.style.opacity = .95;
tooltipCanvas.style.overflow = 'auto';
tooltipCanvas.style.display = "none";
document.body.appendChild(tooltipCanvas);

tooltipMain.style.padding = "10px";
tooltipMain.style.backgroundColor = "#ffffff";
tooltipMain.style.boxShadow = "1px 1px 1px 1px #9a9a9a";
tooltipMain.style.borderStyle = 'dashed';
tooltipMain.style.borderWidth = '2px'
tooltipMain.style.borderColor = '#9a9a9a';
tooltipMain.style.borderRadius = "5px";
tooltipMain.style.overflow = 'auto';

var mainTitle = document.createElement('h1');
mainTitle.style.padding = '0px 3px 0px 3px';
mainTitle.innerHTML = 'MicroStrategy <font color=blue>Deep Learning</font> Wizard';

var mainTitleTable = document.createElement('table');
mainTitleTable.setAttribute('width', '100%');
newTr = addTr(mainTitleTable);
appendTdColSpan(newTr, mainTitle, '', 7);
appendTdColSpan(newTr, createImage(chrome.extension.getURL('images/tensorflowlogo.png'), 20, 20), 'align: center; width: 24px;', 1);
appendTdColSpan(newTr, createImage(chrome.extension.getURL('images/keraslogo.png'), 69, 20), 'align: center; width: 73px;', 1);
appendTdColSpan(newTr, createImage(chrome.extension.getURL('images/rlogo.png'), 21, 20), 'align: center; width: 25px;', 1);
appendTdColSpan(newTr, document.createTextNode('    '), '', 1);
appendTdColSpan(newTr, createButton('closeTop', 'Close', 'Close'), '', 1);
appendTdColSpan(newTr, createButton('exportTop', 'Export', 'Export'), '', 1);

tooltipMain.appendChild(mainTitleTable);
tooltipMain.appendChild(dlFormTable);
tooltipCanvas.appendChild(tooltipMain);