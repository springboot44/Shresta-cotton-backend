const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // This 'req.user.role' now holds "user" or "admin" 
        // because you added it to generateToken!
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}
export default authorizeRoles;