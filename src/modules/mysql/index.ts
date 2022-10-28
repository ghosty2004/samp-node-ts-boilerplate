import { createPool } from "mysql";

export const con = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});

export const mysqlConnect = (func: (err: any) => void): void => {
    con.query("SELECT 1 + 1 as solution", (err) => {
        func(err);
    });
}