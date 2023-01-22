Answer 1. Following are the errors in assigment.xml file.
a) The error is `error on line 11 at column 18: Specification mandates value for attribute Date` , this error has occurred as we have not assinged value to this attribute. To correct this error, I have put an attribute of type equal to Date.

  <effective type="Date">03/12/2016</effective>

b) `error on line 31 at column 61: Opening and ending tag mismatch: originalName line 31 and originalname`, this means that the element type "originalName" must be terminated by the matching end-tag "</originalName>".

c) `error on line 51 at column 49: Opening and ending tag mismatch: name line 51 and originalName` this means The element type "originalName" must be begin by the matching start-tag "</originalName>" instead of <name>.


Answer 2. CDATA stands for Character Data which means that the data inside this will not be interpreted as XML. It is different from comments in a way that CDATA is part of document where as comments are not.

Answer 3. ![Screenshot of Answer 3](../assignments/Screenshot%202023-01-21%20at%208.53.24%20PM.png)

Answer 4. a) Prologe: "<?xml version="1.0" encoding="utf-8"?>"
b) Document Body: <menuInfo></menuInfo>
c) Processing Instructions: Processing Instruction starts with "<? ?>" therefore, processing instructions "<?xml-stylesheet type="text/css" href="style.css"?>"
d) Epilog contains the final instructions or comments so in this document, currently after updation, the epilog is: "<!-- Name: Simranjot Kaur || Student Id: N01553861 -->"

Answer 5. ![Inline DTD](../assignments/Screenshot%202023-01-21%20at%2010.52.50%20PM.png)

Answer 6. ![Result of using XML Validator](../assignments/Screenshot%202023-01-21%20at%209.40.49%20PM.png)

Answer 7: ![Result of CSS application](../assignments/Screenshot%202023-01-21%20at%2011.30.48%20PM.png)


 
