const API_URL = '/todo/api.php';

async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const container = document.getElementById('taskList');
    container.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div class="info">
                <div class="title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="desc">${escapeHtml(task.description)}</div>` : ''}
            </div>
            <span class="status status-${task.status}">${task.status}</span>
            <div class="actions">
                <button class="status-btn" data-id="${task.id}" data-status="${task.status}">🔄</button>
                <button class="delete-btn" data-id="${task.id}">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const current = btn.dataset.status;
            const next = current === 'new' ? 'in_progress' : (current === 'in_progress' ? 'done' : 'new');
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: next })
            });
            loadTasks();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (confirm('Удалить задачу?')) {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                loadTasks();
            }
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('addBtn').addEventListener('click', async () => {
    const title = document.getElementById('newTitle').value.trim();
    const description = document.getElementById('newDesc').value.trim();
    if (!title) return alert('Введите название');
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    document.getElementById('newTitle').value = '';
    document.getElementById('newDesc').value = '';
    loadTasks();
});

loadTasks();