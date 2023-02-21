import { BiBrush } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, getUsers, updateUser } from "@/lib/helper";


{/* Through the value in console */ }

export default function UpdateUserForm({ formid, formData, setFormData }) {

    {/*Form submit button control command*/ }
    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery(['users', formid], () => getUser(formid))
    const UpdateMutation = useMutation((newData) => updateUser(formid, newData), {
        onSuccess: async (data) => {
            //    queryClient.setQueryData('users',(old)=>[data])
            queryClient.prefetchQuery('users', getUsers)
        }
    })

    if (isLoading) return <div>Loading To Update...!</div>
    if (isError) return <div>Update Errors...!</div>



    const { name, avatar, salary, date, email, status } = data;
    const [firstname, lastname] = name ? name.split('') : formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
        let updated = Object.assign({}, data, formData, { name: userName })
        window.alert("Data Is Updated ")
        console.log(updated)
        await UpdateMutation.mutate(updated)

    }

    // if(Object.keys(formData).length>0)return<Bug message={"Error"}></Bug>



    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input
                    type="name"
                    name="firstname"
                    placeholder="FirstName"
                    defaultValue={firstname}
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="name"
                    name="lastname"
                    placeholder="LastName"
                    defaultValue={lastname}
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={email}
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="salary"
                    name="salary"
                    placeholder="Salary"
                    defaultValue={salary}
                    onChange={setFormData}
                    className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            <div className="input-type">
                <input
                    type="date"
                    name="date"
                    placeholder="Birthday"
                    defaultValue={date}
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
                        defaultChecked={status == "Active"}
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
                        defaultChecked={status !== "Active"}
                        onChange={setFormData}
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefult2" className="inline-block text-gray-800">
                        Inactive
                    </label>
                </div>
            </div>
            <button className="flex justify-center text-md w-2/6 bg-yellow-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Update  <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>
        </form>
    )
}