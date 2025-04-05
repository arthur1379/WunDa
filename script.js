// 使用者身份相關變數
let role = "teacher"; // 使用者身份（'teacher', 'student', 'guest', 'researcher'）
let lessonOpen = false; // 教案是否開啟
let lessonTime = 0; // 教案體驗時間（秒）

// 教案設定
const urlParams = new URLSearchParams(window.location.search);
let lessonCode = urlParams.get('code') || 1234; // 沒有值就預設為 0
console.log("接收到的教室密碼：", lessonCode);

// 單元完成狀態
let unit1Done = false; // 單元一 是否完成
let unit2Done = false; // 單元二 是否完成
let unit3Done = false; // 單元三 是否完成

// 單元二 - 任務一
let u2t1Height = 0.0; // 單元二任務一 高度測量（公尺）
let u2t1Qty = 0.0; // 單元二任務一 數量測量

// 單元二 - 任務二
const u2t2Holes = [{ x: 100, y: 200 }]; // 單元二任務二 蛀蝕孔洞座標（物件陣列）

// 單元二 - 任務三
const u2t3Emergence = [{ x: 150, y: 250 }]; // 單元二任務三 羽化孔洞座標（物件陣列）

// 單元二 - 任務四
let u2t4ImgOpt = 1; // 單元二任務四 圖片選擇索引（選擇的圖片索引）

// 單元二 - 任務五
let u2t5Branches = 0; // 單元二任務五 樹枝數量

//好像用不到了
const unit = [
    {
        name:"組別A",
        students:["組員一","組員二","組員三","組員四"],
        treeid:1232112,
        img:"img.png",
        finish:[true,true,false]
    },
    {
        name:"組別B",
        students:["組員二","組員三","組員四"],
        treeid:1232,
        img:"img.png",
        finish:[true,false,true]
    },
    {
        name:"組別C",
        students:["組員一","組員三","組員四"],
        treeid:12112,
        img:"img.png",
        finish:[false,true,false]
    },
    {
        name:"組別D",
        students:["組員一","組員二","組員四"],
        treeid:2112,
        img:"img.png",
        finish:[false,false,false]
    },

]

// 課程資訊 [須即時更新]
if (window.location.pathname === "index_teacher.html") {
    document.getElementById("password").textContent = "123456";
}
document.getElementById("start-time").textContent = "14:00";
document.getElementById("elapsed-time").textContent = "00:00:00";
document.getElementById("participants").textContent = "5組20人";
document.getElementById("completion-rate").textContent = "45";


// 單元描述
const list = ["描述1","描述2","描述3"]
const forde = document.getElementsByClassName("forde");

for(let i = 0; i<list.length; i++){
    for(let j = 0; j<list.length; j++){
        console.log(i + "" + j)
        forde[i].innerHTML += "<p>"+ list[j] +"</p>";
    }
}

//計時功能(目前切換頁面回來還是會重製)

document.getElementById("startTimer").addEventListener("click", () => {
    if (!lessonOpen) {
        lessonOpen = true; // 強制開啟教案，後續可移除
        startLessonTimer();
    }
});

function startLessonTimer() {
    timerInterval = setInterval(() => {
        lessonTime++;
        document.getElementById("elapsed-time").textContent = formatTime(lessonTime);
    }, 1000); // 每秒更新
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}

/*----------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    loadMediaLibrary();
});

/* 開啟媒體庫 */
function openMediaLibrary() {
    document.getElementById("mediaLibrary").style.display = "flex";
    let overlay = document.getElementById("mediaLibrary");
    overlay.classList.add("show");
}

/* 關閉媒體庫 */
function closeMediaLibrary() {
    document.getElementById("mediaLibrary").style.display = "none";
    let overlay = document.getElementById("mediaLibrary");
    overlay.classList.remove("show");

    // 確保動畫執行完畢後隱藏
    setTimeout(() => {
        overlay.style.display = "none";
    }, 300);
}

/* 動態載入媒體Layout */
function loadMediaLibrary() {
    const mediaGrid = document.querySelector(".media-grid");
    mediaGrid.innerHTML = "";

    // 模擬 30 個媒體項目
    for (let i = 0; i < 30; i++) {
        let mediaItem = document.createElement("div");
        mediaItem.classList.add("media-item");
        mediaItem.dataset.index = i;

        // 加入播放按鈕圖示
        if (Math.random() > 0.8) { // 模擬部分媒體有播放按鈕
            let playIcon = document.createElement("i");
            playIcon.classList.add("fa-solid", "fa-play");
            mediaItem.appendChild(playIcon);
        }

        mediaItem.addEventListener("click", () => selectMedia(mediaItem));
        mediaGrid.appendChild(mediaItem);
    }
}

/* 選擇媒體項目 */
function selectMedia(element) {
    document.querySelectorAll(".media-item").forEach(item => item.classList.remove("selected"));
    element.classList.add("selected");
}

/* 播放選擇的媒體 */
function playSelectedMedia() {
    const selectedMedia = document.querySelector(".media-item.selected");

    if (selectedMedia) {
        alert("播放媒體 #" + selectedMedia.dataset.index);
    } else {
        alert("請選擇一個媒體項目！");
    }
}

/*觀察報告功能*/
document.addEventListener("DOMContentLoaded", () => {
    const reportButton = document.querySelector(".report-button");

    reportButton.addEventListener("click", () => {
        alert("等待耀霆老師確認功能中....");
    });
});