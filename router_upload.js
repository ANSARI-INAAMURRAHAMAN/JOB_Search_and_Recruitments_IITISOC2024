const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql = require('mysql');
const { authenticate, authenticateSeeker, authenticateRecruiter } = require('./middleware.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
require('dotenv').config();
cloudinary.config({
  cloud_name: 'dq2skbvkx',
  api_key: '782254474184389',
  api_secret: 'ZUVW3IIykZM4fa5d6hIuZtU750k',
  secure: true,
});

// Configure multer for temporary local storage
const upload = multer({ dest: 'temp/' });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recruitment_project'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connection with router_upload Established!')
    }
});

// Function to upload file to Cloudinary
async function uploadToCloudinary(localFilePath) {
    const mainFolderName = "recruitment_project";
    const fileName = localFilePath.split('\\').pop().split('/').pop();
    const filePathOnCloudinary = `${mainFolderName}/${fileName}`;
    try {
      const result = await cloudinary.uploader.upload(localFilePath, { public_id: filePathOnCloudinary });
      console.log('Cloudinary upload successful:', result);
      return {
        message: "Success",
        url: result.url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return { message: "Fail", error: error };
    }
  }

  router.post('/resume_upload', [upload.single('image_res'), authenticateSeeker], async (req, response) => {
    if (!req.file) {
        return response.status(400).send(`
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h2 style="color: red; margin-bottom: 20px;">Error: No file uploaded</h2>
            </body>`);
    }

    try {
        console.log('Attempting to upload file to Cloudinary...');
        const result = await uploadToCloudinary(req.file.path);
        console.log('Upload to Cloudinary result:', result);

        if (result.message === "Success") {
            await unlinkFile(req.file.path); // Remove file from local storage

            const sql = `INSERT INTO resume (resume_id,file_name, mimetype, User_name) VALUES ('',?, ?, ?)`;
            const values = [result.url, req.file.mimetype, req.session.seekerUsername];

            db.query(sql, values, (err, res) => {
                if (err) {
                    console.error('Database Error:', err);
                    return response.status(500).send(`
                        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                            <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload</h2>
                            <p>${err.message}</p>
                        </body>`);
                } else {
                    response.send(`<body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                        <h3 style="margin-bottom: 20px;">Resume Uploaded</h3>
                    </body>`);
                }
            });
        } else {
            response.status(500).send(`
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload to Cloudinary</h2>
                    <p>${result.error ? result.error.message : 'Unknown error'}</p>
                </body>`);
        }
    } catch (error) {
        console.error('Server error:', error);
        response.status(500).send(`
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h2 style="color: red; margin-bottom: 20px;">Error: Server error</h2>
                <p>${error.message}</p>
            </body>`);
    }
});

router.post('/cover_letter_upload', [upload.single('image_cov'), authenticateSeeker], async (req, response) => {
    if (!req.file) {
        return response.status(400).send(`
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h2 style="color: red; margin-bottom: 20px;">Error: No file uploaded</h2>
            </body>`);
    }

    try {
        console.log('Attempting to upload file to Cloudinary...');
        const result = await uploadToCloudinary(req.file.path);
        console.log('Upload to Cloudinary result:', result);

        if (result.message === "Success") {
            await unlinkFile(req.file.path); // Remove file from local storage

            const sql = `INSERT INTO cover_letter (id,filename, username,reg_date) VALUES ('',?, ?,'')`;
            const values = [result.url, req.session.seekerUsername];

            db.query(sql, values, (err, res) => {
                if (err) {
                    console.error('Database Error:', err);
                    return response.status(500).send(`
                        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                            <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload</h2>
                            <p>${err.message}</p>
                        </body>`);
                } else {
                    response.send(`<body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                        <h3 style="margin-bottom: 20px;">Cover letter Uploaded</h3>
                    </body>`);
                }
            });
        } else {
            response.status(500).send(`
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload to Cloudinary</h2>
                    <p>${result.error ? result.error.message : 'Unknown error'}</p>
                </body>`);
        }
    } catch (error) {
        console.error('Server error:', error);
        response.status(500).send(`
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h2 style="color: red; margin-bottom: 20px;">Error: Server error</h2>
                <p>${error.message}</p>
            </body>`);
    }
});

module.exports = router;
