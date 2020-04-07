function pasteChapter(event) {
    if (event.keyCode !== 113) return; // not F2
    let textArea = document.querySelector("#QuickReply .bbCodeEditorContainer textarea");
    let time = Date.now();
    if (!textArea) {
        document.querySelector(".redactor_btn_switchmode").click();
    }
    hasTextArea();
    console.log(Date.now()-time);
    
    navigator.clipboard.readText().then(function (text) {
        document.querySelector("#QuickReply .bbCodeEditorContainer textarea").value = text;
    });
}

let timeOut;

function hasTextArea() {
    console.log("checking....");
    
    if (document.querySelector("#QuickReply .bbCodeEditorContainer textarea") !== null) {
        console.log("Done") 
        clearTimeout(timeOut);
        return;
    }    
    timeOut = setTimeout(() => hasTextArea(textArea), 1000);
    
}

if (window == top) {
    document.addEventListener('keyup', pasteChapter, false); //add the keyboard handler
}
