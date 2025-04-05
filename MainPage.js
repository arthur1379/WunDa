document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    const modal = document.getElementById("lessonModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const cancelBtn = document.getElementById("cancelBtn");
    const createBtn = document.getElementById("createClassBtn");

    const codeModal = document.getElementById("codeModal");
    const codeBox = document.getElementById("generatedCode");
    const codeTitle = document.getElementById("codeTitle");
    

    // 開啟選單
    menuToggle.addEventListener("click", () => {
        sideMenu.classList.add("active");
        overlay.classList.add("active");
    });

    // 關閉選單
    closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
    });

    // 點擊遮罩關閉
    overlay.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
    });

    // 開啟 Modal
    document.querySelectorAll(".lesson-card").forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.textContent = card.querySelector("h3").textContent;
            modalDescription.textContent = card.querySelector("p").textContent;
            modal.style.display = "flex";
        });
    });

    // 關閉 Modal
    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 建立教室按鈕邏輯（可自訂）
    createBtn.addEventListener("click", () => {
        alert(`已建立：${modalTitle.textContent}`);
        modal.style.display = "none";
    });

    // 點擊背景關閉
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 建立教室 → 顯示產生代碼視窗
    createBtn.addEventListener("click", () => {
        modal.style.display = "none";

        // 顯示教案名稱
        codeTitle.textContent = modalTitle.textContent;

        // 產生四位數
        const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
        codeBox.textContent = code;

        // 顯示視窗
        codeModal.style.display = "flex";
    });

    // 第二個視窗按鈕控制
    document.getElementById("codeCancel").addEventListener("click", () => {
        codeModal.style.display = "none";
    });
    document.getElementById("codeConfirm").addEventListener("click", () => {
        // 如果需要，這裡可以先儲存資料
        // localStorage.setItem("generatedCode", codeBox.textContent);
        const code = document.getElementById("generatedCode").textContent;
        // 跳轉頁面
        window.location.href = `CourseContext.html?code=${code}`;
      });
});

