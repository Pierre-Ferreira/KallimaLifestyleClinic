import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf';
import fs from 'fs';
import moment from 'moment/moment';
import { Email } from 'meteor/email';

let locModule;

// const sendEmail = (path) => {
//   console.log("INSIDE sendEmail.")
//   try {
//       console.log("INSIDE try sendEmail.")
//     // const file = fs.readFileSync(path);
//     // return new Buffer(file).toString('base64');
//     result = Meteor.wrapAsync(Email.send({
//       to: 'pierre@tektite.biz',
//       from: 'Ryan Glover <ryan.glover@themeteorchef.com>',
//       replyTo: 'Ryan Glover <ryan.glover@themeteorchef.com>',
//       subject: 'Sending some flapjacks!',
//       html: '<strong>Look at that stack of cakes!</strong>',
//       attachments: [{
//         filename: 'flapjacks.pdf',
//         filepath: path,
//         contentType: 'pdf',
//       }],
//     }));
//   } catch (exception) {
//     console.log("INSIDE catch sendEmail:", exception)
//     locModule.reject(exception);
//   }
// };

const generatePDF = (html, fileName, clientName) => {
  console.log('html:', html)
  console.log('fileName:', fileName)
  try {
    pdf.create(html, {
      format: 'letter',
      border: {
        top: '0.6in',
        right: '0.6in',
        bottom: '0.6in',
        left: '0.6in',
      },
      paginationOffset: 1, // Override the initial pagination number
      header: {
        height: '25mm',
        contents: `
                    <div style="text-align: center; font-size: 25px; font-weight: 600">Kallima Lifestyle Clinic</div>
                    <div style="text-align: center;">Weight Info for ${clientName} as on ${moment(new Date()).format('DD-MM-YYYY')}</div>
                  `,
      },
      footer: {
        height: '15mm',
        contents: {
          default: '<div style="text-align: center;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>', // fallback value
        },
      },
    }).toFile(`./tmp/${fileName}`, (error, response) => {
      console.log('error:',error)
      console.log('response:',response)
      if (error) {
        locModule.reject(error);
      } else {
        // sendEmail(response.filename);
        locModule.resolve({ response });
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

const handler = ({ component, props, fileName, clientName }, promise) => {
  // To make sure we can call our Promise's resolve and reject methods from
  // anywhere in our file, we assign them to a file-scoped variable locModule
  // up top. This means that when we need to, we can call locModule.resolve() or
  // locModule.reject() from anywhere in this file.
  locModule = promise;
  const html = getComponentAsHTML(component, props);
  if (html && fileName) generatePDF(html, fileName, clientName);
};

const generateComponentAsPDF = (options) => {
  console.log('options:', options)
  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject });
  });
};

export default generateComponentAsPDF;
