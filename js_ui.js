console.log('BetterWorld - js_ui [START]');

/*
 *
 * https://www.usability.gov/how-to-and-tools/methods/user-interface-elements.html
 *
 * Checkboxes
 * Radio Buttons
 * Dropdown List
 * Buttons
 * Text fields
 * 
 */

//initialize namespace
var js_ui = {};

//global variables
js_ui.global = {};
js_ui.global.rand_ui_ids = [];

//util functions
js_ui.util = {};

js_ui.util.randStrForUIControlID = function() {
    
    var randStr = Date.now() + "_" + Math.random().toString().substr(2);
    
    if (js_ui.global.rand_ui_ids.indexOf(randStr) === -1) {
        
        js_ui.global.rand_ui_ids.push(randStr);

        return randStr;

    } else {

        return js_ui.util.randStrForUIControlID();

    }
}

// internal

//initialize namespace
js_ui.internal = {};

//initialize namespace
js_ui.internal.ui = {};

js_ui.internal.ui.createCheckboxes = function(arrayValues) {

    var divNode = document.createElement('div');
    
    for (var i=0; i<arrayValues.length; i++) {
        
        var checkbox = document.createElement('input');
        $(checkbox).attr('type', 'checkbox');
        $(checkbox).attr('value', arrayValues[i]);

        var id = js_ui.util.randStrForUIControlID();
        $(checkbox).attr('id', id);

        //var textNode = document.createTextNode(arrayValues[i]);
        var labelNode = document.createElement('label');
        $(labelNode).attr('for', id);
        $(labelNode).text(arrayValues[i]);

        $(divNode).append(checkbox);
        //$(divNode).append(textNode);
        $(divNode).append(labelNode);
    }

    return divNode;
}

js_ui.internal.ui.createRadiobuttons = function(radioButtonName, arrayValues) {

    var divNode = document.createElement('div');
    
    for (var i=0; i<arrayValues.length; i++) {
        
        var radioButton = document.createElement('input');
        $(radioButton).attr('type', 'radio');
        $(radioButton).attr('name', radioButtonName);
        $(radioButton).attr('value', arrayValues[i]);

        var id = js_ui.util.randStrForUIControlID();
        $(radioButton).attr('id', id);

        //var textNode = document.createTextNode(arrayValues[i]);
        var labelNode = document.createElement('label');
        $(labelNode).attr('for', id);
        $(labelNode).text(arrayValues[i]);

        $(divNode).append(radioButton);
        //$(divNode).append(textNode);
        $(divNode).append(labelNode);
    }

    return divNode;
}

js_ui.internal.ui.createDropDown = function(arrayValues) {

    var divNode = document.createElement('div');
    var dropDown = document.createElement('select');
    $(divNode).append(dropDown);

    for (var i=0; i<arrayValues.length; i++) {
                        
        var optionNode = document.createElement('option');
        $(optionNode).text(arrayValues[i]);
        
        $(dropDown).append(optionNode);
    }

    return divNode;
}

js_ui.internal.ui.createButton = function(text) {

    var divNode = document.createElement('div');
    var button = document.createElement('button');
    $(button).text(text);
    $(divNode).append(button);

    return divNode;
}

js_ui.internal.ui.createTextbox = function() {

    var divNode = document.createElement('div');
    var textbox = document.createElement('input');
    $(textbox).attr('type', 'text');
        
    $(divNode).append(textbox);

    return divNode;
}

js_ui.internal.translateUITags = function(fromElement, toElement) {
    //1 level translation currently
    var elements = $(fromElement).children();
    var i=0;
    var htmlElement;

    for (i=0; i<elements.length; i++) {
        //console.log(elements[i]);
        htmlElement = js_ui.internal.translateIndividualTag(elements[i]);
        if (null !== htmlElement) {
            $(toElement).append(htmlElement);
        }
    }
}

js_ui.internal.translateIndividualTag = function(element) {
    
    //console.log($(element).prop('tagName'));

    var tagName = $(element).prop('tagName');

    if (tagName == undefined) {
        return;
    }

    switch ( tagName.toLowerCase() ) {

        case 'checkboxes':
            var valueNodes = $(element).find('value');
            var arrayValues = [];
            for (var i=0; i<valueNodes.length; i++) {
                arrayValues.push($(valueNodes[i]).text())
            };
            return js_ui.internal.ui.createCheckboxes(arrayValues);
            break;

        case 'radio':
            var radioButtonName = $(element).find('name').text();
            var valueNodes = $(element).find('value');
            var arrayValues = [];
            for (var i=0; i<valueNodes.length; i++) {
                arrayValues.push($(valueNodes[i]).text())
            };
            return js_ui.internal.ui.createRadiobuttons(radioButtonName, arrayValues);
            break;

        case 'dropdown':
            var valueNodes = $(element).find('option');
            var arrayValues = [];
            for (var i=0; i<valueNodes.length; i++) {
                arrayValues.push($(valueNodes[i]).text())
            };
            return js_ui.internal.ui.createDropDown(arrayValues);
            break;

        case 'button':
            return js_ui.internal.ui.createButton($(element).text());
            break;

        case 'textbox':
            return js_ui.internal.ui.createTextbox();
            break;

        default:
            console.log('tag name cannot be recognized: ' + tagName);
            return null;
            break;
    }

}

// public

js_ui.translateUITags = function(fromIdentifer, toIdentifier) {
    return js_ui.internal.translateUITags(fromIdentifer, toIdentifier);
}

console.log('BetterWorld - js_ui [END]');