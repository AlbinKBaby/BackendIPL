const teamController = require('../Controllers/teamController')

const express = require('express');

const router= new express.Router

router.get('/team',teamController.getTeam)