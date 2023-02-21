import connectMongo from '../../../Database/conn'
import { getUser, putUser, deleteUser } from '../../../Database/controller'

export default function handler(req, res) {

    connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }))

    const { method } = req

    switch (method) {
        case 'GET':
            getUser(req, res);
            break;
        case 'PUT':
            putUser(req, res);
            break
        case 'DELETE':
            deleteUser(req, res);
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELET']);
            res.status(405).end(`Method ${method} Not Allowd`);
            break
    }
}