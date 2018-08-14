function  appendInput(type, id, scope, placeholder, size, style) {
    var inputDiv = document.createElement('div');
    inputDiv.className = 'autocomplete tooltip'
    var input = document.createElement('input');
    input.type = type;
    input.id = 'MSTR_DL_'+id;
    input.setAttribute('data-active', 0);
    input.onchange  = function () { input.value.length == 0 ? input.setAttribute('data-active', 0) : input.setAttribute('data-active', 1) };
    placeholder != '' ? input.placeholder = id + ' (Ex: ' + placeholder + ')' : input.placeholder = id;
    input.size = size;
    input.setAttribute('style', style);
    input.setAttribute('dlScope', scope);
    var infoBubble = document.createElement('span');
    infoBubble.className = 'tooltiptext';
    infoBubble.innerText = input.placeholder;
    inputDiv.appendChild(input);
    inputDiv.appendChild(infoBubble);
    return inputDiv;
};

function addTr (table) {
    var newTr = document.createElement("tr");
    table.appendChild(newTr);
    return newTr;
};

function appendTd (tr, cellContent, style) {
    var newTd = document.createElement("td");
    newTd.setAttribute('style', style);
    if(cellContent != undefined)
        newTd.appendChild(cellContent);
    tr.appendChild(newTd);
    return newTd;
}

function appendTdColSpan (tr, cellContent, style, colspan) {
    var newTd = document.createElement("td");
    newTd.colSpan = colspan;
    newTd.setAttribute('style', style);
    if(cellContent != undefined)
        newTd.appendChild(cellContent);
    tr.appendChild(newTd);
    return newTd;
}

function addVariablesRow (addVariableRowIndex, dlVariablesTable) {
    newTr = addTr(dlVariablesTable);
    appendTd(newTr, appendInput('text', 'Name'+addVariableRowIndex, 'dlVariable', 'Text', 23, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'Transform'+addVariableRowIndex, 'dlVariable', '', 10, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'NullHandling'+addVariableRowIndex, 'dlVariable', '', 18, 'padding: 2px;'), '');
    appendTd(newTr, appendInput('text', 'Agg'+addVariableRowIndex, 'dlVariable', '', 6, 'padding: 2px;'), '');
    $('[id^=MSTR_DL_Name]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeName')});
    $('[id^=MSTR_DL_Transform]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeTransform')});
    $('[id^=MSTR_DL_NullHandling]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeNullHandling')});
    $('[id^=MSTR_DL_Agg]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeAgg')});
return dlVariablesTable;
}

function createButton(buttonId, buttonText, dlFunction) {
    var button = document.createElement("button");
    button.id = buttonId;
    switch(dlFunction) {
        case 'Close':
            button.addEventListener("click", function () { tooltipCanvas.style.display = "none"; });            
            break;
        case 'Export':
            button.addEventListener("click", function () { exportForm(); });
            break;
        case 'CopyFormula':
            button.addEventListener("click", function () {createMetricExpression(); tooltipCanvas.style.display = "none"; });
            break;
        case 'addField':
                button.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if ($('[id^=MSTR_DL_'+buttonId.replace("add", "")+']').length >= 5)
                        alert ('Maximum of 5 fields already added');
                    else {
                        appendTdColSpan($('#'+buttonId).parent().parent()[0], appendInput('text', buttonId.replace('add', '')+($('[id^=MSTR_DL_'+buttonId.replace("add", "")+']').length), 'dlParameter', '', 19, 'padding: 2px;'), '', 1)
                        $('[id^=MSTR_DL_'+buttonId.replace("add", "")+']').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'complete'+buttonId.replace("add", ""))});
                    }
                    var challengersCount = $('[id^=MSTR_DL_Network]').length * 
                                           $('[id^=MSTR_DL_LossFunction]').length * 
                                           $('[id^=MSTR_DL_Optimizer]').length * 
                                           $('[id^=MSTR_DL_Metrics]').length * 
                                           $('[id^=MSTR_DL_NumEpochs]').length * 
                                           $('[id^=MSTR_DL_BatchSize]').length * 
                                           $('[id^=MSTR_DL_Kfold]').length * 
                                           $('[id^=MSTR_DL_PartitionValid]').length * 
                                           $('[id^=MSTR_DL_PartitionTest]').length * 
                                           $('[id^=MSTR_DL_MaxLen]').length * 
                                           $('[id^=MSTR_DL_EmbeddingDim]').length *
                                           $('[id^=MSTR_DL_MaxWords]').length
                    $('#challengersCount')[0].innerText = challengersCount + ' Challenger';
                    if (challengersCount > 1)
                        $('#challengersCount')[0].innerText += 's';
                });
            break;
        default:
            button.addEventListener("click", function () { parseForm(buttonId); $('.mstrmojo-TextBox.mstrmojo-ME-nameInput').val(function () {return $('#MSTR_DL_Name')[0].value+' ('+$(buttonId)[0].textContent+')';})});
    }

    button.setAttribute('style', "padding: 5px;");
    button.setAttribute('dlFunction', dlFunction);
    button.innerText = buttonText;

    return button;
}

function addButton(buttonsDiv, buttonId, buttonText, dlFunction) {
    var spacer = document.createElement('b');
    spacer.innerHTML = '&nbsp;';
    buttonsDiv.appendChild(createButton(buttonId, buttonText, dlFunction));
    return buttonsDiv.appendChild(spacer);
}

function createImage(imageLink, width, height) {
    var myImage = document.createElement('img');
    myImage.src = imageLink;
    myImage.width = width;
    myImage.height = height;
    return myImage;
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();
}

function executeImportForm (txtImport) {
    $('[id^=MSTR_DL_').each (function (id, ele) {ele.value='';})

    if(txtImport == '') {
        return;
    }
    jsonImport = JSON.parse(txtImport);
    for (currentIndex in jsonImport.data){
        if ($('#'+jsonImport.data[currentIndex].name).length == 0) {
            var fieldName = jsonImport.data[currentIndex].name;
            fieldName = fieldName.replace('MSTR_DL_', '');
            fieldName = fieldName.substring(0, fieldName.length - 1);
            if(fieldName.startsWith('Name'))
                $('#addVariable').click();
            else
                $('#add'+fieldName).click();
        }
        if (jsonImport.data[currentIndex].name.startsWith("MSTR_DL_Transform")) {
            switch (jsonImport.data[currentIndex].value) {
                case 'A':
                    jsonImport.data[currentIndex].value = 'As-Is';
                    break;
                case 'Z':
                    jsonImport.data[currentIndex].value = 'Z-Score';
                    break;
                case 'M':
                    jsonImport.data[currentIndex].value = 'Min/Max';
                    break;
                case 'O':
                    jsonImport.data[currentIndex].value = 'One-Hot';
                    break;
                case 'T':
                    jsonImport.data[currentIndex].value = 'Tokenize';
                    break;
            }

        }
        if (jsonImport.data[currentIndex].name.startsWith("MSTR_DL_NullHandling")) {
            switch (jsonImport.data[currentIndex].value) {
                case 'A':
                    jsonImport.data[currentIndex].value = 'As-Is (Null)';
                    break;
                case 'M':
                    jsonImport.data[currentIndex].value = 'Mean (Average)';
                    break;
                case 'L':
                    jsonImport.data[currentIndex].value = 'Lower (Min)';
                    break;
                case 'U':
                    jsonImport.data[currentIndex].value = 'Upper (Max)';
                    break;
                case 'C':
                    jsonImport.data[currentIndex].value = 'Common (Mode)';
                    break;
                case '0':
                    jsonImport.data[currentIndex].value = '0';
                    break;
                case '1':
                    jsonImport.data[currentIndex].value = '1';
                    break;
                case '-':
                    jsonImport.data[currentIndex].value = '-';
                    break;
                case '?':
                    jsonImport.data[currentIndex].value = '?';
                    break;
            }

        }
        $('#'+jsonImport.data[currentIndex].name).val(function () {return jsonImport.data[currentIndex].value;});
    }
}

function importForm (event) {
    txtImport = event.clipboardData.getData('text/plain');
    executeImportForm(txtImport);
}

function exportForm () {
    var exportArray = [];
    
    $("[id^=MSTR_DL_]").each(function (id, ele){
        if ($(ele)[0].value != '') {
            exportArray.push('{"name": "'+$(ele)[0].id + '", "value": "' + $(ele)[0].value+'"}');}
        })
    exportJson = '{ "data": ['+exportArray.join(',')+']}'
    exportJson.replace('_'+$('#MSTR_DL_FileName').val() + '.R', '')
    copyToClipboard(exportJson);
}

function createMetricExpression(buttonId) {
    var trainingMode = upperCaseParam(getTrueFalseFunction(), $('#MSTR_DL_TrainMode').val());
    if (trainingMode != 'TRUE')
        trainingMode = 'FALSE';
    var fullForm = $('[id^=MSTR_DL]');
    fullForm.each(function (id, ele) {ele.setAttribute('data-active', 1)});
    var formContent = $("[data-active=1]");
    console.log(formContent);
    var parsingArray = [];
    var rscript_function = ($("#MSTR_DL_Output").val() == 'Prediction' || $("#MSTR_DL_Output").val() == 'Probability' || $("#MSTR_DL_Output").val() == 'Partition' || $("#MSTR_DL_Output").val() == 'Fold') ? 'RScriptU' : 'RScriptAggU';
    var formula = rscript_function+'<_RScriptFile=';
    formula += '"'+$('#MSTR_DL_RScriptFile')[0].value+'_'+$('#MSTR_DL_FileName').val() + '.R' + '", ';
    $("[id^=MSTR_DL_Name][data-active=1]").each(function (id, ele){parsingArray.push($(ele)[0].value);})
    formula += '_InputNames="'+parsingArray.join(', ')+'", ';
    parsingArray = [];
    formula += '_OutputVar="'+$("#MSTR_DL_Output").val()+'", ';
    formula += '_Params="FileName=\''+$('#MSTR_DL_FileName').val()+'\', ';
    formula += 'TrainMode=\''+trainingMode+'\', ';
    formula += 'ChampQstat=\''+upperCaseParam(getChampQstatFunction(), $('#MSTR_DL_ChampQstat').val())+'\'';
    if (trainingMode == 'TRUE') {
        formula += ', InputNorm=\'';
        $("[id^=MSTR_DL_Transform][data-active=1]").each(function (id, ele){($(ele)[0].value == '')?parsingArray.push('A'):parsingArray.push($(ele)[0].value.charAt(0));})
        formula += parsingArray.join(', ')+'\', ';
        parsingArray = [];
        formula += 'MissingHandling=\'';
        $("[id^=MSTR_DL_NullHandling][data-active=1]").each(function (id, ele){($(ele)[0].value == '')?parsingArray.push('A'):parsingArray.push($(ele)[0].value.charAt(0));})
        formula += parsingArray.join(', ')+'\', ';
        parsingArray = [];
        
        formula += 'Network=\''+joinValues('Network', '|||')+'\', ';
        formula += 'Optimizer=\''+joinValues('Optimizer', ', ')+'\', ';
        formula += 'LossFunction=\''+joinValues('LossFunction', ', ')+'\', ';
        formula += 'Metrics=\''+joinValues('Metrics', ', ')+'\', ';
        formula += $('#MSTR_DL_Verbose')[0].value != '' ? 'Verbose='+$('#MSTR_DL_Verbose')[0].value+', ' : '';
        formula += $('#MSTR_DL_MaxLen')[0].value != '' ? 'MaxLen=\''+joinValues('MaxLen', ', ')+'\', ' : '';
        formula += $('#MSTR_DL_EmbeddingDim')[0].value != '' ? 'EmbeddingDim=\''+joinValues('EmbeddingDim', ', ')+'\', ' : '';
        formula += $('#MSTR_DL_MaxWords')[0].value != '' ? 'MaxWords=\''+joinValues('MaxWords', ', ')+'\', ' : '';
        formula += joinValues('PartitionValid', ', ') != '' ? 'PartitionValid=\''+joinValues('PartitionValid', ', ')+'\', ' : '';
        formula += joinValues('PartitionTest', ', ') != '' ? 'PartitionTest=\''+joinValues('PartitionTest', ', ')+'\', ' : '';
        formula += joinValues('Kfold', ', ') != '' ? 'Kfold=\''+joinValues('Kfold', ', ')+'\', ' : '';
        formula += joinValues('NumEpochs', ', ') != '' ? 'NumEpochs=\''+joinValues('NumEpochs', ', ')+'\', ' : '';
        formula += joinValues('BatchSize', ', ') != '' ? 'BatchSize=\''+joinValues('BatchSize', ', ')+'\'' : '';
    }
    formula += '" >';
    var aggregationFunctions = ($("[id^=MSTR_DL_Agg]"))
    $("[id^=MSTR_DL_Name][data-active=1]").each(function (id, ele){
        if (aggregationFunctions[id].value == '')
            parsingArray.push('['+$(ele)[0].value+']');
        else
            parsingArray.push(aggregationFunctions[id].value+'(['+$(ele)[0].value+'])');
    })
    formula += '('+parsingArray.join(', ')+')';

    copyToClipboard(formula);
};

function jsonizeParamsArray (paramsArray, targetField) {
    var retJson = '';
    var newObject = {};
    var paramValue = '';
    for (var i = 0; i < paramsArray.length; i++) {
        paramValue = paramsArray[i].trim()
        if (targetField == 'Network') {
            console.log('network spotted');
            paramValue = paramValue.replace(/"{1,}/gm, '\\"');
        }
        if (i == 0) {
            newObject = { name: 'MSTR_DL_'+targetField, value: paramValue};
        }
        else {
            newObject = { name: 'MSTR_DL_'+targetField+i, value: paramValue};
        }
        retJson += JSON.stringify(newObject);
        if (i+1 < paramsArray.length)
            retJson += ',';
    }
    return retJson;
}

function parseMetricExpression() {
    var formula = $('.mstrmojo-TokenInputBox-edit')[0].innerText;
    var txtImport = '';
    if (formula.match(/RScript.*U{0,1}/i) != null) {
        var network = formula.match(/Network='(.*?)'/i)[1].split('|||');
        var inputNames = formula.match(/_InputNames="(.*?)"/i)[1].replace(/\u00A0/, "").split(',');
        var inputNorm = formula.match(/InputNorm='(.*?)'/i)[1].replace(/\u00A0/, "").replace(" ", "").split(',');
        var missingHandling = formula.match(/MissingHandling='(.*?)'/i)[1].replace(/\u00A0/, "").replace(" ", "").split(',');
        var optimizer = formula.match(/Optimizer='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var lossFunction = formula.match(/LossFunction='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var metrics = formula.match(/Metrics='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var maxLen = formula.match(/MaxLen='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var embeddingDim = formula.match(/EmbeddingDim='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var maxWords = formula.match(/MaxWords='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var partitionValid = formula.match(/PartitionValid='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var partitionTest = formula.match(/PartitionTest='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var kfold = formula.match(/Kfold='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var numEpochs = formula.match(/NumEpochs='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var batchSize = formula.match(/BatchSize='(.*?)'/i)[1].replace(/\u00A0/, "").split(',');
        var expressionFormulas = formula.match(/RScript.*U{0,1}<.*"\s*>[(](.*)[)$]/i)[1].replace(/\u00A0/, "").replace(" ", "").split(',');
        var aggFunctions = [];
        for (var i = 0; i < expressionFormulas.length; i++) {
            var functionMatchWithLookupForAttributes = expressionFormulas[i].match(/(.*)(<.*=.*>)\>?[\(].*[\)]/i);
            var functionMatchSimple = expressionFormulas[i].match(/(.*)[\(].*[\)]/i);
            functionMatchWithLookupForAttributes != null ? aggFunctions.push(functionMatchWithLookupForAttributes[1])
                                                         : functionMatchSimple != null
                                                            ? aggFunctions.push(functionMatchSimple[1])
                                                            : aggFunctions.push('');
            }

        txtImport = '{ "data": ['+
        '{"name": "MSTR_DL_RScriptFile", "value": "'+formula.match(/_RScriptFile="(.*?)"/i)[1].replace('_'+formula.match(/Filename='(.*?)'/i)[1]+'.R', '')+'"},'+
        '{"name": "MSTR_DL_FileName", "value": "'+formula.match(/Filename='(.*?)'/i)[1]+'"},'+
        '{"name": "MSTR_DL_TrainMode", "value": "'+formula.match(/TrainMode='(.*?)'/i)[1]+'"},'+
        '{"name": "MSTR_DL_ChampQstat", "value": "'+formula.match(/ChampQstat='(.*?)'/i)[1]+'"},'+
        '{"name": "MSTR_DL_Verbose", "value": "'+formula.match(/Verbose=(.*?),/i)[1]+'"},'+
        '{"name": "MSTR_DL_Output", "value": "'+((formula.match(/_OutputVar="(.*?)",/i) == null) ? formula.match(/_OutputVar=(.*?),/i)[1] : formula.match(/_OutputVar="(.*?)",/i)[1])+'"},'+
        jsonizeParamsArray(network, 'Network')+','+
        jsonizeParamsArray(inputNames, 'Name')+','+
        jsonizeParamsArray(inputNorm, 'Transform')+','+
        jsonizeParamsArray(missingHandling, 'NullHandling')+','+
        jsonizeParamsArray(aggFunctions, 'Agg')+','+
        jsonizeParamsArray(optimizer, 'Optimizer')+','+
        jsonizeParamsArray(lossFunction, 'LossFunction')+','+
        jsonizeParamsArray(metrics, 'Metrics')+','+
        jsonizeParamsArray(maxLen, 'MaxLen')+','+
        jsonizeParamsArray(embeddingDim, 'EmbeddingDim')+','+
        jsonizeParamsArray(maxWords, 'MaxWords')+','+
        jsonizeParamsArray(partitionValid, 'PartitionValid')+','+
        jsonizeParamsArray(partitionTest, 'PartitionTest')+','+
        jsonizeParamsArray(kfold, 'Kfold')+','+
        jsonizeParamsArray(numEpochs, 'NumEpochs')+','+
        jsonizeParamsArray(batchSize, 'BatchSize')+
        ']}';
    }
    executeImportForm (txtImport);
}

function joinValues (searchString, joinInput) {
    var retArray = [];
        $('[id^=MSTR_DL_'+searchString+']').each(function (id, ele){
            if($(ele)[0].value != undefined) {
                if(searchString == 'Network') {
                    retArray.push($(ele)[0].value.replace(/"{1,}/g, '""')
                                                .replace(/'/g, "''")
                                                .replace(/\\/g, '')
                                                .replace(/\t/g, " ")
                                                .replace(/\s+/g, " ")
                                                .replace(/\n/g, "''")
                                                .replace(/\r/g, "''"));
                }
                else {
                    console.log('Search: ' + searchString + ' - ' + $(ele)[0].value + ' -> ' + upperCaseParam(getParamsFunction(searchString), $(ele)[0].value));
                    retArray.push(upperCaseParam(getParamsFunction(searchString), $(ele)[0].value));
                }
            }
        })
    return (retArray.join(joinInput));
}