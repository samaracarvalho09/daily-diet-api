import 'dotenv/config'
import { app } from "./app";

const PORT = 3333;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});