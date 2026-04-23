// Registrar service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

let tasks = [];
let filter = "all";

// Estado conexión
function updateStatus() {
    document.getElementById("status").textContent =
        navigator.onLine ? "🟢 Online" : "🔴 Offline";
}

// Eventos conexión
window.addEventListener("online", () => {
    updateStatus();
    syncTasks();
});
window.addEventListener("offline", updateStatus);

// Agregar tarea
function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    const task = {
        id: Date.now(),
        text: input.value,
        done: false,
        synced: false
    };

    tasks.push(task);
    input.value = "";

    renderTasks();
    syncTasks();
}

// Renderizar tareas
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(t => filter === "all" || (filter === "done" ? t.done : !t.done))
        .forEach(task => {
            const li = document.createElement("li");

            if (task.done) li.classList.add("done");

            li.innerHTML = `
                ${task.text}
                <div>
                    <button onclick="toggleTask(${task.id})">✔</button>
                    <button onclick="deleteTask(${task.id})">❌</button>
                </div>
            `;

            list.appendChild(li);
        });

    updateCounter();
}

// Toggle completar
function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, done: !t.done, synced: false } : t
    );

    renderTasks();
    syncTasks();
}

// Eliminar tarea
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);

    renderTasks();
    syncTasks();
}

// Filtros
function filterTasks(type) {
    filter = type;
    renderTasks();
}

// Contador
function updateCounter() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;

    document.getElementById("counter").textContent =
        `Total: ${total} | Completadas: ${done}`;
}

// Sincronización inteligente (SIN duplicados)
function syncTasks() {
    if (!navigator.onLine) return;

    tasks.forEach(task => {
        if (!task.synced) {
            fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
            .then(() => {
                task.synced = true;
            })
            .catch(() => console.log("Error de red"));
        }
    });
}

// Inicial
renderTasks();
updateStatus();