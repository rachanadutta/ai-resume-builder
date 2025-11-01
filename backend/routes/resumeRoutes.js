import express from "express";
import Resume from "../models/Resume.js";
import authMiddleware from "../middleware/authMiddleware.js";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";



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

// router.post("/download", authMiddleware, async (req,res)=>{
//    console.log("download route hit");
//   const {formData, template}= req.body;

//   try{
//     const browser = await puppeteer.launch({
//   args: ["--no-sandbox", "--disable-setuid-sandbox"],
// });

//     const page = await browser.newPage();
//     console.log("Downloading pdf");
//      page.on("console", msg => console.log("PAGE LOG:", msg.text()));
//     page.on("pageerror", err => console.log("PAGE ERROR:", err.message));

//    await page.goto(
//   `https://rachanadutta.github.io/ai-resume-builder/print-template?template=${template}&data=${encodeURIComponent(JSON.stringify(formData))}`,
//   { waitUntil: "networkidle0" }
// );
// console.log("generating pdf");
//     const pdf= await page.pdf({
//       format: "A4",
//       printBackground: true,
//       // margin:{top:"20mm" , right: "15mm", bottom: "20mm", left: "15mm"},
//     });
//     console.log("hi");
//     await browser.close();
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "attachment; filename=resume.pdf",
//     });
//     res.send(pdf);
//   }catch(err){
//     console.error("PDF generation error: ",err);
//     res.status(500).json({error: "Failed to generate PDF"});
//   }
// });


// Inside router.post("/download", ...)

router.post("/download", authMiddleware, async (req, res) => {
  console.log("Download route hit");
  const { formData, template } = req.body;

  let browser;
  try {
    // Add more args for better compatibility on different hosting platforms
   browser = await puppeteer.launch({
     args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless, // Use the recommended headless mode
      ignoreHTTPSErrors: true,
      // This is crucial for environments like Render
      // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, 
    });

    const page = await browser.newPage();
    console.log("Downloading PDF...");
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
    

    const pageUrl = `https://rachanadutta.github.io/ai-resume-builder/print-template?template=${template}&data=${encodeURIComponent(JSON.stringify(formData))}`;
    console.log(`Navigating to URL: ${pageUrl}`);

    await page.goto(pageUrl, {
      waitUntil: "networkidle0",
      timeout: 60000, // Increase timeout to 60 seconds
    });
    console.log("Page loaded. Generating PDF...");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log("PDF generated successfully.");

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });
    res.send(pdf);
  } catch (err) {
    console.error("PDF generation error: ", err.message, err.stack); // Log detailed error
    res.status(500).json({ error: "Failed to generate PDF" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
export default router;

