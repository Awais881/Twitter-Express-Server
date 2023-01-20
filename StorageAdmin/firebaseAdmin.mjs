import admin from 'firebase-admin'

var serviceAccount =
{
    "type": "service_account",
    "project_id": "tweet-app-c9ac6",
    "private_key_id": "678896576ebd13f1aa8a1d4f78d419f2057f8212",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYk2QfHcbDY52W\nMif4CfRlUKH2BoNfek4B9x3TIxiNxX0jQmUPYVNu46rTUx9o9oZXi5juwYVg0Tlr\n+BVBTdsZkl0BQgN0+S/yl5Xl/gBZkrXhpMDz26C9J3USr/HV/Ih7bTcO6nhRUFDc\nFii26uG4AI/zvhlxojcddn5kLBS6EbnvlG0UIWXY+oXdPR3rv9hq3N2sCARXWVK2\n6OkLqg7SEmdecghbZoMb35TeLGIxpyqR2vf4mj9al1mdm/g23EN0hLuA0UOyVHHE\npfvupfN/Lrc42HF2IGAd0epYOfMXes8jb6koN7hXowWFQWLyHh6WxCfWFOPtgvBP\ntF8AqKVPAgMBAAECggEACorwuae0ks7A1l6L3XtOnGuYbWggzsmkN0WMlYjQywcQ\n8Q1G72uhuMFZjfWp73ZNbSIzxJexsDF03s2LJnKLR7aR36Lgm0YWtpQb4wMMoiPd\nloRsYs1Ty4487DglJUyoX6L50XmJK9E5bSPI127efvjm+YgyuOPlHA+Shzh2jC7O\n/qXXQ+2Gk7NyeT2nwwjQkjpkiwCt7Iki5P99rFzgPG2s1uIh3S5qhOI1BhQi2zju\nBUoXuD5MdvxYdz9avVsrKGmT4i91RElUvs5/87H0Es/KE12rB6ONC2Z1L5JZ2f6K\naxa0kOy+3xSjvEni9+nxXoOF6ui4SDRGlUB5ExIgdQKBgQDVLlCtr2Z4BCQYsXmd\nv6vrrEmR3kkPvn/YdiSXGJ6YUgb3hvfOlg/ipmx6iJx5D3uQgz50Mm8UgExa4VcC\nSazO48e/d5+XQnuJ1oy3uHSq7HEKZXA7xSsaT7s9xp2EleM3rtwpRpxzR95hWXWG\nGdbQ0ws+wyhGDqc2i0sa8MSbEwKBgQC3OMe5TRyy6dZjaKPfGuNb2nmzWIt8/m6c\nIropw6QP9tlrkgCrmzUCA5yohX3EmCJRJeyIneOsH2mjNOqYx66tX9Nh3IPtvpbZ\nDf8bNz5iKqzkTVSSNwQ29+vY2+s2NdGRp1V592jpjEbXnkOxjbDqafxTztp1n/bm\nmDqqflc4VQKBgQCJYVGIvHIygaipaSXQrQaj1+GJaVB4HvHQk0I9RRZfXu0ycv4b\nWcVe8JUT2hnMQlgE5y9GPoIrGgsavgEObmA46717/CESnztxtpv0gaBdzgWDB5/u\nRL/kMuGdi/NS0C0fY0ZqKyEDgZsj7Ty5cMloxbiHd8jqbOMBWX7LG8H3lQKBgC00\n20KDHjOesoDwjo47qiE9tI1lqXT7qfroLpqjZNVziI2cBoJQ1zFaBssltLRO/Ric\njNHgcw5C6eOU6NUtX5HzdMpOiFaekcWYSHtElCXQdbwWwGkbHfUaEpz9FfnYKY8Q\nhGyFeOM28zu8FuO2HBKad+GNxiUDhP28Ta1HYunJAoGAKFNd3jaSigD31DaZ9GoG\neSnnfnkRtuRmTX6utg66XHIWFLW5MHPj6iXG6zTqzl9Z+GlYtSm31l7lnU+EipOh\n20wvm2wQNGwFytPy/KLrUj21UQfD8ohAnP8r9W/aSkbNStZDu8AoqKZ6x/ey84Gt\nUU6e02m/HFXn+lwsMjCgndA=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zok1p@tweet-app-c9ac6.iam.gserviceaccount.com",
    "client_id": "111666389525566160765",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zok1p%40tweet-app-c9ac6.iam.gserviceaccount.com"
  }
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tweet-app-c9ac6.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://tweet-app-c9ac6.appspot.com");

export default bucket;