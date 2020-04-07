function saveOptions() {
    let templateOption = document.getElementById("template").value;
    
    if (templateOption == "" || typeof templateOption == 'object') {        
        restoreDefaultConfig();
        return;
    }
    saveTemplate(templateOption);
}

function getDefaultTemplateConfig() {
    let template = `[CENTER][FONT=Book Antiqua][COLOR=#006600][SIZE=7][B]{story}[/B][/SIZE][/COLOR][/FONT]\n`
    template += `[B][FONT=Book Antiqua]\n`;
    template += `Tên tác giả\n`
    template += `[/FONT][/B]\n`;
    template += `[B][FONT=Book Antiqua]Sưu: Hải[/FONT][/B]\n`
    template += `[FONT=Book Antiqua][SIZE=6][B]{title}[/B][/SIZE][/FONT][/CENTER]\n`;
    template += `[SPOILER]{content}[/SPOILER]\n`;
    return template;
}

function restoreDefaultConfig() {  

    const template = getDefaultTemplateConfig();
    
    saveTemplate(template);

    document.getElementById("template").value = template;

}

function saveTemplate(template) {
    chrome.storage.sync.set({
        template: template
    }, () => {
        let alertBox =  document.getElementById("save_alert");
        alertBox.removeAttribute("hidden");
        setTimeout(() => {
            if (!alertBox.hasAttribute("hidden")) {
                alertBox.setAttribute("hidden", true);
            }
        }, 1000);
    })
}

function restoreOptions() {
    chrome.storage.sync.get({
        template: template
    }, (data) => {
        let {template} = data;
        
        document.getElementById("template").value = template;
    })
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save_template").addEventListener("click", saveOptions);
document.getElementById("reset_template").addEventListener("click", restoreDefaultConfig);

// [CENTER][FONT=Book Antiqua][COLOR=#006600][SIZE=7][B]{story}[/B][/SIZE][/COLOR][/FONT]
// [B][FONT=Book Antiqua]{author}[/FONT][/B]

// [FONT=Book Antiqua][SIZE=6][B]{title}[/B][/SIZE][/FONT]
// [/CENTER]
// [SPOILER]{content}[/SPOILER]