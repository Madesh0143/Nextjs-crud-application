
import connectMongo from '../../../Database/conn'
import { getUsers, postUser, putUser, deleteUser } from '../../../Database/controller'


export default function handler(req, res) {

  connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }))

  //   //type of request
  const { method } = req


  //   // ['GET','POST','PUT','DELET']
  switch (method) {
    case 'GET':
      // res.status(200).json({method,name:'GET Requst'})
      getUsers(req, res);
      break
    case 'POST':
      postUser(req, res);
      break;
    case 'PUT':
      putUser(req, res);
      break;
    case 'DELETE':
      deleteUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELET']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break
  }

}
