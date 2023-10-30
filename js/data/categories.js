const categories = [];
const nameIndex = new Map();
const validTypes = new Set();

validTypes.add("expense");
validTypes.add("savings");

export class Category {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

export function categoryExists(name) {
    return nameIndex.has(name);
}

export function isDeletedCategory(id) {
    const category = getCategoryById(id);
    return !categoryExists(category.name);
}

export function getCategories() {
    return [...nameIndex.values()]
        .map(id => getCategoryById(id));
}

export function getCategory(name) {
    if (!categoryExists(name)) {
        throw `Undefined budget category: ${name}`;
    }
    const id = nameIndex.get(name);
    return getCategoryById(id);
}

export function getCategoryById(id) {
    return categories[id];
}

export function addCategory(name, type = "budget") {
    if (categoryExists(name)) {
        throw `Budget category already exists: ${name}`;
    }
    if (!validTypes.has(type)) {
        throw `Invalid budget category type: ${type}`;
    }
    const nextId = categories.length;
    categories.push(new Category(nextId, name, type));
    nameIndex.set(name, nextId);
}

export function renameCategory(oldName, newName) {
    if (!categoryExists(oldName)) {
        throw `Undefined budget category: ${oldName}`;
    }
    if (categoryExists(newName)) {
        throw `Budget category already exists: ${newName}`;
    }
    const id = getCategory(oldName);
    const category = getCategoryById(id);

    category.name = newName;
    nameIndex.delete(oldName);
    nameIndex.set(newName, id);
}