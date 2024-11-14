const express = require('express');
const router = express.Router();

// Example route for user signup (or modify based on your project)
router.post('/signup', (req, res) => {
    res.send('User signup route');
});

// Export the router
module.exports = router;
