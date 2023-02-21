import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction } from '../redux/reducer'

export default function Table() {

    const { isLoading, isError, data, error } = useQuery('users', getUsers);

    if (isLoading) return <div>Employee is Loading...</div>;
    if (isError) return <div>Got Error{error}</div>

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-700">
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Email</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Salary</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Birthday</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Status</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-300">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data.map((obj, i) => <Tr{...obj} key={i} />)
                }

            </tbody>
        </table>
    )
}

function Tr({ _id, name, avatar, email, salary, date, status }) {

    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()

    const onUpdate = () => {
        dispatch(toggleChangeAction(_id))
        if (visible) {
            dispatch(updateAction(_id))
        }
    }

    const onDelete = () => {
        if (!visible) {
            dispatch(deleteAction(_id))
        }
    }


    return (
        <tr className="bg-gray-50 text-center">
            <td className="px-16 py-2 flex flex-row items-center">
                <img src={avatar || '#'} alt="" className="h-10 w-10 rounded-md object-cover" />
                <span className="text-center ml-2 font-semibold">{name || 'UnKnow'}</span>
            </td>
            <td className="px-16 py-2">
                <span>{email || 'UnKnow'}</span>
            </td>
            <td className="px-16 py-2">
                <span>{salary || 'UnKnow'}</span>
            </td>
            <td className="px-16 py-2">
                <span>{date || 'UnKnow'}</span>
            </td>
            <td className="px-16 py-2">
                <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status || 'UnKnow'}</span></button>
            </td>
            <td className="px-16 py-2 flex justify-around gap-5">
                <button className="cursor" onClick={onUpdate} > <BiEdit size={25} color={"rgb(34,197,94)"} /> </button>
                <button className="cursor" onClick={onDelete} > <BiTrashAlt size={25} color={"rgb(244,63,94)"} /></button>
            </td>
        </tr>

    )
}
