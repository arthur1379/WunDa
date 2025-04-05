function setupCanvasWithDelete(canvasId, savedMarks = []) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    const marks = [...savedMarks];

    canvas.width = 300;
    canvas.height = 400;

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        marks.forEach((mark) => {
            ctx.beginPath();
            ctx.arc(mark.canvasX, mark.canvasY, 6, 0, Math.PI * 2);
            ctx.fillStyle = "orange";
            ctx.fill();
        });
    }

    function drawMarks() {
        container.querySelectorAll(".delete-mark").forEach((btn) => btn.remove());

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        marks.forEach((mark, index) => {
            const btn = document.createElement("button");
            btn.textContent = "X";
            btn.className = "delete-mark";

            btn.style.position = "absolute";
            // 將canvasX/canvasY 轉換成實際畫面座標（相對於 canvas 元素）
            const offsetX = mark.canvasX / scaleX;
            const offsetY = mark.canvasY / scaleY;

            // 將座標相對於父容器調整，+10/-10 表示右上角
            btn.style.left = `${offsetX + 10}px`;
            btn.style.top = `${offsetY - 30}px`;

            // 刪除功能
            btn.onclick = () => {
                marks.splice(index, 1);
                redrawCanvas();
                drawMarks();
            };

            container.appendChild(btn);
        });
    }

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const canvasX = (e.clientX - rect.left) * scaleX;
        const canvasY = (e.clientY - rect.top) * scaleY;


        const screenX = e.clientX;
        const screenY = e.clientY;

        marks.push({ canvasX, canvasY, screenX, screenY });
        redrawCanvas();
        drawMarks();
    });

    // 初始化畫面
    redrawCanvas();
    drawMarks();

    return {
        getMarks: () => [...marks], // 用於資料儲存
        clear: () => {
            marks.length = 0;
            redrawCanvas();
            drawMarks();
        },
    };
}
document.addEventListener("DOMContentLoaded", () => {
    const canvasIds = ["canvasNorth_T2", "canvasSouth_T2", "canvasNorth_T3", "canvasSouth_T3"];
    const canvasData = {}; // 儲存每個 canvas 的畫點資料

    canvasIds.forEach((id) => {
        canvasData[id] = setupCanvasWithDelete(id);
    });

    const images = document.querySelectorAll('.image-selection .selectable');
    if (images.length === 0) return; // ❗ 如果找不到圖片就不綁定事件
    images.forEach(img => {
        img.addEventListener('click', () => {
            images.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
        });
    });

    // 當按下完成按鈕時，收集所有 canvas 的資料
    document.querySelector(".complete-task").addEventListener("click", () => {
        const allMarks = {};
        for (const id of canvasIds) {
            allMarks[id] = canvasData[id].getMarks();
        }

        // ✅ 抓取任務一、五的三個輸入值
        const treeHeight = document.getElementById("tree-height").value;
        const treeDiameter = document.getElementById("tree-diameter").value;
        const branchCount = document.getElementById("tree-branch-count").value;

        // ✅ 讀取任務四選取的圖片 data-value
        const selectedImage = document.querySelector(".image-selection .selectable.selected");
        const selectedImageValue = selectedImage ? selectedImage.dataset.value : null;

        // ✅ 驗證欄位是否填寫
        if (!treeHeight || !treeDiameter || !branchCount || !selectedImageValue) {
            alert("有任務欄位未完成，請完成後再送出！");
            return; // 停止送出
        }

        const finalData = {
            marks: allMarks, //任務二、三
            measurement: {
                treeHeight: parseFloat(treeHeight), //任務一
                treeDiameter: parseFloat(treeDiameter), //任務一
                branchCount: parseInt(branchCount) //任務四
            },
            healthSelection: parseInt(selectedImageValue) // 🌿 任務五健康度調查選擇
        };

        console.log("✅ 所有畫布的標記資料:", allMarks);
        console.log("📦 要儲存與送出的資料：", finalData);
        console.log("🖼️ 使用者選擇的圖片值：", selectedImageValue);

        // 送出給伺服器
        /*
        存任務二、三的數據
        fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(allMarks)
        });

        存任務一、五的數據
        fetch("/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ 儲存成功:", data);
            alert("資料已送出！");
        })
        .catch(error => {
            console.error("❌ 儲存錯誤:", error);
            alert("儲存失敗，請稍後再試！");
        });
        */
        alert("資料已送出！");
        // 存到 localStorage 測試轉到觀察報告
        localStorage.setItem("finalData", JSON.stringify(finalData));

        // 導向下一個頁面
        window.location.href = "Unit3.html";
    });
});