const List = require("../databases/mongodb/models/List");
import { Request } from 'express'


export async function createList(req: Request): Promise<any> {
    const { name } = req.body;

    const existingList = await List.find({ 'name': name })
    if (existingList.length === 0) {
        const newList = {
            name: name,
            item: []
        }
        const result = await List.create(newList).catch(err => { throw err });
        if (result) return { message: "Succefully created" }

    } else {
        return { message: "Name is already exist" };
    }
}

export async function getLists(): Promise<any> {
    return await List.find({}).catch(err => { throw err });
}

export async function getOneList(req: Request): Promise<any> {
    const { id } = req.params
    const list = await List.find({ '_id': id })

    return list?.length > 0 ? list : { message: "No list available under this Id" };
}

export async function updateList(req: Request): Promise<any> {
    const { name } = req.body
    const { id } = req.params

    const result = await List.updateOne({ '_id': id }, { 'name': name }).catch(err => { throw err });
    return result?.modifiedCount > 0 ? { message: "Record updated successfully" } : { message: "No changes done" };
}

export async function deleteList(req: Request): Promise<any> {
    const { id } = req.params

    const result = await List.deleteMany({ '_id': id }).catch(err => { throw err });

    return result?.deletedCount > 0 ? { message: "Successfully deleted record" } : { message: "No such record exist" };
}


