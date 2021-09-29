const Item = require("../databases/mongodb/models/Item");
const List = require("../databases/mongodb/models/List");
import { Request, response } from 'express'

export async function createItem(req: Request): Promise<any> {
    const { description, checked } = req.body;
    const { listId } = req.params;

    const item = {
        description: description,
        checked: checked
    }

    const result = await Item.create(item).then(res => {
        return List.findByIdAndUpdate(listId, { $push: { items: res._id } }, { new: true, useFindAndModify: false })
    })

    return result ? { message: "Item created successfully" } : { message: "No changes done" };
}

export async function getItemsByList(req: Request): Promise<any> {
    const { listId } = req.params;

    const result = List.findById(listId).populate('items');
    return result;
}

export async function getItem(req: Request) {
    const { id } = req.params;
    const res = await Item.findById(id).catch(err => { throw err });
    return res ? res : { message: "No item exist" };
}

export async function updateItem(req: Request) {

    const { description, checked } = req.body;
    const { id } = req.params;

    const item = {};

    if (description) item["description"] = description;

    if (checked !== undefined) item["checked"] = checked;

    const response = await Item.findByIdAndUpdate(id, item, { new: true, useFindAndModify: false })

    return response;
}

export async function deleteItem(req: Request) {

    const { id } = req.params;
    const response = await Item.findByIdAndRemove(id);

    return response ? { message: "Successfully deleted" } : { message: "No such record exist" };
}







