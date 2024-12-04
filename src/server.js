const express = require('express');  
const app = express();  
const nodemailer = require('nodemailer');  
const fs = require('fs');
const Handlebars = require('handlebars');
// const db = import('./db.mjs');
// const { save_email_log } = import('./db.mjs');

// const path = require('path');
// console.log(path.join(__dirname, '/tpl'));

/**
 * 邮件配置
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: 'jxj1014@qq.com',
      pass: 'xdkltmeqwplcbdde'
    }
  });
  
const mailOptions = {
    from: "jxj1014@qq.com",
    to: "2039916844@qq.com",
    subject: '主题',
    html: "内容",
    attachments: [
      {
          filename: 'attachment.txt', // 附件文件名
          path: 'src/file/test.txt' // 附件文件路径
      }
  ]
}
    


/**
 * 渲染模板内容
 * @param {*} options 
 * @returns 
 */
function getTpl(options){
  // 读取模板文件
  const source = fs.readFileSync('./tpl/template.hbs', 'utf8');
  // 编译模板
  const template = Handlebars.compile(source);
  // 渲染模板
  const output = template(options.data);
  return output; // 返回渲染后的模板内容
}



  
const sendEmail = async (options) => {
    try {
        options.html = getTpl(options);
        const info = await transporter.sendMail(options);
        console.log('Email sent: ' + info.response);
        return 'success';
    } catch (error) {
        console.log(error);
        return error.response;
    }
}



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, respn, next) => {
  respn.setHeader('Access-Control-Allow-Origin', '*');
  respn.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  respn.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});  
// 设置路由 ( 接口 )
app.post('/send', (req, respn) => {  
  respn.header('Access-Control-Allow-Origin', '*')
  const formData = req.body;
  console.log(formData);
  sendEmail(formData).then(async res => {
    // 添加数据库保存日志
    const { save_email_log } = await import('./db.mjs');
    save_email_log({
      email: formData.data.email,
      name: formData.data.name,
      mobile: formData.data.phone,
      content: formData.data.detail,
      ip: req.ip
    })

    
    respn.send(res);
  });
});  

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send('Hello, Express!'+ ip);
});
   
const PORT = process.env.PORT || 3000;
// 启动服务  
app.listen(PORT, () => {  
  console.log('Server started on port 3000');  
});