import express from "express";
import Resume from "../models/Resume.js";
import authMiddleware from "../middleware/authMiddleware.js";
import puppeteer from "puppeteer";


const router = express.Router();

router.post("/save",authMiddleware, async (req,res)=>{
  try{
    const { formData }= req.body;

    let resume = await Resume.findOne({userId: req.user.id});

    if(resume){
      resume.formData= formData;
      await resume.save();
    }
    else{
      resume= new Resume({
        userId: req.user.id,
        formData,
        status: "draft",
      });
      await resume.save();
    }
    res.json({message: "Resume saved successfully", resume});
  }catch(err){
    res.status(500).json({message:"Server error"});
  }
})

router.get("/load", authMiddleware, async (req,res)=>{
  try{
    const resume= await Resume.findOne({userId:req.user.id});

    if(!resume){
      return res.status(400).json({
        message: "No resume found"
      });
    }
    res.json({resume});
  }catch(err){
    res.status(500).json({message: "Server error"});
  }
})

router.post("/download", authMiddleware, async (req,res)=>{
   console.log("download route hit");
  const {formData, template}= req.body;

  try{
    const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

    const page = await browser.newPage();
    console.log("Downloading pdf");

   await page.goto(
  `https://rachanadutta.github.io/ai-resume-builder/print-template?template=${template}&data=${encodeURIComponent(JSON.stringify(formData))}`,
  { waitUntil: "networkidle0" }
);

    const pdf= await page.pdf({
      format: "A4",
      printBackground: true,
      // margin:{top:"20mm" , right: "15mm", bottom: "20mm", left: "15mm"},
    });
    console.log("hi");
    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });
    res.send(pdf);
  }catch(err){
    res.status(500).json({error: "Failed to generate PDF"});
  }
});

export default router;

