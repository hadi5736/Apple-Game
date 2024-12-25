document.addEventListener("DOMContentLoaded", function() {
    let currentRow = 1; // شروع از ردیف اول
    let gameData = []; // داده‌های بازی (خانه‌ها درست یا غلط)
    let isGameOver = false;

    // دریافت امتیاز شروع از LocalStorage
    let startingScore = localStorage.getItem('startingScore') || 10;
    console.log("امتیاز شروع: " + startingScore);

    // ایجاد خانه‌های بازی برای هر ردیف
    function generateRow(rowNumber) {
        let correctCount, wrongCount;

        // تعیین تعداد خانه‌های درست و غلط بسته به ردیف
        if (rowNumber <= 4) {
            correctCount = 4;
            wrongCount = 1;
        } else if (rowNumber <= 7) {
            correctCount = 3;
            wrongCount = 2;
        } else if (rowNumber <= 9) {
            correctCount = 2;
            wrongCount = 3;
        } else {
            correctCount = 1;
            wrongCount = 4;
        }

        // ترکیب خانه‌های درست و غلط
        let row = [];
        for (let i = 0; i < correctCount; i++) {
            row.push(true); // خانه درست
        }
        for (let i = 0; i < wrongCount; i++) {
            row.push(false); // خانه غلط
        }

        // شافل کردن خانه‌ها
        row = shuffleArray(row);

        // ذخیره داده‌ها برای بررسی
        gameData.push(row);

        return row;
    }

    // شافل کردن آرایه به صورت تصادفی
    function shuffleArray(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    // ایجاد خانه‌ها در صفحه برای هر ردیف
    function createGrid(rowData) {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = ''; // پاک کردن محتوای قبلی

        rowData.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('grid-item');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', function() {
                if (isGameOver) return; // اگر بازی تمام شده، هیچ کاری نکن

                // اگر خانه درست انتخاب شد
                if (cell) {
                    cellElement.classList.add('correct');
                    if (currentRow === 10) {
                        document.getElementById('game-status').textContent = "تبریک! بازی تمام شد.";
                        isGameOver = true;
                    } else {
                        document.getElementById('game-status').textContent = "خانه درست انتخاب کردید! به ردیف بعدی بروید.";
                        document.getElementById('next-row').style.display = 'inline-block';
                    }
                } else {
                    cellElement.classList.add('wrong');
                    document.getElementById('game-status').textContent = "شما بازنده شدید!";
                    revealAllCells();
                    isGameOver = true;
                }
            });

            gridContainer.appendChild(cellElement);
        });
    }

    // نمایش تمام خانه‌ها بعد از انتخاب غلط
    function revealAllCells() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            const isCorrect = gameData[currentRow - 1][index];
            item.classList.add(isCorrect ? 'correct' : 'wrong');
        });
    }

    // پیشرفت به ردیف بعدی
    document.getElementById('next-row').addEventListener('click', function() {
        if (currentRow < 10) {
            currentRow++;
            const rowData = generateRow(currentRow);
            createGrid(rowData);
            document.getElementById('game-status').textContent = "بازی ادامه دارد...";
            document.getElementById('next-row').style.display = 'none';
        }
    });

    // شروع بازی با ردیف اول
    const firstRowData = generateRow(currentRow);
    createGrid(firstRowData);
});

const correctPassword = "12Lw5421@AZP49"; // رمز عبور صحیح خود را وارد کنید

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (enteredPassword === correctPassword) {
        // اگر رمز درست بود، دسترسی به صفحه بازی داده می‌شود
        localStorage.setItem('accessGranted', 'true'); // ذخیره‌سازی در localStorage
        window.location.href = "game.html"; // هدایت به صفحه game.html
    } else {
        // اگر رمز اشتباه بود، پیغام خطا نمایش داده می‌شود
        errorMessage.style.display = "block";
    }
}