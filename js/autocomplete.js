function getMetricsAttributes() {
  var metrics = $('.mstrmojo-Editor.mstrmojo-MetricIDE .ic4');
  var derivedMetrics = $('.mstrmojo-Editor.mstrmojo-MetricIDE .ic4d');
  var attributes = $('.mstrmojo-Editor.mstrmojo-MetricIDE .ic12');
  var arr = [];
  attributes.each(function (id, ele) {arr.push($.trim(ele.innerText).replace(/\u00A0/, " ")+':attribute')})  
  metrics.each(function (id, ele) {arr.push($.trim(ele.innerText).replace(/\u00A0/, " ")+':metric')})
  derivedMetrics.each(function (id, ele) {arr.push($.trim(ele.innerText).replace(/\u00A0/, " ")+':dmetric')})
  return arr;
}

function getParamsFunction (paramsClass) {
  switch (paramsClass) {
    case 'Transform':
      return getTransformFunction ();
    case 'NullHandling':
      return getNullHandlingFunction ();      
    case 'Agg':
      return getAggFunction ();
    case 'Output':
      return getOutputFunction ();
    case 'TrueFalse':
      return getTrueFalseFunction ();
    case 'ChampQstat':
      return getChampQstatFunction ();
    case 'LossFunction':
      return getLossFunction ();
    case 'Optimizer':
      return getOptimizer ();
    case 'Metrics':
      return getMLMetrics ();
    default:
      return [];
  }
}

function getTransformFunction () {
  return ['As-Is', 'Z-Score', 'Min/Max', 'One-Hot', 'Tokenize'];
}

function getNullHandlingFunction () {
  return['As-Is (Null)', 'Mean (Average)', 'Lower (Min)', 'Upper (Max)', 'Common (Mode)', '0', '1', '-1', '?'];
}

function getAggFunction () {
  return ['Min', 'Max', 'Avg', 'Count', 'Sum'];
}

function getOutputFunction () {
  return ['Prediction', 'Probability', 'Partition', 'Fold', 'Acc.Valid', 'Acc.Test', 'Acc.Kfold', 'Loss.Valid', 'Loss.Test', 'Loss.Kfold', 'Loss.Kfolds'];
}

function getTrueFalseFunction () {
  return ['TRUE', 'FALSE'];
}

function getChampQstatFunction () {
  return ['MAPE', 'MASE', 'RMSE', 'MPE', 'ME'].sort();
}

function getLossFunction () {
  return ['mean_squared_error', 'mean_absolute_error', 'mean_absolute_percentage_error', 'mean_squared_logarithmic_error', 'squared_hinge', 'hinge', 'categorical_hinge', 'logcosh', 'categorical_crossentropy', 'sparse_categorical_crossentropy', 'binary_crossentropy', 'kullback_leibler_divergence', 'poisson', 'cosine_proximity'].sort();
}

function getOptimizer () {
  return ['sgd', 'rmsprop', 'adagrad', 'adadelta', 'adam', 'adamax', 'nadam', 'tfoptimizer'].sort();
}

function getMLMetrics () {
  return ['mae', 'acc', 'binary_accuracy', 'categorical_accuracy', 'sparse_categorical_accuracy', 'top_k_categorical_accuracy', 'sparse_top_k_categorical_accuracy'].sort();
}

function upperCaseParam (referenceArray, value) {
  console.log('Ref Array : '+referenceArray);
  for(var i = 0; i < referenceArray.length; i++) {
    console.log(referenceArray[i] + ' - ' + value)
    if (referenceArray[i].toLowerCase() == value.toLowerCase()) {
      return referenceArray[i];
    }
  }
  return value;
}

function networkEditorAction (e) {
  e.stopPropagation();
  var input = e.srcElement;
  var networkEditorDiv = document.createElement('div');
  networkEditorDiv.id = 'MSTR_DL_Network_autocomplete-list';
  networkEditorDiv.className = 'autocomplete-networkmodel';

  var networkEditor = document.createElement('textarea');
  networkEditor.addEventListener('click', function (e) {e.stopPropagation();});
  networkEditor.addEventListener('unfocus', function () {input.value = networkEditor.value;});
  networkEditor.rows = 12;
  networkEditor.cols = 60;
  networkEditor.id = e.srcElement.id+'_networkEditor';
  networkEditor.value = e.srcElement.value;
  networkEditorDiv.appendChild(networkEditor);

  var networkEditorOk = document.createElement('button');
  networkEditorOk.innerText = 'OK';
  networkEditorOk.setAttribute('targetNetwork', e.srcElement.id)
  networkEditorOk.addEventListener('click', function(e) {
    $('#'+e.srcElement.getAttribute('targetNetwork')).val(networkEditor.value);
  });
  networkEditorDiv.appendChild(networkEditorOk);

  e.srcElement.parentNode.appendChild(networkEditorDiv);
}

function displayNetworkEditor (inp) {
  inp.addEventListener('focus', networkEditorAction);
  inp.addEventListener('click', networkEditorAction);
}

function autocomplete(inp, type) {
  var arr = [];
  switch (type) {
    case 'completeName':
      arr = getMetricsAttributes();
      break;
    case 'completeTransform':
      arr = getTransformFunction();
      break;
    case 'completeNullHandling':
      arr = getNullHandlingFunction();
      break;
    case 'completeAgg':
      arr = getAggFunction();
      break;
    case 'completeOutput':
      arr = getOutputFunction();
      break;
    case 'completeNetwork':
      displayNetworkEditor(inp);
      break;
    case 'completeTrainMode':
      arr = getTrueFalseFunction();
      break;
    case 'completeChampQstat':
      arr = getChampQstatFunction();
      break;
    case 'completeVerbose':
      arr = getTrueFalseFunction();
      break;
    case 'completeLossFunction':
      arr = getLossFunction();
      break;
    case 'completeOptimizer':
      arr = getOptimizer();
      break;
    case 'completeMetrics':
      arr = getMLMetrics();
      break;
    default :
      arr = [];
  }
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].split(':')[0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].split(':')[0].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].split(':')[0].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                  e.stopPropagation();
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value.split(':')[0];
                if (document.getElementById(inp.id.replace('Name', 'Transform')).value == '')
                  document.getElementById(inp.id.replace('Name', 'Transform')).value = 'As-Is'
                if (document.getElementById(inp.id.replace('Name', 'NullHandling')).value == '')
                  document.getElementById(inp.id.replace('Name', 'NullHandling')).value = 'As-Is (Null)'
                if (this.getElementsByTagName("input")[0].value.split(':')[1] == 'attribute' && document.getElementById(inp.id.replace('Name', 'Agg')).value == '')
                    document.getElementById(inp.id.replace('Name', 'Agg')).value = 'Max';
                    /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    inp.addEventListener("focus", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].split(':')[0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].split(':')[0].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].split(':')[0].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
                e.stopPropagation();
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value.split(':')[0];
                if (document.getElementById(inp.id.replace('Name', 'Transform')).value == '')
                  document.getElementById(inp.id.replace('Name', 'Transform')).value = 'As-Is'
                if (document.getElementById(inp.id.replace('Name', 'NullHandling')).value == '')
                  document.getElementById(inp.id.replace('Name', 'NullHandling')).value = 'As-Is (Null)'
                if (this.getElementsByTagName("input")[0].value.split(':')[1] == 'attribute' && document.getElementById(inp.id.replace('Name', 'Agg')).value == '')
                    document.getElementById(inp.id.replace('Name', 'Agg')).value = 'Max';
                  /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("click", function(e) {
    e.stopPropagation();
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].split(':')[0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].split(':')[0].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].split(':')[0].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
            e.stopPropagation ();
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value.split(':')[0];
            if (document.getElementById(inp.id.replace('Name', 'Transform')).value == '')
              document.getElementById(inp.id.replace('Name', 'Transform')).value = 'As-Is'
            if (document.getElementById(inp.id.replace('Name', 'NullHandling')).value == '')
              document.getElementById(inp.id.replace('Name', 'NullHandling')).value = 'As-Is (Null)'
            if (this.getElementsByTagName("input")[0].value.split(':')[1] == 'attribute' && document.getElementById(inp.id.replace('Name', 'Agg')).value == '')
                document.getElementById(inp.id.replace('Name', 'Agg')).value = 'Max';
          /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }
    }
});

// inp.addEventListener("focusout", function(e) {closeAllLists()});

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
      if (document.getElementById('MSTR_DL_Network_autocomplete-list') != undefined) {
        document.getElementById('MSTR_DL_Network_autocomplete-list').parentNode.removeChild(document.getElementById('MSTR_DL_Network_autocomplete-list'));
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  tooltipCanvas.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  };

