function copyChapter(event) {
    if (event.keyCode !== 113) return; // not F2
    let story = document.querySelector(".truyen-title").textContent;
    let title = document.querySelector(".chapter-title").textContent;
    let content = document.querySelector(".chapter-c").innerHTML;
    if (content != null) {
        content = content
        .replace(/[^>\r\n]*(nguồn|dịch|tác giả|convert|share|biên|thể loại|hiệu đính|sưu tầm|đả tự)[^<.,:\r\n]*:[^<\r\n]+/igm, "") // Xóa bỏ rác trong text
        .replace(/<br\s*[\/]?>/gi, "\n")  // Xóa các tag HTML <br>, <br />, <p> và xuống dòng
        .replace(/(<([^>]+)>)/ig,"");
    }
    
    let replacement = {
        "{story}": story,
        "{title}": title,
        "{content}": content,
    }
    
    chrome.storage.sync.get(['template'], (data) => {
        let {template} = data;

        for (const key in replacement) {
            template = template.replace(key, replacement[key]);
        }

        navigator.clipboard.writeText(template).then(() => {});
        
    })
    
}

if (window == top) {
    document.addEventListener('keyup', copyChapter, false); //add the keyboard handler
}