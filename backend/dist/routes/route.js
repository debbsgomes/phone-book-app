import { Router } from 'express';
import { getContacts, postContacts, updateContacts, deleteContacts } from '../controller/contactController.js';
const router = Router();
router.get('/contacts', getContacts);
router.post('/contacts', postContacts);
router.patch('/contacts/:name', updateContacts);
router.delete('/contacts/:name', deleteContacts);
export default router;
//# sourceMappingURL=route.js.map