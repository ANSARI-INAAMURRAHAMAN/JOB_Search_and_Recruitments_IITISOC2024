const authenticateSeeker = (req, res, next) => {
    console.log(req.session.seekerAuth+'seeker called here')
    if (req.session.seekerAuth !== true) {
        return res.status(403).send(`<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="background-color: #fff; padding: 20px 40px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
            <h1 style="color: #ff0000; font-size: 24px; margin-bottom: 20px;">Forbidden: Job_Applicants access only!</h1>
            <p style="font-size: 18px; color: #333;">Login if you have not</p>
        </div>`);
    }
    next();
};

const authenticateRecruiter = (req, res, next) => {
    console.log(req.session.seekerAuth+'recruiter called here')
    if (req.session.recruiterAuth !== true) {
        return res.status(403).send(`<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <div style="background-color: #fff; padding: 20px 40px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
            <h1 style="color: #ff0000; font-size: 24px; margin-bottom: 20px;">Forbidden: Recruiter access only!</h1>
            <p style="font-size: 18px; color: #333;">Login if you have not</p>
        </div>`);
    }
    next();
};

module.exports = {
    authenticateSeeker,
    authenticateRecruiter
};

