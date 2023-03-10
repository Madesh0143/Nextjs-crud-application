import Head from "next/head";
import { BiCheck, BiUserPlus, BiX } from "react-icons/bi";
import Table from "Components/Table";
import Form from "Components/Form"
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "@/redux/reducer";
import { deleteUser, getUsers } from '../lib/helper';
import { useQueryClient } from "react-query";




export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteid = useSelector(state => state.app.client.deleteid)
  const queryClient = useQueryClient();
  const dispatch = useDispatch()

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deleteHandler = async () => {
    if (deleteid) {
      await deleteUser(deleteid);
      await queryClient.prefetchQuery('users', getUsers)
      await dispatch(deleteAction(null))
    }

  }

  const cancleHandler = async () => {
    console.log("cancle")
    await dispatch(deleteAction(null))

  }

  return (
    <section>
      <Head>
        <title>Crud Applicaton</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Employees Details</h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button onClick={handler} className="flex bg-indigo-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-green-600">
              Add Employee<BiUserPlus size={25}></BiUserPlus>
            </button>
          </div>
          {deleteid ? DeleteComponent({ deleteHandler, cancleHandler }) : <></>}
        </div>

        {/*Form components */}
        {visible ? <Form></Form> : <> </>}

        {/* Table route components tags */}
        <div className="container mx-auto">
          <Table />
        </div>

      </main>
    </section>
  )
}

function DeleteComponent({ deleteHandler, cancleHandler }) {
  return (
    <div className="flex gap-5">
      <button> Are You Sure..?</button>
      <button onClick={deleteHandler} className="flex bg-red-500 text-white px-4 py-3 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50 ">
        Yes <span className="px-2 " ><BiX color="rgb(255 255 255)" size={25} ></BiX> </span> </button>
      <button onClick={cancleHandler} className="flex bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50">
        No <span className="px-2 " > <BiCheck color="rgb(255 255 255)" size={25}></BiCheck> </span> </button>
    </div>
  )
}
