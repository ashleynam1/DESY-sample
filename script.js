// ----------NAVBAR-----------
const tabs = document.querySelectorAll('.nav-tab');
const contents = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove "active" class from all tabs and contents
        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Add "active" class to the clicked tab and corresponding content
        tab.classList.add('active');
        contents[index].classList.add('active');
    });
});

// Show the "Scan" tab and content by default
document.getElementById('scan-tab').classList.add('active');
document.getElementById('scan-content').classList.add('active');


// ----------SCAN PAGE----------
const testBtns = document.getElementsByClassName("runTestButton");

Array.from(testBtns).forEach(btn => {
    btn.addEventListener('click', () => {
        
        updateButtonState(btn);

        parent.postMessage({
        pluginMessage: {
            type: 'runTest',
        }
        }, '*');
    });
});

 // Disable all buttons with the specified class
function updateButtonState(button) {
    document.querySelectorAll('.runTestButton').forEach(disableBtn => {
        disableBtn.disabled = true;
        disableBtn.style.backgroundColor = 'grey';
    });
}




// adding elements to elements list 
onmessage = (event) => {
    const pluginMessage = event.data.pluginMessage;

    // Elements in the scan page
    document.querySelector("#scan-content .main-page-big").style.display = "none";
    document.querySelector("#scan-content .main-page-small").style.display = "none";
    document.querySelector("#scan-content .styles-detected-msg").style.display = "block";

    // Elements in the suggestions page
    document.querySelector("#suggestions-content .main-page-big").style.display = "none";
    document.querySelector("#suggestions-content .main-page-small").style.display = "none";

    // document.querySelector(".main-page-big").style.display = "none";
    // document.querySelector(".main-page-small").style.display = "none";
    // document.querySelector(".styles-detected-msg").style.display = "block";
    document.querySelector("#suggestions-detected-msg").style.display = "block";

    if (pluginMessage.type === 'updateElements') {
        const elementsToFix = pluginMessage.elementsToFix;
        const stylesDetectedMsg = document.getElementById("styles-detected-msg"); // Get the element

        const elementList = document.querySelector('.element-list');
        elementList.innerHTML = ''; // Clear the existing list


        // TEST FOR FRAMES
        var frameNamesList = {};

        if (elementsToFix.length === 0) {
            // Handle the case when there are no items to fix
            const noItemsElement = document.createElement('li');
            noItemsElement.textContent = 'No items to fix.';
            elementList.appendChild(noItemsElement);
        } else {
            // stylesDetectedMsg.textContent = `${elementsToFix.length} element(s) detected with no style applied.`;

            // Iterate through the items to fix and create UI elements for each
            for (const item of elementsToFix) {
               
                // For each item you want to add
                const frame = {
                    parentFrameName: item.parentFrameName, // Example parent frame name
                    parentFrameId: item.parentFrameId,
                    suggestedTextStyle: item.suggestedTextStyle,
                    suggestedPaintStyle: item.suggestedPaintStyle,
                };

                // Create an element object
                const element = {
                    name: item.name,
                    suggestedTextStyle: item.suggestedTextStyle,
                    suggestedPaintStyle: item.suggestedPaintStyle,
                    id: item.id
                };

                // Check if the parentFrameName is already in frameNamesList
                if (!frameNamesList.hasOwnProperty(frame.parentFrameName)) {
                    // If not, create an array for the parentFrameName key and push the element
                    frameNamesList[frame.parentFrameName] = [element];
                } else {
                    // If yes, push the element to the existing array for the parentFrameName key
                    frameNamesList[frame.parentFrameName].push(element);
                }


// can uncomment to go back to regualar elements list 
//                         const elementItem = document.createElement('li');
//                         elementItem.className = 'element';

//                         const elementName = document.createElement('div');
//                         elementName.className = 'element-name';
//                         elementName.textContent = item.name;
//                         elementItem.appendChild(elementName);

//                         if (item.suggestedTextStyle) {
//                             const suggestedTextStyle = document.createElement('div');
//                             suggestedTextStyle.className = 'suggested-text-style';
//                             suggestedTextStyle.textContent = 'Suggested Text Style: ' + item.suggestedTextStyle;
//                             elementItem.appendChild(suggestedTextStyle);
//                         }

//                         if (item.suggestedPaintStyle) {
//                             const suggestedPaintStyle = document.createElement('div');
//                             suggestedPaintStyle.className = 'suggested-paint-style';
//                             suggestedPaintStyle.textContent = 'Suggested Paint Style: ' + item.suggestedPaintStyle;
//                             elementItem.appendChild(suggestedPaintStyle);
//                         }

//  //                       elementList.appendChild(elementItem);


//                         // Create SVG icons for different element types
//                         const textIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"></path></svg>`;
//                         const rectangleIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg>`;
//                         const vectorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>`;
//                         const otherIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M17.867 2.504c-.355-.624-1.381-.623-1.736 0l-3.999 7A1 1 0 0 0 13 11h8a1.001 1.001 0 0 0 .868-1.496l-4.001-7zM3 22h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1zm14.5-9c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5z"></path></svg>';


//                         // Assuming element.type contains the type of the element (e.g., "text", "rectangle", "vector")
//                         const typeContainer = document.createElement('div');
//                         typeContainer.className = 'element-name';
//                         typeContainer.textContent = item.name; // Element title

//                         // Create an icon container
//                         const iconContainer = document.createElement('div');
//                         iconContainer.className = 'element-icon';

//                         // Add the appropriate icon to the icon container based on the element type
//                         let icon;
//                         // console.log(item.type);
//                         switch (item.type) {
//                             case 'TEXT':
//                                 icon = textIcon;
//                                 break;
//                             case 'RECTANGLE':
//                                 icon = rectangleIcon;
//                                 break;
//                             case 'VECTOR':
//                                 icon = vectorIcon;
//                                 break;
//                             default:
//                                 // Use a default icon or handle other types
//                                 icon = otherIcon;
//                         }

//                         // Set the innerHTML of the icon container to the selected icon
//                         iconContainer.innerHTML = icon;

//                         // Append the icon container and element title to the elementItem
//                         elementItem.appendChild(iconContainer);


//                         // adds zoom icon 
//                         const svgIcon = `
//                         <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24";"><circle cx="12" cy="12" r="4"></circle><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path></svg>
//                         `;
                
//                         const iconDiv = document.createElement('div');
//                         iconDiv.className = 'zoom-icon';

//                         // Set the innerHTML of the iconDiv to your SVG icon
//                         iconDiv.innerHTML = svgIcon;
//                         // Add a click event listener to the iconDiv
//                         iconDiv.addEventListener('click', () => {
//                             // Use the Figma Plugin API to select and zoom to the specific element
//                             parent.postMessage({
//                                 pluginMessage: {
//                                     type: 'zoomToElement',
//                                     elementId: item.id, // Provide the ID of the element to zoom to
//                                 }
//                             }, '*');
//                         });

//                         // Append the iconDiv to the elementItem
//                         elementItem.appendChild(iconDiv);


            }

            // .frame is li 
            // .frame-name is div of frame name 

            // frames message
            const framesMsg = document.querySelector("#frames-msg");
            framesMsg.style.display = 'block';
            framesMsg.textContent = `${Object.keys(frameNamesList).length} frame(s) with errors.`;


            // TESTING ADDING FRAMES
            for (const name of Object.keys(frameNamesList)) {
                console.log(name);
                const frameItem = document.createElement('li');
                frameItem.className = 'frame';

                const frameName = document.createElement('div');
                frameName.className = 'frame-name';
                frameName.textContent = name;
                frameItem.appendChild(frameName);

                // add frame icon 
                const svgFrameIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H9V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v6H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h6v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1V9h1zm-3-4h2v2h-2V5zM5 5h2v2H5V5zm2 14H5v-2h2v2zm12 0h-2v-2h2v2zm-2-4h-1a1 1 0 0 0-1 1v1H9v-1a1 1 0 0 0-1-1H7V9h1a1 1 0 0 0 1-1V7h6v1a1 1 0 0 0 1 1h1v6z"></path></svg>';
                const frameIconDiv = document.createElement('div');
                frameIconDiv.className = 'frame-icon';

                frameIconDiv.innerHTML = svgFrameIcon;

                frameItem.appendChild(frameIconDiv);




                const elementList = document.querySelector('.element-list');
                const frameList = document.querySelector('.frame-list');


                frameItem.addEventListener('click', () => {
                    
                    // console.log(frameNamesList[name]);
                    elementList.innerHTML = ''; // Clear the existing elements list
                    //frameList.innerHTML = ''; // Clear the existing frames list


                    const framesListElement = document.querySelector('#frame-list-content');
                    framesListElement.style.display = 'none';



                    // Show the back button
                    const backButton = document.querySelector('.back-button');
                    backButton.style.display = 'flex';
                
                    console.log( "STYLE: " + backButton.style.display);


                    for (item of frameNamesList[name]) {
                        // console.log(item);
                        processElement(item);
                    }
                    framesMsg.style.display = 'none';
                    stylesDetectedMsg.style.display = 'block';
                    stylesDetectedMsg.textContent = `${frameNamesList[name].length} element(s) detected with no style applied.`;                            
                });

                frameList.appendChild(frameItem);
            }



            // Add this event listener outside the loop
            const backButton = document.querySelector('.back-button');
            backButton.addEventListener('click', () => {
                // clear elements count 
                stylesDetectedMsg.style.display = 'none';
                framesMsg.style.display = 'block';
                framesMsg.textContent = `${Object.keys(frameNamesList).length} frame(s) with error.`;


                // Show the frame list
                const framesListElement = document.querySelector('#frame-list-content');
                framesListElement.style.display = 'block';

                // Hide the back button
                backButton.style.display = 'none';

                // Clear the existing element list
                const elementList = document.querySelector('.element-list');
                elementList.innerHTML = '';

            });
        
    } // end else for length > 0
} else if (pluginMessage.type === 'stylingSuggestions') { 
        // console.log("got suggestions message"); // worked
        const suggestionsToMake = pluginMessage.suggestionsToMake;

        const suggestionsDetectedMsg = document.getElementById("suggestions-detected-msg"); // Get the element


        const suggestionsList = document.querySelector('.suggestions-list');
        suggestionsList.innerHTML = ''; // clear existing list 

        if (suggestionsToMake.length === 0) {
            const noSuggestionsElement = document.createElement('li');
            noSuggestionsElement.textContent = 'No items to fix.';
            suggestionsList.appendChild(noSuggestionsElement);
        } else {
            // gets length of two sublists (one is color style one is text style)
            var suggestionAmount = suggestionsToMake[0].length + suggestionsToMake[1].length;
            suggestionsDetectedMsg.textContent = `${suggestionAmount} saved style suggestions created.`;

            for (const item of suggestionsToMake) {
                for (const elt of item) {
                    const styleSpecs = rgbToHex(elt.styleSpecs);
                    const repeats = elt.repeats;
                    const sentence = elt.sentence;
                    // const suggestionTitle = repeats + " items found using " + styleSpecs;
                    // console.log(elt);
                
                    const suggestionElement = document.createElement('li');
                    suggestionElement.className = 'suggestion';
                    const suggestionName = document.createElement('div');
                    suggestionName.className = 'suggestion-name';
                   
                    // adding warning icon 
                    const svgWarnIcon = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path><path d="m21.707 7.293-5-5A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707zM20 15.586 15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z"></path></svg>
                    `;
                    
                    const warnIconDiv = document.createElement('div');
                    warnIconDiv.className = 'warn-icon';

                    warnIconDiv.innerHTML = svgWarnIcon;

                    suggestionElement.appendChild(warnIconDiv);

                    if (elt.type == "text") {
                        suggestionName.textContent = repeats + " elements found with text color " + styleSpecs;
                        suggestionElement.appendChild(suggestionName);
                        const textSuggestion = document.createElement('div');
                        textSuggestion.className = 'text-suggestion';
                        textSuggestion.textContent = "Consider making it a new color style or applying existing color styles to these items.";
                        suggestionElement.appendChild(textSuggestion);
                    }

                    if (elt.type == "color") {
                        suggestionName.textContent = repeats + " elements found with fill color " + styleSpecs;
                        suggestionElement.appendChild(suggestionName);
                        const paintSuggestion = document.createElement('div');
                        paintSuggestion.className = 'paint-suggestion';
                        paintSuggestion.textContent = "Consider making it a new color style or applying existing color styles to these items.";
                        suggestionElement.appendChild(paintSuggestion);
                    }

                    suggestionsList.appendChild(suggestionElement);

                }

            }
        }  

    } 
    // re enables the scan button after any change is made
    else if (pluginMessage.type === 'enableButton') {
        const stylesDetectedMsg2 = document.getElementById("styles-detected-msg");
        stylesDetectedMsg2.style.display = 'none';

        document.querySelectorAll('.runTestButton').forEach(enableBtn => {
            enableBtn.disabled = false;
            enableBtn.style.backgroundColor = '#1366E2';
        });
    } 
    // Generate CSS for paint styles (fills)
    else if (pluginMessage.type === 'cssData') {
    const generatedCSS = pluginMessage.css;

    // Update the textarea with the generated CSS
    document.getElementById('css-textbox').value = generatedCSS;
    } // end get CSS data loop

    else if (pluginMessage.type === 'stylesData') {
        const styles = pluginMessage.styles;

        // Use the received text styles and paint styles as needed
        const savedTextStyles = styles.textStyles;
        const savedPaintStyles = styles.paintStyles;
    } // end loop for get styles CSS data
    
}
// only works with this included - come back to
 // enable all buttons with the specified class
function revertButtonState(button) {
    document.querySelectorAll('.runTestButton').forEach(enableBtn => {
        enableBtn.disabled = false;
        enableBtn.style.backgroundColor = '#1366E2';
    });
}



// export CSS Code
document.getElementById('get-css-button').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'getStyles' } }, '*');
    parent.postMessage({pluginMessage: {type: 'getCSS',},}, '*');
} // end CSS button click

// Copy the generated CSS code to the clipboard
document.getElementById('copy-css-button').onclick = () => {
        const cssTextarea = document.getElementById('css-textbox');
        // Create a range and select the text in the textarea
        const range = document.createRange();
        range.selectNode(cssTextarea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            // Copy the selected text to the clipboard
            document.execCommand('copy');
            console.log('Text copied to clipboard!');
            
            // green border on copy, disappears after 1 second 
            cssTextarea.style.border = '3px solid #00ff00';

            setTimeout(() => {
                cssTextarea.style.border = '3px solid rgba(0,0,0,0)';
            }, 1000);
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        } finally {
            // Clean up by deselecting the text
            window.getSelection().removeAllRanges();
        }
    }; // end copy button click


// comnvert from RGB to HEX
function rgbToHex(rgbValue) {
    // Split the RGB values using the "-" separator
    const rgbArray = rgbValue.split('-').map(Number);

    // Ensure the input values are within the valid range (0-1)
    const r = Math.min(1, Math.max(0, rgbArray[0]));
    const g = Math.min(1, Math.max(0, rgbArray[1]));
    const b = Math.min(1, Math.max(0, rgbArray[2]));

    // Convert the values to integers
    const red = Math.round(r * 255);
    const green = Math.round(g * 255);
    const blue = Math.round(b * 255);

    // Convert to hexadecimal format
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Combine the values to form the hex color code
    const hexColor = `#${redHex}${greenHex}${blueHex}`;

    return hexColor;
}



function processElement(item) {
    const elementList = document.querySelector('.element-list');
    // elementList.innerHTML = ''; // Clear the existing list

    console.log("item: " + item.name);

    const elementItem = document.createElement('li');
                elementItem.className = 'element';

                const elementName = document.createElement('div');
                elementName.className = 'element-name';
                elementName.textContent = item.name;
                elementItem.appendChild(elementName);

                if (item.suggestedTextStyle) {
                    const suggestedTextStyle = document.createElement('div');
                    suggestedTextStyle.className = 'suggested-text-style';
                    suggestedTextStyle.textContent = 'Suggested Text Style: ' + item.suggestedTextStyle;
                    elementItem.appendChild(suggestedTextStyle);
                }

                if (item.suggestedPaintStyle) {
                    const suggestedPaintStyle = document.createElement('div');
                    suggestedPaintStyle.className = 'suggested-paint-style';
                    suggestedPaintStyle.textContent = 'Suggested Paint Style: ' + item.suggestedPaintStyle;
                    elementItem.appendChild(suggestedPaintStyle);
                }

                elementList.appendChild(elementItem);


                // Create SVG icons for different element types
                const textIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M5 8h2V6h3.252L7.68 18H5v2h8v-2h-2.252L13.32 6H17v2h2V4H5z"></path></svg>`;
                const rectangleIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg>`;
                const vectorIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>`;
                const otherIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24";"><path d="M17.867 2.504c-.355-.624-1.381-.623-1.736 0l-3.999 7A1 1 0 0 0 13 11h8a1.001 1.001 0 0 0 .868-1.496l-4.001-7zM3 22h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1zm14.5-9c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5z"></path></svg>';


                // Assuming element.type contains the type of the element (e.g., "text", "rectangle", "vector")
                const typeContainer = document.createElement('div');
                typeContainer.className = 'element-name';
                typeContainer.textContent = item.name; // Element title

                // Create an icon container
                const iconContainer = document.createElement('div');
                iconContainer.className = 'element-icon';

                // Add the appropriate icon to the icon container based on the element type
                let icon;
                // console.log(item.type);
                switch (item.type) {
                    case 'TEXT':
                        icon = textIcon;
                        break;
                    case 'RECTANGLE':
                        icon = rectangleIcon;
                        break;
                    case 'VECTOR':
                        icon = vectorIcon;
                        break;
                    default:
                        // Use a default icon or handle other types
                        icon = otherIcon;
                }

                // Set the innerHTML of the icon container to the selected icon
                iconContainer.innerHTML = icon;

                // Append the icon container and element title to the elementItem
                elementItem.appendChild(iconContainer);

                // adds zoom icon 
                const svgIcon = `
                <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24";"><circle cx="12" cy="12" r="4"></circle><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path></svg>
                `;
                
                const iconDiv = document.createElement('div');
                iconDiv.className = 'zoom-icon';

                // Set the innerHTML of the iconDiv to your SVG icon
                iconDiv.innerHTML = svgIcon;
                // Add a click event listener to the iconDiv
                iconDiv.addEventListener('click', () => {
                    // Use the Figma Plugin API to select and zoom to the specific element
                    parent.postMessage({
                        pluginMessage: {
                            type: 'zoomToElement',
                            elementId: item.id, // Provide the ID of the element to zoom to
                        }
                    }, '*');
                });

                // Append the iconDiv to the elementItem
                elementItem.appendChild(iconDiv);
}