import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as T from "./schema.mjs";

const connection = await mysql.createConnection({
  host: '182.92.85.80', // 主机地址
  user: 'root', // 用户名
  password: '03171122991j!', // 密码
  port: 3306, // 端口号，默认为 3306
  database: 'xxj_gblog', // 数据库名称
  charset: "UTF8_GENERAL_CI", // 连接字符集，默认为 UTF8_GENERAL_CI
  connectTimeout: 10000, // 连接超时时间，单位为毫秒
  multipleStatements: false, // 是否允许一个 query 中有多个 MySQL 语句，默认为 false
});

// 连接数据库
export const db = drizzle(connection,{logger:false});
const q = await db.select().from(T.email_log)
// console.log(q);

// 保存邮件日志
export const save_email_log = async (data) => {
  const res =  await db.insert(T.email_log).values(data)
  // console.log(res[0].affectedRows);
}

// save_email_log({
//   email: "test@example.com",
//   name: "John Doe",
//   mobile: "123-456-7890",
//   content: "This is a test email.",
//   ip: "192.168.1.1"
// })





