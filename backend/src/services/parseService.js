import * as pdfModule from 'pdf-parse';

export const extractTextFromPDF = async (buffer) => {
  try {
    if (!buffer) {
      throw new Error('No PDF buffer provided');
    }

    // 1. Check for pdf-parse v2 (Class API: PDFParse)
    const PDFParseClass = pdfModule.PDFParse || pdfModule.default?.PDFParse;
    if (typeof PDFParseClass === 'function' && PDFParseClass.prototype?.getText) {
      const parser = new PDFParseClass({ data: buffer });
      const result = await parser.getText();
      if (typeof parser.destroy === 'function') {
        await parser.destroy();
      }
      return result?.text ? result.text.trim() : '';
    }

    // 2. Check for pdf-parse v1 (Function API: pdf(buffer))
    const legacyPdfParse = typeof pdfModule.default === 'function' 
      ? pdfModule.default 
      : (typeof pdfModule === 'function' ? pdfModule : null);

    if (legacyPdfParse) {
      const data = await legacyPdfParse(buffer);
      return data?.text ? data.text.trim() : '';
    }

    throw new Error('Could not initialize PDF parsing engine.');
  } catch (error) {
    console.error('PDF parsing error details:', error.message);
    throw new Error(`PDF Parsing failed: ${error.message}`);
  }
};