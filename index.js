const fs=require('fs');
const puppeteer =require('puppeteer');

async function somveerkumar(){
    const browser=await puppeteer.launch();
    const page= await browser.newPage()
    await page.goto('https://somveerkumar.netlify.app/');
    // await page.screenshot({path:'somveerkumar.png', fullPage:true})
    // await page.pdf({path:'somveerkumar.pdf', format:'A4'})

    // const html= await page.content();
    // console.log(html)

    // To get all the text
    // const text= await page.evaluate(()=> document.body.innerText)
    // console.log(text)

    //To get all the links
    // const links=await page.evaluate(()=> Array.from(document.querySelectorAll('a'), (e)=>e.href));
    // console.log(links)

    //Getting portfolio title and desciption

     //waiting for required content to load
//     await page.waitForSelector('#work .app__work-item');
// const projects = await page.evaluate(() => Array.from(
//   document.querySelectorAll('#work .app__work-item'),
//   (e) => ({
//     projTitle: e.querySelector('.app__work-content h4').innerText,
//     projDesc:e.querySelector('.app__work-content p').innerHTML

//   })
// ));
// console.log(projects);


//Another way of doing above thing
await page.waitForSelector('#work .app__work-item')
const projects=await page.$$eval('#work .app__work-item', (elements)=>elements.map(e=>({
    projTitle: e.querySelector('.app__work-content h4').innerText,
    projDesc:e.querySelector('.app__work-content p').innerHTML
})));

console.log(projects);

//Save data to json file
fs.writeFile('projets.json', JSON.stringify(projects), (err)=>{
    if(err) throw err;
    console.log('File Saved')
})
    await browser.close()
}

somveerkumar()