const express = require('express');  
const app = express();  
const nodemailer = require('nodemailer');  

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
}
    
  
const sendEmail = async (options) => {
    try {
        const info = await transporter.sendMail(options);
        console.log('Email sent: ' + info.response);
        return 'success';
    } catch (error) {
        console.log(error.response);
        return 'fail';
    }
}



var bodyParser = require('body-parser')
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
//   console.log(formData);
  sendEmail(formData).then(res => {
    respn.send(res);
  });
});  
   
const PORT = process.env.PORT || 3000;
// 启动服务  
app.listen(PORT, () => {  
  console.log('Server started on port 3000');  
});