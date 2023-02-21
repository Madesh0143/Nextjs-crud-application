import { BiPlus } from "react-icons/bi";
import Success from "./Succes"
import Bug from "./Bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper"

{/* Through the value in console */ }



export default function AddUserForm({ formData, setFormData }) {

    {/*Form submit button control command*/ }

    const queryClient = useQueryClient()



    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(formData).length == 0) return window.alert("Dont have Form Data");

        let { firstname, lastname, email, salary, date, status } = formData;

        const model = {
            name: `${firstname} ${lastname}`,
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
            email, salary, date, status: status ?? "Active"
        }
        addMutation.mutate(model)
    }

    if (addMutation.isLoading) return <div>Loading...!</div>
    if (addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if (addMutation.isSuccess) return <Success message={"Added Successfull"}></Success>

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input
                    type="name"
                    name="firstname"
                    placeholder="FirstName"
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="name"
                    name="lastname"
                    placeholder="LastName"
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="Salary"
                    name="salary"
                    placeholder="Salary"
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="date"
                    name="date"
                    placeholder="Birthday"
                    onChange={setFormData}
                    className="border backdrop:px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input
                        id="radioDefult1"
                        type="radio"
                        name="status"
                        value="Active"
                        onChange={setFormData}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefult1" className="inline-block text-gray-800">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input
                        id="radioDefult2"
                        type="radio"
                        name="status"
                        value="Inactive"
                        onChange={setFormData}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefult2" className="inline-block text-gray-800">
                        Inactive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 bg-green-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Add  <span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>
        </form>
    )
}