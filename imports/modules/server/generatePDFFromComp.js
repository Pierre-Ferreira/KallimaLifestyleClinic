import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf';
import fs from 'fs';

let locModule;

// const getBase64String = (path) => {
//   try {
//     const file = fs.readFileSync(path);
//     return new Buffer(file).toString('base64');
//   } catch (exception) {
//     locModule.reject(exception);
//   }
// };

const generatePDF = (html, fileName) => {
  console.log('html:', html)
  console.log('fileName:', fileName)
  try {
    pdf.create(html, {
      format: 'letter',
      border: { top: '0.6in', right: '0.6in', bottom: '0.6in', left: '0.6in' },
    }).toFile(`./tmp/${fileName}`, (error, response) => {
      console.log('error:',error)
      console.log('response:',response)
      if (error) {
        locModule.reject(error);
      } else {
        // locModule.resolve({ fileName, base64: getBase64String(response.filename) });
        // fs.unlink(response.filename);
      }
    });
  } catch (exception) {
    locModule.reject(exception);
  }
};

const getComponentAsHTML = (component, props) => {
  console.log('getComponentAsHTML props:', props)
  try {
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(component(props));
    console.log('staticMarkup:', staticMarkup)
    return staticMarkup;
  } catch (exception) {
    locModule.reject(exception);
  }
};

const handler = ({ component, props, fileName }, promise) => {
  // To make sure we can call our Promise's resolve and reject methods from
  // anywhere in our file, we assign them to a file-scoped variable locModule
  // up top. This means that when we need to, we can call locModule.resolve() or
  // locModule.reject() from anywhere in this file.
  locModule = promise;
  const html = getComponentAsHTML(component, props);
  if (html && fileName) generatePDF(html, fileName);
};

const generateComponentAsPDF = (options) => {
  console.log('options:', options)
  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject });
  });
};

export default generateComponentAsPDF;
