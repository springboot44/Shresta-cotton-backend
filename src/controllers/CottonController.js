import Cotton from "../models/Cotton.js";


const addcotton = async (req, res) => {
    try {
        const { name, quantity, price, description } = req.body;

        if (!name || !quantity || !price) {
            return res.status(400).json({ message: "Name, quantity, and price are required" });
        }

        const cotton = new Cotton({ name, quantity, price, description });
        await cotton.save();
        res.status(201).json({ message: "Cotton added successfully", cotton });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getcotton = async (req, res) => {
    try {
        const cotton = await Cotton.find();
        res.status(200).json({ message: "Cotton retrieved successfully", cotton });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const todaycotton = async (req, res) => {

    try {



        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const cotton = await Cotton.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        res.status(200).json({ message: "Today's cotton retrieved successfully", cotton });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { addcotton, getcotton ,todaycotton};