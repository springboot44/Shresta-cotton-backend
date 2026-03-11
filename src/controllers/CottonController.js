import Cotton from "../models/Cotton.js";

// Add Cotton
const addcotton = async (req, res) => {
    try {
        const { name, quantity, price, description } = req.body;
        const cotton = new Cotton({ name, quantity, price, description });
        await cotton.save();
        res.status(201).json({ success: true, message: "Cotton added", cotton });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deletecotton = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Attempting to delete ID:", id); // LOG THIS

        // Check if the ID is a valid MongoDB ObjectId
        if (id.length !== 24) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        const deleted = await Cotton.findByIdAndDelete(id);
        
        if (!deleted) {
            console.log("No document found with that ID");
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        
        console.log("Delete successful!");
        res.status(200).json({ success: true, message: "Cotton deleted successfully" });
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
const getcotton = async (req, res) => {
    try {
        const cotton = await Cotton.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json({ success: true, cotton });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const todaycotton = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const cotton = await Cotton.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        res.status(200).json({ success: true, cotton });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { addcotton, getcotton, todaycotton, deletecotton };