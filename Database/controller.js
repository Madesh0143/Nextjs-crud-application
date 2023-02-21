import Users from '../model/user'

//get:http://localhost:3000/api/users
export async function getUsers(req, res) {
    try {
        const users = await Users.find({})

        if (!users) return res.status(404).json({ error: "Data not Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: "Error while Fetching Data" })

    }

}

//get:http://localhost:3000/api/users/1
export async function getUser(req, res) {
    try {
        const { userid } = req.query;

        if (userid) {
            const user = await Users.findById(userid);
            res.status(200).json(user)
        }
        res.status(404).json({ error: "User Not Selected....!" });
    } catch (error) {
        res.status(404).json({ error: "Cannot get the  User....!" });
    }
}



//post:http://localhost:3000/api/users

export async function postUser(req, res) {
    try {
        const formData = req.body;

        if (!formData) return res.status(404).json({ error: "form Data not Provided....!" })
        Users.create(formData, function (err, data) {
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })

    }

}

//put:http://localhost:3000/api/users/1

export async function putUser(req, res) {
    try {
        const formData = req.body;
        const { userid } = req.query;

        if (userid && formData) {
            const user = await Users.findByIdAndUpdate(userid, formData);
            res.status(200).json(user)
        }

        res.status(404).json({ error: "User Not Selected...!" })
    } catch (error) {
        return res.status(404).json({ error: "Error While Updating The Data...!" })

    }

}

//delete:http://localhost:3000/api/users

export async function deleteUser(req, res) {
    try {
        const { userid } = req.query;

        if (userid) {
            const user = await Users.findByIdAndDelete(userid);
            res.status(200).json(user)
        }

        res.status(404).json({ error: "User Not Selected....!" })
    } catch (error) {
        return res.status(404).json({ error: "Error While Deleting The User...!" })

    }

}


