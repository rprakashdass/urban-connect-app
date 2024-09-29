// controllers
const { EmpSignup, EmpLogin } = require('../Controllers/EmployeeAuthController')
const { AdminSignup, AdminLogin } = require('../Controllers/AdminAuthController')
const { AgencySignup, AgencyLogin } = require('../Controllers/AgencyAuthController')
const { DeptSignup, DeptLogin } = require('../Controllers/DeptAuthController')

// middlewares
const { employeeVerification } = require('../Middlewares/EmployeeAuthMiddleware')
const { deptVerification } = require('../Middlewares/DeptAuthMiddleware');
const { adminVerification } = require('../Middlewares/AdminAuthMiddleware');
const { agencyVerification } = require('../Middlewares/AgencyAuthMiddleware');

const router = require('express').Router()

router.post('/admin/signup', AdminSignup)
router.post('/admin/login', AdminLogin)

router.post('/d/signup', DeptSignup)
router.post('/d/login', DeptLogin)

router.post('/a/signup', AgencySignup)
router.post('/a/login', AgencyLogin)

router.post('/e/signup', EmpSignup)
router.post('/e/login', EmpLogin)

router.post('/e/', employeeVerification)
router.post('/d/', deptVerification)
router.post('/a/', adminVerification)
router.post('/admin/', agencyVerification)

module.exports = router