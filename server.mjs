import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express()
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import AuthApis from './apis/auth.mjs'
import TweetApis from './apis/tweet.mjs'
import { stringToHash, varifyHash } from 'bcrypt-inzi';
import { userModel , otpModel} from './dbRepo/models.mjs';
const port = process.env.PORT || 5001;

mongoose.set('strictQuery', true);
const SECRET = process.env.SECRET || "topsecret";
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000', "*"],
    credentials: true
}));



app.use('/api/v1', AuthApis)

app.use("/api/v1",(req, res ,next ) =>{
 
    console.log("req.cookies: ", req.cookies);

    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData){
      if(!err){
        console.log("decodedData :", decodedData)
        const nowDate = new Date().getTime() / 1000;

      

      if(decodedData.exp < nowDate){
         res.status(401)
         res.cookie('Token', '', {
            maxAge: 1,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
              httpOnly: true
            

        });
        res.send({ message: "token expired" })
      } else{
        
        console.log("token approved");

        req.body.token = decodedData
        next();
      }
    }
    else{
        res.status(401).send("invalid token")
     }

    });

});


app.use('/api/v1', TweetApis)

const getUser = async (req, res) => {

  let _id = "";
  if (req.params.id) {
      _id = req.params.id
  } else {
      _id = req.body.token._id
  }

  try {
      const user = await userModel.findOne({ _id: _id }, "email firstName lastName -_id").exec()
      if (!user) {
          res.status(404).send({})
          return;
      } else {

          res.set({
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              "Pragma": "no-cache",
              "Expires": "0",
              "Surrogate-Control": "no-store"
          });
          res.status(200).send(user)
      }

  } catch (error) {

      console.log("error: ", error);
      res.status(500).send({
          message: "something went wrong on server",
      });
  }
}

app.get('/api/v1/profile', getUser)
app.get('/api/v1/profile/:id', getUser)

app.post("/api/v1/change-password" , async (req, res) =>{

   try {
    const body= req.body
     const currentPassword= body.currentPassword
     const newPassword = body.password;
        const _id = req.body.token._id
console.log(currentPassword)
console.log(newPassword)
 // check if user exist 
     const user = await userModel.findOne(
        {_id: _id}, "password").exec()


     if (!user) throw new Error("User not found")
    

     const isMatched = await varifyHash(currentPassword , user.password)

     if (!isMatched) throw new Error("password mismatch")

 

     const newHash = await stringToHash(newPassword);
    
     await userModel.updateOne( {_id: _id}, { password: newHash}).exec()

    //  Success

     res.send({message : " Password Chnaged succesfully"})
     return
   } catch (error) {
    console.log("error: ", error);
    res.status(500).send()

    
   }


}

)

const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './twitter/build')))
app.use('*', express.static(path.join(__dirname, './twiter/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})