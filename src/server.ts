import 'dotenv/config'
import { app } from "./app";

const PORT = 3333;

console.log(process.env.DATABASE_URL, 'here');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
