function tooltip(e) {
    if(document.getElementsByClassName('mstrmojo-Editor mstrmojo-MetricIDE dme modal exp') != undefined &&
    document.getElementsByClassName('mstrmojo-Editor mstrmojo-MetricIDE dme modal exp').length != 0 &&
    document.getElementById('dl_wizard_enable') == null) {
        e.stopPropagation();
        var dl_td = document.createElement("td");
        var dl_div_container = document.createElement("div");
        var dl_div_text = document.createElement("div");
        var dl_text = document.createTextNode("DL");
        
        dl_div_container.className = "mstrmojo-Button mstrmojo-ME-link property";
        dl_div_container.id = "dl_wizard_enable";
        dl_div_text.className = "mstrmojo-Button-text ";
        dl_div_container.addEventListener("click", function (e) {
            parseMetricExpression();
            tooltipCanvas.style.display = "block";
            tooltipCanvas.style.maxWidth = "820px";
            tooltipCanvas.style.maxHeight = "600px";
            tooltipCanvas.style.left = e.pageX - 727 + 'px';
            tooltipCanvas.style.top = e.pageY + 20 + 'px';
        });

        dl_div_text.appendChild(dl_text);
        dl_div_container.appendChild(dl_div_text);
        dl_td.appendChild(dl_div_container);
        document.getElementsByClassName("mstrmojo-HBox mstrmojo-ME-formatbar")[0].getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[0].appendChild(dl_td);
        $('[id^=MSTR_DL_Name]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeName')});
        $('[id^=MSTR_DL_Transform]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeTransform')});
        $('[id^=MSTR_DL_NullHandling]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeNullHandling')});
        $('[id^=MSTR_DL_Agg]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeAgg')});
        $('[id^=MSTR_DL_Output]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeOutput')});
        $('[id^=MSTR_DL_TrainMode]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeTrainMode')});
        $('[id^=MSTR_DL_ChampQstat]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeChampQstat')});
        $('[id^=MSTR_DL_Verbose]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeVerbose')});
        $('[id^=MSTR_DL_Network]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeNetwork')});
        $('[id^=MSTR_DL_LossFunction]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeLossFunction')});
        $('[id^=MSTR_DL_Optimizer]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeOptimizer')});        
        $('[id^=MSTR_DL_Metrics]').each(function(id, ele) {autocomplete(document.getElementById(ele.id), 'completeMetrics')});
    };
}

document.addEventListener("select", tooltip);
document.addEventListener("click", tooltip);
