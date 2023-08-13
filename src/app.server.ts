import main from './app.main';
import 'dotenv/config';

main.get("/", (req, res) => res.send("Express + Typescript + NodeJS = 😍"));

// mulai server express
main.listen(process.env.PORT, () => {
    console.log(`[server] server dimulai di http://localhost:${process.env.PORT} ⚡`);
});
