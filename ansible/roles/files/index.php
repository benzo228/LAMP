<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мои задачи</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📋 Список задач</h1>
        <div class="add-form">
            <input type="text" id="newTitle" placeholder="Название задачи" required>
            <input type="text" id="newDesc" placeholder="Описание (необязательно)">
            <button id="addBtn">➕ Добавить</button>
        </div>
        <div id="taskList"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>