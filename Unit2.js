document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasNorth");
    const ctx = canvas.getContext("2d");
    const marks = [];

    // 設定畫布大小
    canvas.width = 300;
    canvas.height = 400;

    // ✅ 新增 redrawCanvas：負責畫出所有橘點
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        marks.forEach(mark => {
            ctx.beginPath();
            ctx.arc(mark.canvasX, mark.canvasY, 6, 0, Math.PI * 2);
            ctx.fillStyle = "orange";
            ctx.fill();
        });
    }

    // ✅ 修正 drawMarks：將標記按鈕正確定位
    function drawMarks() {
        document.querySelectorAll(".delete-mark").forEach(btn => btn.remove());

        marks.forEach((mark, index) => {
            const btn = document.createElement("button");
            btn.textContent = "X";
            btn.classList.add("delete-mark");

            btn.style.position = "absolute";
            // 向右上角偏移：右 +10px，上 -10px
            btn.style.left = `${mark.screenX + 10 + window.scrollX}px`;
            btn.style.top = `${mark.screenY - 30 + window.scrollY}px`;

            btn.addEventListener("click", () => {
                marks.splice(index, 1);
                drawMarks();
                redrawCanvas();
            });

            document.body.appendChild(btn);
        });
    }

    // 點擊畫布事件：新增標記
    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const canvasX = (event.clientX - rect.left) * scaleX;
        const canvasY = (event.clientY - rect.top) * scaleY;

        const screenX = event.clientX;
        const screenY = event.clientY;

        marks.push({ canvasX, canvasY, screenX, screenY });

        redrawCanvas();
        drawMarks();

        //資料庫傳送 GPT建議
        /*
        fetch("/api/save-point", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                canvasX,
                canvasY
            })
        });
        */

    });

    // ✅ 圖片選取邏輯（若有圖片選擇器）
    const images = document.querySelectorAll('.image-selection .selectable');
    images.forEach(img => {
        img.addEventListener('click', () => {
            images.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
        });
    });

    // ✅ 任務完成按鈕
    document.querySelector(".complete-task").addEventListener("click", () => {
        alert("任務完成！");
    });
});

