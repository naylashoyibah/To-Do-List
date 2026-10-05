const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");
const tombol = document.getElementById("tombol");

const emptyState = document.getElementById("emptyState");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");


tombol.onclick = function () {
    if (inputTask.value === "") {
        alert("Kamu belum memasukkan to do list!");
    } else {
        let li = document.createElement("li");

        li.textContent = inputTask.value;

        // Membuat tombol hapus
        let span = document.createElement("span");

        span.textContent = "\u00d7";

        // Memasukkan tombol hapus ke dalam tugas
        li.append(span);

        // Memasukkan tugas ke dalam list
        taskList.append(li);

        // Mengosongkan input
        inputTask.value = "";

        // Menyembunyikan empty state
        emptyState.style.display = "none";

        // Memperbarui jumlah tugas
        updateStats();
    }

    saveData();
};

inputTask.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        tombol.click();
    }
});

taskList.addEventListener("click", function (e) {
    // Jika yang diklik adalah tugas
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
    }

    // Jika yang diklik adalah tombol X
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }

    // Jika sudah tidak ada tugas
    if (taskList.children.length === 0) {
        emptyState.style.display = "block";
    }

    updateStats();

    saveData();
});


function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data") || "";

    if (taskList.children.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    updateStats();
}

function updateStats() {
    // Jumlah semua tugas
    let total = taskList.children.length;

    // Jumlah tugas yang selesai
    let completed = taskList.querySelectorAll(".done").length;

    // Jumlah tugas yang belum selesai
    let pending = total - completed;

    // Menampilkan hasil
    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}

showTask();