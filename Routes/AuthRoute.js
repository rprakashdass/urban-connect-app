// Import controllers
const { EmpSignup, EmpLogin } = require('../Controllers/EmployeeAuthController');
const { AdminSignup, AdminLogin } = require('../Controllers/AdminAuthController');
const { AgencySignup, AgencyLogin } = require('../Controllers/AgencyAuthController');
const { DeptSignup, DeptLogin } = require('../Controllers/DeptAuthController');

// Import middlewares
const { employeeVerification } = require('../Middlewares/EmployeeAuthMiddleware');
const { deptVerification } = require('../Middlewares/DeptAuthMiddleware');
const { adminVerification } = require('../Middlewares/AdminAuthMiddleware');
const { agencyVerification } = require('../Middlewares/AgencyAuthMiddleware');

// Load environment variables
require('dotenv').config();
const adminUrl = process.env.ADMIN_URL;
const agencyUrl = process.env.AGENCY_URL;
const employeeUrl = process.env.EMPLOYEE_URL;
const deptUrl = process.env.DEPARTMENT_URL;

// Create router
const router = require('express').Router();

// Admin routes
router.post(`${adminUrl}/signup`, AdminSignup);
router.post(`${adminUrl}/login`, AdminLogin);

// Department routes
router.post(`${deptUrl}/signup`, DeptSignup);
router.post(`${deptUrl}/login`, DeptLogin);

// Agency routes
router.post(`${agencyUrl}/signup`, AgencySignup);
router.post(`${agencyUrl}/login`, AgencyLogin);

// Employee routes
router.post(`${employeeUrl}/signup`, EmpSignup);
router.post(`${employeeUrl}/login`, EmpLogin);

// Verification middleware for protected routes (e.g., for authorized actions)
router.post(`${employeeUrl}/protected`, employeeVerification, (req, res) => {
    res.send("Employee verified and authorized.");
});

router.post(`${deptUrl}/protected`, deptVerification, (req, res) => {
    res.send("Department verified and authorized.");
});

router.post(`${agencyUrl}/protected`, agencyVerification, (req, res) => {
    res.send("Agency verified and authorized.");
});

router.post(`${adminUrl}/protected`, adminVerification, (req, res) => {
    res.send("Admin verified and authorized.");
});

// Export router
module.exports = router;
