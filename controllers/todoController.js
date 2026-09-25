import todos from "../data/todos.js";

export const createTodo = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTodo = {
        id: todos.length + 1,
        title,
        description: description || "",
        completed: false,
        userId: req.user.id,
        createdAt: new Date()
    };

    todos.push(newTodo);
    res.status(201).json({
        message: "Todo created successfully",
        todo: newTodo
    });
};

export const getTodos = (req, res) => {
    const userTodos = todos.filter(
        todo => todo.userId === req.user.id
    );

    res.status(200).json(userTodos);
};

export const getTodoById = (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(
        todo => todo.id === id && todo.userId === req.user.id

    );

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.status(200).json(todo);
};

export const updateTodo = (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id && todo.userId === req.user.id);

    if (!todo) {
        return res.status(404)({
            message: "Todo not found"
        });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.status(200).json({
        message: "Todo updated successfully",
        todo
    });


};

export const deleteTodo = (req, res) => {
    const id = Number(req.params.id);

    const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === req.user.id);

    if(todoIndex === -1){
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(todoIndex, 1);

    res.status(200).json({
        message: "Todo deleted successfully"
    });
};