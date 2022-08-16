// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import parseCookies from "helper/getCookies";
import connectMongo from "helper/initDB"
import User from "models/user";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Cookie = require('js-cookie');

connectMongo();

export default async function handler(req, res) {
  try {
    const userCookie = parseCookies(req);
    console.log('the user cookie', userCookie);
    if(userCookie && userCookie.token){
        var tokenVerify = jwt.verify(userCookie.token, process.env.SECRET_KEY);
        if( !tokenVerify ) throw 'Invalid token';
        console.log({cookie:Cookie.get()})
        return res.status(201).json({message:"logout success"});
    }else{
        return res.status(404).json({error:"Please login again"})
    }

  } catch (error){
    console.log('error', error);
    res.status(500).json({ error })
  }
}
